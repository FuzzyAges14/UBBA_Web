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

export const serverConfig = {
  port: Number(process.env.API_PORT || 3001),
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
  /** Comma-separated origins allowed to call the API (empty = allow any in dev). */
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
}
