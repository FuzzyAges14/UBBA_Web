import nodemailer from 'nodemailer'
import { getInquiryType, type SocialProfile } from '../src/data/contact.ts'
import { notifyEmailsForIntent, serverConfig } from './config.ts'
import { sanitizeHeaderValue } from './sanitize.ts'
import type { LeadPayload } from './types.ts'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatSubmittedAt(date = new Date()): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

function socialLinksBlock(profiles: SocialProfile[]): { text: string; html: string } {
  const live = profiles.filter((p) => p.href && p.href !== '#')
  if (live.length === 0) {
    return {
      text: 'Social profiles: not configured yet (edit SOCIAL_PROFILES in src/data/contact.ts)',
      html: `<p style="margin:0;color:#666;font-size:13px;">Social profiles: not configured yet</p>`,
    }
  }
  return {
    text: live.map((p) => `${p.label}: ${p.href}`).join('\n'),
    html: `<p style="margin:0;font-size:13px;line-height:1.6;">${live
      .map(
        (p) =>
          `<a href="${escapeHtml(p.href)}" style="color:#C41230;font-weight:600;text-decoration:none;">${escapeHtml(p.label)}</a> · ${escapeHtml(p.handle)}`,
      )
      .join('<br/>')}</p>`,
  }
}

/** Human-readable request label from intent (preferred) or legacy program string. */
export function requestLabelForLead(lead: Pick<LeadPayload, 'intent' | 'program'>): string {
  if (lead.intent) return getInquiryType(lead.intent).label

  // Legacy fallbacks when older clients omit intent
  const p = lead.program?.trim() || ''
  if (p === 'Birthday Parties') return getInquiryType('birthday').label
  if (p === 'Summer / Day Camp') return getInquiryType('summer-camp').label
  if (p === "Parents' Night Out") return getInquiryType('parents-night-out').label
  return getInquiryType('free-class').label
}

type DetailRow = { label: string; value: string }

function detailRows(lead: LeadPayload): DetailRow[] {
  const rows: DetailRow[] = [
    { label: 'Name', value: lead.name },
    { label: 'Email', value: lead.email },
    { label: 'Phone', value: lead.phone },
    { label: 'Location', value: lead.location?.trim() || 'Not specified' },
    { label: 'Program', value: lead.program?.trim() || 'Not specified' },
  ]

  if (lead.childName?.trim()) rows.push({ label: 'Child', value: lead.childName.trim() })
  if (lead.childAge?.trim()) rows.push({ label: 'Child age', value: lead.childAge.trim() })
  if (lead.partyDate?.trim()) rows.push({ label: 'Preferred date', value: lead.partyDate.trim() })
  if (lead.guests?.trim()) rows.push({ label: 'Guests', value: lead.guests.trim() })
  if (lead.preferredWeeks?.trim()) {
    rows.push({ label: 'Preferred weeks', value: lead.preferredWeeks.trim() })
  }

  return rows
}

