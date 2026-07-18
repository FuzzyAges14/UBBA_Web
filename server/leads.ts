import type { InquiryIntent } from '../src/data/contact.ts'
import {
  EVENT_GUEST_OPTIONS,
  PROGRAM_OPTIONS,
  getVisibleLocations,
} from '../src/data/site.ts'
import { verifyCaptchaToken } from './captcha.ts'
import { serverConfig } from './config.ts'
import { deliverLeadEmail } from './email.ts'
import { clampLength, stripControlChars } from './sanitize.ts'
import type { LeadPayload, LeadResult } from './types.ts'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VALID_INTENTS: InquiryIntent[] = [
  'free-class',
  'birthday',
  'summer-camp',
  'parents-night-out',
]

/** Only these keys may appear on POST /api/leads bodies. */
const ALLOWED_FIELDS = new Set([
  'name',
  'email',
  'phone',
  'intent',
  'location',
  'program',
  'message',
  'partyDate',
  'guests',
  'childName',
  'childAge',
  'preferredWeeks',
  'source',
  'website',
  'formStartedAt',
  'captchaToken',
])

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  location: 80,
  program: 80,
  message: 2000,
  partyDate: 120,
  guests: 20,
  childName: 100,
  childAge: 20,
  preferredWeeks: 200,
  source: 200,
  website: 200,
  captchaToken: 2048,
} as const

const ALLOWED_LOCATIONS = new Set(getVisibleLocations().map((l) => l.name))

const ALLOWED_PROGRAMS = new Set<string>(PROGRAM_OPTIONS)
const ALLOWED_GUESTS = new Set<string>(EVENT_GUEST_OPTIONS)

/** Max age of formStartedAt before we treat it as stale/abusive (24h). */
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000

function asString(value: unknown): string {
  if (typeof value !== 'string') return ''
  return stripControlChars(value).trim()
}

function parseIntent(value: unknown, program: string | undefined): InquiryIntent | undefined {
  const raw = asString(value)
  if (VALID_INTENTS.includes(raw as InquiryIntent)) return raw as InquiryIntent

  // Infer from program label when intent omitted (older clients)
  if (program === 'Birthday Parties') return 'birthday'
  if (program === 'Summer / Day Camp') return 'summer-camp'
  if (program === "Parents' Night Out") return 'parents-night-out'
  if (program) return 'free-class'
  return undefined
}

function normalizeEmail(email: string): string {
  return email.toLowerCase()
}

function phoneDigitCount(phone: string): number {
  return (phone.match(/\d/g) || []).length
}

function hasUnexpectedFields(data: Record<string, unknown>): boolean {
  return Object.keys(data).some((key) => !ALLOWED_FIELDS.has(key))
}

/**
 * Timing / honeypot spam signals return error: 'spam' so submitLead can
 * respond with a silent success (bots learn nothing useful).
 */
