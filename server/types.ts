import type { InquiryIntent } from '../src/data/contact.ts'

export type { InquiryIntent }

export type LeadPayload = {
  name: string
  email: string
  phone: string
  /** Which form was submitted — drives email title + optional inbox routing */
  intent?: InquiryIntent
  location?: string
  program?: string
  message?: string
  /** Birthday party preferred date/time */
  partyDate?: string
  /** Birthday guest count range */
  guests?: string
  /** Child name (camp / party / PNO) */
  childName?: string
  /** Child age (camp / party) */
  childAge?: string
  /** Preferred camp weeks or session notes */
  preferredWeeks?: string
  /** Page path where the form was submitted, e.g. /contact */
  source?: string
  /** Honeypot — must be empty */
  website?: string
  /** Client timestamp (ms) when the form was opened — used for timing spam checks */
  formStartedAt?: number
  /** Optional CAPTCHA token when CAPTCHA_SECRET is configured */
  captchaToken?: string
}

export type LeadResult =
  | { ok: true; delivered: boolean; mode: 'email' | 'log' }
  | { ok: false; error: string; status: number }