export function buildLeadEmail(lead: LeadPayload) {
  const submittedAt = formatSubmittedAt()
  const message = lead.message?.trim() || '(No message provided)'
  const source = lead.source?.trim() || 'Website form'
  const social = socialLinksBlock(serverConfig.socialProfiles)
  const requestLabel = requestLabelForLead(lead)
  const rows = detailRows(lead)

  // Sanitize subject pieces so visitor input cannot inject extra headers.
  const safeName = sanitizeHeaderValue(lead.name).slice(0, 100)
  const safeLocation = lead.location?.trim()
    ? sanitizeHeaderValue(lead.location).slice(0, 80)
    : ''
  const subject = sanitizeHeaderValue(
    `${requestLabel} — ${safeName}${safeLocation ? ` (${safeLocation})` : ''}`,
  ).slice(0, 200)

  const pad = (label: string) => `${label}:`.padEnd(18, ' ')
  const textLines = [
    requestLabel.toUpperCase(),
    '='.repeat(Math.min(requestLabel.length, 40)),
    '',
    ...rows.map((r) => `${pad(r.label)}${r.value}`),
    '',
    'Message:',
    message,
    '',
    '------------------',
    `Submitted:     ${submittedAt}`,
    `Source:        ${source}`,
  ]
  if (lead.intent) textLines.push(`Intent:        ${lead.intent}`)
  textLines.push(
    '',
    social.text,
    '',
    'Tip: Reply to this email to contact the visitor directly.',
  )
  const text = textLines.join('\n')

  const rowHtml = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:130px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #eee;color:#111;font-size:15px;font-weight:600;vertical-align:top;">${value}</td>
    </tr>`

  const htmlRows = rows
    .map((r) => {
      if (r.label === 'Email') {
        return rowHtml(
          r.label,
          `<a href="mailto:${escapeHtml(r.value)}" style="color:#C41230;text-decoration:none;">${escapeHtml(r.value)}</a>`,
        )
      }
      if (r.label === 'Phone') {
        return rowHtml(
          r.label,
          `<a href="tel:${escapeHtml(r.value.replace(/[^0-9+]/g, ''))}" style="color:#C41230;text-decoration:none;">${escapeHtml(r.value)}</a>`,
        )
      }
      return rowHtml(r.label, escapeHtml(r.value))
    })
    .join('')

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:24px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e5e5;">
    <div style="background:#0A0A0A;padding:20px 24px;">
      <div style="height:4px;background:linear-gradient(90deg,#f4f4f4 0 25%,#2563eb 25% 50%,#C41230 50% 75%,#0A0A0A 75% 100%);margin-bottom:14px;border-radius:2px;"></div>
      <p style="margin:0;color:#C9A227;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;font-weight:700;">United Black Belt Academy</p>
      <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;line-height:1.25;">${escapeHtml(requestLabel)}</h1>
    </div>
    <div style="padding:8px 10px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
        ${htmlRows}
      </table>
      <div style="padding:16px 14px 8px;">
        <p style="margin:0 0 6px;color:#666;font-size:13px;">Message</p>
        <p style="margin:0;padding:14px 16px;background:#fafafa;border-radius:8px;border:1px solid #eee;color:#111;font-size:15px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <div style="padding:8px 14px 20px;">
        <p style="margin:0;color:#888;font-size:12px;line-height:1.5;">
          Submitted ${escapeHtml(submittedAt)}<br/>
          Source: ${escapeHtml(source)}
        </p>
      </div>
    </div>
    <div style="padding:16px 24px;background:#fafafa;border-top:1px solid #eee;">
      ${social.html}
      <p style="margin:10px 0 0;color:#888;font-size:12px;">Reply to this email to contact the visitor directly.</p>
    </div>
  </div>
</body>
</html>`

  return { subject, text, html }
}

async function sendViaResend(opts: {
  apiKey: string
  to: string[]
  from: string
  replyTo?: string
  subject: string
  text: string
  html: string
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: opts.from,
      to: opts.to,
      reply_to: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error (${res.status}): ${body}`)
  }
}

async function sendViaSmtp(opts: {
  to: string[]
  from: string
  replyTo?: string
  subject: string
  text: string
  html: string
}) {
  const t = serverConfig.transport
  if (t.kind !== 'smtp') throw new Error('SMTP transport not configured')

  const transporter =
    'url' in t
      ? nodemailer.createTransport(t.url)
      : nodemailer.createTransport({
          host: t.host,
          port: t.port,
          secure: t.secure,
          auth: { user: t.user, pass: t.pass },
        })

  await transporter.sendMail({
    from: opts.from,
    to: opts.to.join(', '),
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  })
}

export async function deliverLeadEmail(lead: LeadPayload): Promise<{ mode: 'email' | 'log' }> {
  const { subject, text, html } = buildLeadEmail(lead)
  const fromName = sanitizeHeaderValue(serverConfig.fromName).slice(0, 80)
  const fromEmail = sanitizeHeaderValue(serverConfig.fromEmail)
  const from = `"${fromName}" <${fromEmail}>`
  // Reply-To is always the validated visitor email — never a free-form header.
  const replyTo = serverConfig.replyToVisitor ? sanitizeHeaderValue(lead.email) : undefined
  // Recipients come only from server config / contact.ts — never from the request body.
  const to = notifyEmailsForIntent(lead.intent)
  const label = requestLabelForLead(lead)

  if (to.length === 0) {
    throw new Error('No notify emails configured. Edit CONTACT.notifyEmails in src/data/contact.ts')
  }

  const transport = serverConfig.transport

  if (transport.kind === 'log') {
    console.log(`\n——— ${label} (email not configured — logging only) ———`)
    console.log(`To: ${to.join(', ')}`)
    console.log(`From: ${from}`)
    if (replyTo) console.log(`Reply-To: ${replyTo}`)
    console.log(`Subject: ${subject}`)
    console.log(text)
    console.log('——— Add RESEND_API_KEY or SMTP_* in .env to send real email ———\n')
    return { mode: 'log' }
  }

  if (transport.kind === 'resend') {
    await sendViaResend({
      apiKey: transport.apiKey,
      to,
      from,
      replyTo,
      subject,
      text,
      html,
    })
    return { mode: 'email' }
  }

  await sendViaSmtp({ to, from, replyTo, subject, text, html })
  return { mode: 'email' }
}
