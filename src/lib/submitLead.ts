import type { InquiryIntent } from '../data/contact'

export type LeadFormValues = {
  name: string
  email: string
  phone: string
  /** Which form was submitted — drives email title + optional inbox routing */
  intent?: InquiryIntent
  location?: string
  program?: string
  message?: string
  partyDate?: string
  guests?: string
  childName?: string
  childAge?: string
  preferredWeeks?: string
  source?: string
  /** Honeypot — leave empty */
  website?: string
  /** Epoch ms when the form mounted — used server-side for timing spam checks */
  formStartedAt?: number
  /** Optional CAPTCHA token when the site wires a widget + CAPTCHA_SECRET */
  captchaToken?: string
}

export type SubmitLeadResponse = {
  ok: boolean
  delivered?: boolean
  mode?: 'email' | 'log'
  error?: string
}

/**
 * Posts a form inquiry to the UBBA API (`POST /api/leads`).
 * Works for free-class, birthday, summer camp, and Parents' Night Out.
 * In Vite dev, requests are proxied to the local API server.
 */
export async function submitLead(values: LeadFormValues): Promise<SubmitLeadResponse> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  let data: SubmitLeadResponse | null = null
  try {
    data = (await res.json()) as SubmitLeadResponse
  } catch {
    data = null
  }

  if (!res.ok) {
    return {
      ok: false,
      error: data?.error || 'Could not send your request. Please try again or call us.',
    }
  }

  return data ?? { ok: true }
}
