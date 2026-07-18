export type LeadFormValues = {
  name: string
  email: string
  phone: string
  location?: string
  program?: string
  message?: string
  source?: string
  /** Honeypot — leave empty */
  website?: string
}

export type SubmitLeadResponse = {
  ok: boolean
  delivered?: boolean
  mode?: 'email' | 'log'
  error?: string
}

/**
 * Posts a free-class request to the UBBA API (`POST /api/leads`).
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
