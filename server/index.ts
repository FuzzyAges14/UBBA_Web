import { createApp } from './app.ts'
import { logSecurityConfigWarnings, serverConfig } from './config.ts'

logSecurityConfigWarnings()

const app = createApp()

app.listen(serverConfig.port, () => {
  console.log(`UBBA API listening on http://localhost:${serverConfig.port}`)
  console.log(`  Mail transport: ${serverConfig.transport.kind}`)
  console.log(`  Notify: ${serverConfig.notifyEmails.join(', ') || '(none)'}`)
  console.log(`  CORS origins: ${serverConfig.corsOrigins.join(', ') || '(any — dev default)'}`)
  console.log(
    `  Rate limit: ${serverConfig.rateLimit.max} leads / ${Math.round(serverConfig.rateLimit.windowMs / 60000)} min / IP`,
  )
  console.log(`  Edit emails/social in: src/data/contact.ts`)
})
