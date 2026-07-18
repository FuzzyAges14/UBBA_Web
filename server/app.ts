import cors from 'cors'
import express from 'express'
import { serverConfig } from './config.ts'
import { submitLead } from './leads.ts'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '32kb' }))

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true)
        if (serverConfig.corsOrigins.length === 0) return callback(null, true)
        if (serverConfig.corsOrigins.includes(origin)) return callback(null, true)
        return callback(new Error(`Origin ${origin} not allowed by CORS`))
      },
    }),
  )

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      service: 'ubba-api',
      mail: serverConfig.transport.kind,
      notifyCount: serverConfig.notifyEmails.length,
    })
  })

  app.post('/api/leads', async (req, res) => {
    const result = await submitLead(req.body)
    if (!result.ok) {
      return res.status(result.status).json({ ok: false, error: result.error })
    }
    return res.status(200).json({
      ok: true,
      delivered: result.delivered,
      mode: result.mode,
    })
  })

  return app
}
