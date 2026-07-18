import type { Server } from 'node:http'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createApp } from './app.ts'

type ListeningServer = Server & { address(): { port: number } | string | null }

async function listen(app: ReturnType<typeof createApp>): Promise<{
  server: ListeningServer
  base: string
}> {
  const server = await new Promise<ListeningServer>((resolve, reject) => {
    const s = app.listen(0, '127.0.0.1', () => resolve(s as ListeningServer))
    s.on('error', reject)
  })
  const addr = server.address()
  if (!addr || typeof addr === 'string') throw new Error('No listen port')
  return { server, base: `http://127.0.0.1:${addr.port}` }
}

async function close(server: Server): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()))
  })
}

const validLead = {
  intent: 'free-class',
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '2015550123',
  location: 'Allendale',
  program: 'Adult Martial Arts',
  source: '/',
}

describe('API app security', () => {
  let server: Server | undefined

  afterEach(async () => {
    vi.restoreAllMocks()
    if (server) {
      await close(server)
      server = undefined
    }
  })

  it('serves health and sets security headers', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/health`)
    expect(res.status).toBe(200)
    expect(res.headers.get('x-powered-by')).toBeNull()
    expect(res.headers.get('x-content-type-options')).toBe('nosniff')
    const body = (await res.json()) as { ok: boolean; service: string }
    expect(body.ok).toBe(true)
    expect(body.service).toBe('ubba-api')
  })

  it('accepts a valid lead submission', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validLead),
    })
    expect(res.status).toBe(200)
    const body = (await res.json()) as { ok: boolean; mode: string }
    expect(body.ok).toBe(true)
    expect(body.mode).toBe('log')
  })

  it('rejects missing required fields', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Jane' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as { ok: boolean; error: string }
    expect(body.ok).toBe(false)
    expect(body.error).toMatch(/email|phone|name/i)
  })

  it('rejects invalid email', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validLead, email: 'not-an-email' }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: string }
    expect(body.error).toMatch(/valid email/i)
  })

  it('silently accepts honeypot spam', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validLead, website: 'http://bots.test' }),
    })
    expect(res.status).toBe(200)
    const body = (await res.json()) as { ok: boolean }
    expect(body.ok).toBe(true)
  })

  it('rejects unexpected payload fields', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validLead, admin: true }),
    })
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: string }
    expect(body.error).toMatch(/unexpected/i)
  })

  it('rejects disallowed Origin in production (and when allowlist is set)', async () => {
    const app = createApp({
      corsOrigins: ['https://unitedbba.com'],
      isProduction: true,
    })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://evil.example',
      },
      body: JSON.stringify(validLead),
    })
    expect(res.status).toBe(403)
    const body = (await res.json()) as { ok: boolean; error: string }
    expect(body.ok).toBe(false)
    expect(body.error).toMatch(/origin/i)
  })

  it('allows listed Origin', async () => {
    const app = createApp({
      corsOrigins: ['https://unitedbba.com'],
      isProduction: true,
    })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://unitedbba.com',
      },
      body: JSON.stringify(validLead),
    })
    expect(res.status).toBe(200)
  })

  it('rejects browser Origins in production when CORS_ORIGINS is empty', async () => {
    const app = createApp({ corsOrigins: [], isProduction: true })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://random.site',
      },
      body: JSON.stringify(validLead),
    })
    expect(res.status).toBe(403)
  })

  it('rate-limits lead submissions per IP', async () => {
    const app = createApp({
      corsOrigins: [],
      isProduction: false,
      rateLimitMax: 2,
      rateLimitWindowMs: 60_000,
    })
    const ctx = await listen(app)
    server = ctx.server

    const post = () =>
      fetch(`${ctx.base}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validLead),
      })

    expect((await post()).status).toBe(200)
    expect((await post()).status).toBe(200)
    const limited = await post()
    expect(limited.status).toBe(429)
    const body = (await limited.json()) as { ok: boolean; error: string }
    expect(body.ok).toBe(false)
    expect(body.error).toMatch(/too many requests/i)
  })

  it('returns a safe 502 when email delivery fails', async () => {
    const email = await import('./email.ts')
    vi.spyOn(email, 'deliverLeadEmail').mockRejectedValueOnce(
      new Error('Resend error (500): internal-token-xyz'),
    )

    const app = createApp({ corsOrigins: [], isProduction: true })
    const ctx = await listen(app)
    server = ctx.server

    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validLead),
    })
    expect(res.status).toBe(502)
    const body = (await res.json()) as { ok: boolean; error: string }
    expect(body.ok).toBe(false)
    expect(body.error).toMatch(/could not send/i)
    expect(body.error).not.toMatch(/internal-token|Resend/i)
  })

  it('rejects oversized JSON bodies', async () => {
    const app = createApp({ corsOrigins: [], isProduction: false })
    const ctx = await listen(app)
    server = ctx.server

    const huge = 'x'.repeat(40 * 1024)
    const res = await fetch(`${ctx.base}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validLead, message: huge }),
    })
    expect(res.status).toBe(413)
    const body = (await res.json()) as { error: string }
    expect(body.error).toMatch(/too large/i)
  })
})
