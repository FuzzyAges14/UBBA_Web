import { createApp } from './app.ts'
import { serverConfig } from './config.ts'

const app = createApp()

app.listen(serverConfig.port, () => {
  console.log(`UBBA API listening on http://localhost:${serverConfig.port}`)
  console.log(`  Mail transport: ${serverConfig.transport.kind}`)
  console.log(`  Notify: ${serverConfig.notifyEmails.join(', ') || '(none)'}`)
  console.log(`  Edit emails/social in: src/data/contact.ts`)
})
