import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import request from 'supertest'

const deliverLeadEmail = vi.hoisted(() =>
  vi.fn(async () => ({ mode: 'log' as const })),
)

vi.mock('./email.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./email.ts')>()
  return {
    ...actual,
    deliverLeadEmail,
  }
})

const corsOrigins = vi.hoisted(() => [] as string[])

vi.mock('./config.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./config.ts')>()
  return {
    ...actual,
    serverConfig: new Proxy(actual.serverConfig, {
      get(target, prop, receiver) {
        if (prop === 'corsOrigins') return corsOrigins
        return Reflect.get(target, prop, receiver)
      },
    }),
  }
})

import { createApp } from './app.ts'

const validLead = {
  intent: 'free-class',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '2015550123',
  location: 'Allendale',
  program: 'Adult Program',
  message: 'Looking for a weeknight class.',
  source: '/contact',
}

describe('POST /api/leads (HTTP)', () => {
  beforeEach(() => {
    deliverLeadEmail.mockReset()
    deliverLeadEmail.mockResolvedValue({ mode: 'log' })
    corsOrigins.length = 0
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('accepts a valid free-class submission', async () => {
    const res = await request(createApp()).post('/api/leads').send(validLead)
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ ok: true, delivered: false, mode: 'log' })
    expect(deliverLeadEmail).toHaveBeenCalledOnce()
  })

  it('rejects missing required fields', async () => {
    const res = await request(createApp()).post('/api/leads').send({ email: 'a@b.com' })
    expect(res.status).toBe(400)
    expect(res.body.ok).toBe(false)
    expect(res.body.error).toMatch(/full name/i)
    expect(deliverLeadEmail).not.toHaveBeenCalled()
  })

  it('rejects an invalid email', async () => {
    const res = await request(createApp())
      .post('/api/leads')
      .send({ ...validLead, email: 'not-an-email' })
    expect(res.status).toBe(400)
    expect(res.body.error).toMatch(/valid email/i)
  })

  it('silently accepts honeypot spam without sending email', async () => {
    const res = await request(createApp())
      .post('/api/leads')
      .send({ ...validLead, website: 'http://spam.test' })
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(deliverLeadEmail).not.toHaveBeenCalled()
  })

  it('rejects oversized JSON payloads', async () => {
    const huge = 'x'.repeat(40_000)
    const res = await request(createApp())
      .post('/api/leads')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ ...validLead, message: huge }))
    expect(res.status).toBe(413)
    expect(deliverLeadEmail).not.toHaveBeenCalled()
  })

  it('rejects disallowed CORS origins when configured', async () => {
    corsOrigins.push('https://allowed.example')
    const res = await request(createApp())
      .post('/api/leads')
      .set('Origin', 'https://evil.example')
      .send(validLead)
    expect(res.status).toBeGreaterThanOrEqual(400)
    expect(deliverLeadEmail).not.toHaveBeenCalled()
  })

  it('allows configured CORS origins', async () => {
    corsOrigins.push('https://allowed.example')
    const res = await request(createApp())
      .post('/api/leads')
      .set('Origin', 'https://allowed.example')
      .send(validLead)
    expect(res.status).toBe(200)
    expect(res.headers['access-control-allow-origin']).toBe('https://allowed.example')
  })

  it('returns a safe error when email delivery fails', async () => {
    deliverLeadEmail.mockRejectedValueOnce(new Error('SMTP connection refused'))
    const res = await request(createApp()).post('/api/leads').send(validLead)
    expect(res.status).toBe(502)
    expect(res.body).toEqual({
      ok: false,
      error: 'Could not send your request. Please try again or call us.',
    })
    expect(JSON.stringify(res.body)).not.toMatch(/SMTP|stack|refused/i)
  })

  it('exposes a health check', async () => {
    const res = await request(createApp()).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ ok: true, service: 'ubba-api' })
  })
})

describe('API rate limiting (pending Agent 5)', () => {
  it.todo('returns 429 when a client exceeds the lead-submission rate limit')
})
