/**
 * Optional production overrides for self-hosted hero video.
 * Defaults point at committed files under `public/media/`.
 * Set in `.env` / host env to override (see docs/PERFORMANCE.md).
 *
 * VITE_HERO_VIDEO_MP4=/media/hero.mp4
 * VITE_HERO_VIDEO_WEBM=/media/hero.webm
 *
 * Safe outside Vite (e.g. `tsx scripts/generate-sitemap.ts`) where
 * `import.meta.env` may be undefined.
 */
function readViteEnv(key: 'VITE_HERO_VIDEO_MP4' | 'VITE_HERO_VIDEO_WEBM'): string | undefined {
  try {
    const env = import.meta.env as Record<string, string | undefined> | undefined
    const value = env?.[key]
    return typeof value === 'string' && value.length > 0 ? value : undefined
  } catch {
    return undefined
  }
}

export function heroVideoMp4(fallback = '/media/hero.mp4'): string {
  return readViteEnv('VITE_HERO_VIDEO_MP4') ?? fallback
}

export function heroVideoWebm(fallback = '/media/hero.webm'): string | undefined {
  return readViteEnv('VITE_HERO_VIDEO_WEBM') ?? fallback
}
