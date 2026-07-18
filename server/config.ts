import 'dotenv/config'
import { CONTACT, SOCIAL_PROFILES } from '../src/data/contact.ts'

export type MailTransport =
  | { kind: 'resend'; apiKey: string }
  | { kind: 'smtp'; url: string }
  | { kind: 'smtp'; host: string; port: number; secure: boolean; user: string; pass: string }
  | { kind: 'log' }

function parseNotifyEmails(): string[] {
  const fromEnv = process.env.NOTIFY_EMAILS?.split(/[,;\s]+/).map((e) => e.trim()).filter(Boolean)
  if (fromEnv && fromEnv.length > 0) return fromEnv
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

export const serverConfig = {
  port: Number(process.env.API_PORT || 3001),
  notifyEmails: parseNotifyEmails(),
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
  subjectPrefix: CONTACT.subjectPrefix,
  replyToVisitor: CONTACT.replyToVisitor,
  transport: resolveTransport(),
  socialProfiles: SOCIAL_PROFILES,
  /** Comma-separated origins allowed to call the API (empty = reflect request origin in dev). */
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
}
