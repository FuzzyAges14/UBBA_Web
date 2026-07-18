/**
 * Central site origin for canonical URLs, Open Graph, Twitter cards, and sitemap.
 *
 * Set `VITE_SITE_URL` in `.env` / the host dashboard to the live origin
 * (no trailing slash), e.g. `https://www.unitedbba.com`.
 *
 * Fallback is a safe production guess used only when the env var is unset —
 * confirm the real domain with the owner before launch.
 */
export const DEFAULT_SITE_URL = 'https://www.unitedbba.com'

/** Default social-share image (path under `public/`). Replace before launch. */
export const DEFAULT_OG_IMAGE_PATH = '/media/hero-poster.jpg'

export function getSiteUrl(): string {
  const fromEnv = (import.meta.env.VITE_SITE_URL as string | undefined)?.trim()
  if (fromEnv) return fromEnv.replace(/\/+$/, '')
  return DEFAULT_SITE_URL
}

/** Join site origin with a path (`/` → origin only). */
export function absoluteUrl(path = '/'): string {
  const base = getSiteUrl()
  if (!path || path === '/') return `${base}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}

/** Resolve a site-relative or absolute image URL for og/twitter tags. */
export function absoluteAssetUrl(src?: string): string {
  if (!src) return absoluteUrl(DEFAULT_OG_IMAGE_PATH)
  if (/^https?:\/\//i.test(src)) return src
  return absoluteUrl(src.startsWith('/') ? src : `/${src}`)
}
