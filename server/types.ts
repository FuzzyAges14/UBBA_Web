export type LeadPayload = {
  name: string
  email: string
  phone: string
  location?: string
  program?: string
  message?: string
  /** Page path where the form was submitted, e.g. /contact */
  source?: string
  /** Honeypot — must be empty */
  website?: string
}

export type LeadResult =
  | { ok: true; delivered: boolean; mode: 'email' | 'log' }
  | { ok: false; error: string; status: number }
