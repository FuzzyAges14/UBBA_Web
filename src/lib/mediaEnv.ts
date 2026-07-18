/**
 * Optional production overrides for self-hosted hero video.
 * Set in `.env` / host env (see docs/PERFORMANCE.md).
 *
 * VITE_HERO_VIDEO_MP4=/media/hero.mp4
 * VITE_HERO_VIDEO_WEBM=/media/hero.webm
 *
 * Safe under Vite, Vitest, and plain Node (e.g. `pnpm sitemap` via tsx).
 */
function readViteEnv(key: 'VITE_HERO_VIDEO_MP4' | 'VITE_HERO_VIDEO_WEBM'): string | undefined {
  const viteEnv =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env[key] as string | undefined)
      : undefined
  const nodeEnv =
    typeof process !== 'undefined' ? process.env?.[key] : undefined
  const value = (viteEnv ?? nodeEnv)?.trim()
  return value && value.length > 0 ? value : undefined
}

export function heroVideoMp4(fallback: string): string {
  return readViteEnv('VITE_HERO_VIDEO_MP4') ?? fallback
}

export function heroVideoWebm(): string | undefined {
  return readViteEnv('VITE_HERO_VIDEO_WEBM')
}
