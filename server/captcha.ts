import { serverConfig } from './config.ts'

export type CaptchaResult = 'skipped' | 'ok' | 'missing' | 'invalid'

/**
 * Optional CAPTCHA verification hook (Cloudflare Turnstile by default).
 * When CAPTCHA_SECRET / TURNSTILE_SECRET_KEY is unset, always returns `skipped`
 * so the public lead form does not require a widget.
 */
export async function verifyCaptchaToken(
  token: string | undefined,
  remoteIp?: string,
): Promise<CaptchaResult> {
  const secret = serverConfig.captcha.secret
  if (!secret) return 'skipped'

  if (!token?.trim()) return 'missing'

  try {
    const body = new URLSearchParams()
    body.set('secret', secret)
    body.set('response', token.trim())
    if (remoteIp) body.set('remoteip', remoteIp)

    const res = await fetch(serverConfig.captcha.verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
    if (!res.ok) return 'invalid'

    const data = (await res.json()) as { success?: boolean }
    return data.success ? 'ok' : 'invalid'
  } catch {
    return 'invalid'
  }
}
