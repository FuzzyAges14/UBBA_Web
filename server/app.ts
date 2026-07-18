import cors from 'cors'
import express, { type ErrorRequestHandler, type RequestHandler } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { serverConfig } from './config.ts'
import { submitLead } from './leads.ts'

export type AppOptions = {
  corsOrigins?: string[]
  isProduction?: boolean
  rateLimitMax?: number
  rateLimitWindowMs?: number
  trustProxy?: boolean | number
  minFormMs?: number
}

function resolveCorsOrigins(options?: AppOptions): string[] {
  return options?.corsOrigins ?? serverConfig.corsOrigins
}

function resolveIsProduction(options?: AppOptions): boolean {
  return options?.isProduction ?? serverConfig.isProduction
}

/** Whether a browser Origin may call the API. */
export function isOriginAllowed(
  origin: string | undefined,
  corsOrigins: string[],
  isProduction: boolean,
): boolean {
  if (!origin) return true
  if (corsOrigins.length > 0) return corsOrigins.includes(origin)
  // No allowlist: open in development, closed for browser Origins in production.
  return !isProduction
}

export function createApp(options: AppOptions = {}) {
  const app = express()
  const corsOrigins = resolveCorsOrigins(options)
  const isProduction = resolveIsProduction(options)
  const trustProxy = options.trustProxy ?? serverConfig.trustProxy
  const minFormMs = options.minFormMs ?? serverConfig.minFormMs
  const rateLimitMax = options.rateLimitMax ?? serverConfig.rateLimit.max
  const rateLimitWindowMs = options.rateLimitWindowMs ?? serverConfig.rateLimit.windowMs

  app.disable('x-powered-by')
  if (trustProxy !== false) {
    app.set('trust proxy', trustProxy)
  }

  app.use(
    helmet({
      // JSON API — CSP is enforced by the static site host, not this service.
      contentSecurityPolicy: false,
      // Allow the marketing site (possibly another origin) to call the API.
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  )

  app.use(express.json({ limit: '32kb' }))

  app.use(
    cors({
      origin(origin, callback) {
        if (isOriginAllowed(origin, corsOrigins, isProduction)) {
          return callback(null, true)
        }
        // Do not throw — a thrown error can leak into error handlers / stack traces.
        return callback(null, false)
      },
    }),
  )

  /** Reject lead posts from disallowed Origins (CORS alone does not block server processing). */
  const enforceLeadOrigin: RequestHandler = (req, res, next) => {
    const origin = req.get('Origin') || undefined
    if (isOriginAllowed(origin, corsOrigins, isProduction)) return next()
    console.warn('[security] rejected lead from disallowed origin')
    return res.status(403).json({
      ok: false,
      error: 'Origin not allowed.',
    })
  }

  const leadLimiter = rateLimit({
    windowMs: rateLimitWindowMs,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      error: 'Too many requests. Please try again in a few minutes.',
    },
    // Skip successful health checks elsewhere; this limiter is only on /api/leads.
  })

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'ubba-api',
      mail: serverConfig.transport.kind,
      notifyCount: serverConfig.notifyEmails.length,
    })
  })

  app.post('/api/leads', enforceLeadOrigin, leadLimiter, async (req, res, next) => {
    try {
      const result = await submitLead(req.body, {
        minFormMs,
        remoteIp: req.ip,
      })
      if (!result.ok) {
        return res.status(result.status).json({ ok: false, error: result.error })
      }
      return res.status(200).json({
        ok: true,
        delivered: result.delivered,
        mode: result.mode,
      })
    } catch (err) {
      return next(err)
    }
  })

  // Unknown API routes
  app.use('/api', (_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found.' })
  })

  // Four-arg signature required so Express treats this as an error middleware.
  const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
    void next
    // express.json() payload too large / malformed JSON
    if (err?.type === 'entity.too.large') {
      return res.status(413).json({ ok: false, error: 'Request body too large.' })
    }
    if (err instanceof SyntaxError || err?.type === 'entity.parse.failed') {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body.' })
    }

    const status = typeof err?.status === 'number' ? err.status : 500
    console.error('[api] error:', err instanceof Error ? err.message : 'unknown')

    if (isProduction || status >= 500) {
      return res.status(status >= 400 ? status : 500).json({
        ok: false,
        error:
          status === 429
            ? 'Too many requests. Please try again in a few minutes.'
            : 'Something went wrong. Please try again.',
      })
    }

    return res.status(status).json({
      ok: false,
      error: err instanceof Error ? err.message : 'Server error',
    })
  }

  app.use(errorHandler)

  return app
}
