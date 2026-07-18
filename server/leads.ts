import { deliverLeadEmail } from './email.ts'
import type { LeadPayload, LeadResult } from './types.ts'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function parseLeadPayload(body: unknown): { lead?: LeadPayload; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid JSON body.' }
  }
  const data = body as Record<string, unknown>

  // Honeypot: bots fill hidden "website" fields; real users leave it blank.
  if (asString(data.website)) {
    return { lead: undefined, error: 'spam' }
  }

  const name = asString(data.name)
  const email = asString(data.email)
  const phone = asString(data.phone)

  if (!name) return { error: 'Please enter your full name.' }
  if (!email) return { error: 'Please enter your email.' }
  if (!emailRe.test(email)) return { error: 'Enter a valid email address.' }
  if (!phone) return { error: 'Please enter a phone number.' }

  return {
    lead: {
      name,
      email,
      phone,
      location: asString(data.location) || undefined,
      program: asString(data.program) || undefined,
      message: asString(data.message) || undefined,
      source: asString(data.source) || undefined,
    },
  }
}

export async function submitLead(body: unknown): Promise<LeadResult> {
  const parsed = parseLeadPayload(body)

  // Silent success for honeypot hits so bots don't retry.
  if (parsed.error === 'spam') {
    return { ok: true, delivered: true, mode: 'log' }
  }
  if (parsed.error || !parsed.lead) {
    return { ok: false, error: parsed.error || 'Invalid request.', status: 400 }
  }

  try {
    const { mode } = await deliverLeadEmail(parsed.lead)
    return { ok: true, delivered: mode === 'email', mode }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to send email.'
    console.error('[leads] delivery failed:', message)
    return { ok: false, error: 'Could not send your request. Please try again or call us.', status: 502 }
  }
}