export function parseLeadPayload(
  body: unknown,
  options?: { minFormMs?: number; now?: number },
): { lead?: LeadPayload; error?: string } {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: 'Invalid JSON body.' }
  }
  const data = body as Record<string, unknown>

  if (hasUnexpectedFields(data)) {
    return { error: 'Unexpected fields in request.' }
  }

  // Honeypot: bots fill hidden "website" fields; real users leave it blank.
  if (asString(data.website)) {
    return { lead: undefined, error: 'spam' }
  }

  const minFormMs = options?.minFormMs ?? serverConfig.minFormMs
  const now = options?.now ?? Date.now()
  if (data.formStartedAt !== undefined && data.formStartedAt !== null) {
    if (typeof data.formStartedAt !== 'number' || !Number.isFinite(data.formStartedAt)) {
      return { error: 'Invalid form timing.' }
    }
    const elapsed = now - data.formStartedAt
    if (elapsed < minFormMs || elapsed > MAX_FORM_AGE_MS) {
      return { lead: undefined, error: 'spam' }
    }
  }

  const name = clampLength(asString(data.name), FIELD_LIMITS.name)
  const emailRaw = clampLength(asString(data.email), FIELD_LIMITS.email)
  const email = normalizeEmail(emailRaw)
  const phone = clampLength(asString(data.phone), FIELD_LIMITS.phone)

  if (!name) return { error: 'Please enter your full name.' }
  if (name.length < 2) return { error: 'Please enter your full name.' }
  if (!email) return { error: 'Please enter your email.' }
  if (!emailRe.test(email)) return { error: 'Enter a valid email address.' }
  if (!phone) return { error: 'Please enter a phone number.' }
  if (phoneDigitCount(phone) < 7 || phoneDigitCount(phone) > 15) {
    return { error: 'Enter a valid phone number.' }
  }

  const locationRaw = clampLength(asString(data.location), FIELD_LIMITS.location)
  if (locationRaw && !ALLOWED_LOCATIONS.has(locationRaw)) {
    return { error: 'Choose a valid location.' }
  }

  const programRaw = clampLength(asString(data.program), FIELD_LIMITS.program)
  if (programRaw && !ALLOWED_PROGRAMS.has(programRaw)) {
    return { error: 'Choose a valid program.' }
  }

  const guestsRaw = clampLength(asString(data.guests), FIELD_LIMITS.guests)
  if (guestsRaw && !ALLOWED_GUESTS.has(guestsRaw)) {
    return { error: 'Choose a valid guest range.' }
  }

  const message = clampLength(asString(data.message), FIELD_LIMITS.message) || undefined
  const sourceRaw = clampLength(asString(data.source), FIELD_LIMITS.source)
  if (sourceRaw && !sourceRaw.startsWith('/')) {
    return { error: 'Invalid source path.' }
  }

  const childAge = clampLength(asString(data.childAge), FIELD_LIMITS.childAge) || undefined
  // Allow simple ages like "7", "12", "3-5", "10+"
  if (childAge && !/^[0-9+\-\s]{1,20}$/.test(childAge)) {
    return { error: 'Enter a valid child age.' }
  }

  const program = programRaw || undefined
  const intent = parseIntent(data.intent, program)

  if (data.intent !== undefined && data.intent !== null && data.intent !== '' && !intent) {
    return { error: 'Invalid inquiry type.' }
  }

  const captchaToken = clampLength(asString(data.captchaToken), FIELD_LIMITS.captchaToken) || undefined

  return {
    lead: {
      name,
      email,
      phone,
      intent,
      location: locationRaw || undefined,
      program,
      message,
      partyDate: clampLength(asString(data.partyDate), FIELD_LIMITS.partyDate) || undefined,
      guests: guestsRaw || undefined,
      childName: clampLength(asString(data.childName), FIELD_LIMITS.childName) || undefined,
      childAge,
      preferredWeeks:
        clampLength(asString(data.preferredWeeks), FIELD_LIMITS.preferredWeeks) || undefined,
      source: sourceRaw || undefined,
      formStartedAt:
        typeof data.formStartedAt === 'number' && Number.isFinite(data.formStartedAt)
          ? data.formStartedAt
          : undefined,
      captchaToken,
    },
  }
}

function logDeliveryFailure(lead: LeadPayload, err: unknown): void {
  const message = err instanceof Error ? err.message : 'Failed to send email.'
  // Avoid dumping full PII — enough context for ops without storing the lead.
  console.error('[leads] delivery failed:', {
    intent: lead.intent ?? 'unknown',
    source: lead.source ?? 'unknown',
    reason: message.slice(0, 200),
  })
}

export async function submitLead(
  body: unknown,
  options?: { minFormMs?: number; now?: number; remoteIp?: string },
): Promise<LeadResult> {
  const parsed = parseLeadPayload(body, options)

  // Silent success for honeypot / timing spam so bots don't learn the filter.
  if (parsed.error === 'spam') {
    return { ok: true, delivered: true, mode: 'log' }
  }
  if (parsed.error || !parsed.lead) {
    return { ok: false, error: parsed.error || 'Invalid request.', status: 400 }
  }

  const captcha = await verifyCaptchaToken(parsed.lead.captchaToken, options?.remoteIp)
  if (captcha === 'missing' || captcha === 'invalid') {
    return {
      ok: false,
      error: 'Captcha verification failed. Please try again.',
      status: 400,
    }
  }

  try {
    const { mode } = await deliverLeadEmail(parsed.lead)
    return { ok: true, delivered: mode === 'email', mode }
  } catch (err) {
    logDeliveryFailure(parsed.lead, err)
    return {
      ok: false,
      error: 'Could not send your request. Please try again or call us.',
      status: 502,
    }
  }
}
