import 'dotenv/config'
import {
  CONTACT,
  INQUIRY_TYPES,
  SOCIAL_PROFILES,
  type InquiryIntent,
} from '../src/data/contact.ts'

export type MailTransport =
  | { kind: 'resend'; apiKey: string }
  | { kind: 'smtp'; url: string }
  | { kind: 'smtp'; host: string; port: number; secure: boolean; user: string; pass: string }
  | { kind: 'log' }

function parseEmailList(value: string | undefined): string[] {
  return (value ?? '')
    .split(/[,;\s]+/)
    .map((e) => e.trim())
    .filter(Boolean)
}

function parseDefaultNotifyEmails(): string[] {
  const fromEnv = parseEmailList(process.env.NOTIFY_EMAILS)
  if (fromEnv.length > 0) return fromEnv
  return [...CONTACT.notifyEmails]
}

function resolveTransport(): MailTransport {
  const resendKey = process.env.RESEND_API_KEY?.trim()
  if (resendKey) return { kind: 'resend', apiKey: resendKey }

  const smtpUrl = process.env.SMTP_URL?.trim()
  if (smtpUrl) return { kind: 'smtp', url: smtpUrl }

  const host = process.env.SMTP_HOST?.trim()
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (host && user && pass) {
    return {
      kind: 'smtp',
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      user,
      pass,
    }
  }

  return { kind: 'log' }
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback
}

function parseCorsOrigins(): string[] {
  return (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

function parseTrustProxy(): boolean | number {
  const raw = process.env.TRUST_PROXY?.trim().toLowerCase()
  if (!raw) return false
  if (raw === 'true' || raw === '1') return 1
  if (raw === 'false' || raw === '0') return false
  const n = Number(raw)
  return Number.isFinite(n) && n >= 0 ? n : false
}

const defaultNotifyEmails = parseDefaultNotifyEmails()

/** Resolve notify inboxes for a given form intent (type override → default). */
export function notifyEmailsForIntent(intent: InquiryIntent | undefined): string[] {
  const key = intent ?? 'free-class'
  const typeEmails = INQUIRY_TYPES[key]?.notifyEmails?.filter(Boolean)
  if (typeEmails && typeEmails.length > 0) return [...typeEmails]

  // Optional per-type env overrides, e.g. NOTIFY_EMAILS_BIRTHDAY=...
  const envKey = `NOTIFY_EMAILS_${key.replace(/-/g, '_').toUpperCase()}`
  const fromEnv = parseEmailList(process.env[envKey])
  if (fromEnv.length > 0) return fromEnv

  return defaultNotifyEmails
}

export const isProduction = process.env.NODE_ENV === 'production'

export const serverConfig = {
  port: Number(process.env.API_PORT || 3001),
  isProduction,
  notifyEmails: defaultNotifyEmails,
  publicEmail: process.env.PUBLIC_EMAIL?.trim() || CONTACT.publicEmail,
  fromName: process.env.MAIL_FROM_NAME?.trim() || CONTACT.fromName,
  /**
   * Envelope "from" address. For Resend use an address on a verified domain.
   * For SMTP this is often the same as SMTP_USER.
   */
  fromEmail:
    process.env.MAIL_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    CONTACT.publicEmail,
  replyToVisitor: CONTACT.replyToVisitor,
  transport: resolveTransport(),
  socialProfiles: SOCIAL_PROFILES,
  inquiryTypes: INQUIRY_TYPES,
  /**
   * Explicit origins allowed to call the API from a browser.
   * Empty in development = allow any origin (with a startup warning).
   * Empty in production = reject browser Origins (must set CORS_ORIGINS).
   */
  corsOrigins: parseCorsOrigins(),
  /**
   * Set TRUST_PROXY=1 (or true) when the API sits behind a reverse proxy
   * (Render, Railway, Fly, nginx) so rate limits use the real client IP.
   */
  trustProxy: parseTrustProxy(),
  /** Per-IP lead submission limits (defaults are family/shared-network friendly). */
  rateLimit: {
    windowMs: parsePositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: parsePositiveInt(process.env.RATE_LIMIT_MAX, 30),
  },
  /** Minimum time (ms) between form open and submit — bots that POST instantly are dropped. */
  minFormMs: parsePositiveInt(process.env.MIN_FORM_MS, 2000),
  /**
   * Optional CAPTCHA (e.g. Cloudflare Turnstile). When unset, verification is skipped.
   * Frontend must send `captchaToken` only after you wire a widget.
   */
  captcha: {
    secret: process.env.CAPTCHA_SECRET?.trim() || process.env.TURNSTILE_SECRET_KEY?.trim() || '',
    verifyUrl:
      process.env.CAPTCHA_VERIFY_URL?.trim() ||
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
  },
}

/** Log operational warnings once at process start (never prints secrets). */
export function logSecurityConfigWarnings(config = serverConfig): void {
  if (config.corsOrigins.length === 0) {
    if (config.isProduction) {
      console.warn(
        '[security] CORS_ORIGINS is empty in production. Browser requests with an Origin header will be rejected. Set CORS_ORIGINS to your site origin(s).',
      )
    } else {
      console.warn(
        '[security] CORS_ORIGINS is unset — allowing any Origin (development only). Set CORS_ORIGINS before production deploy.',
      )
    }
  }

  if (config.isProduction && !config.trustProxy) {
    console.warn(
      '[security] TRUST_PROXY is unset. If this API is behind a reverse proxy, set TRUST_PROXY=1 so rate limits use the client IP.',
    )
  }

  if (config.transport.kind === 'log' && config.isProduction) {
    console.warn(
      '[security] No mail transport configured (RESEND_API_KEY or SMTP_*). Leads will be logged only.',
    )
  }
}
