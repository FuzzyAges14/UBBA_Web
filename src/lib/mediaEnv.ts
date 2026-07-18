/**
 * Optional production overrides for self-hosted hero video.
 * Set in `.env` / host env (see docs/PERFORMANCE.md).
 *
 * VITE_HERO_VIDEO_MP4=/media/hero.mp4
 * VITE_HERO_VIDEO_WEBM=/media/hero.webm
 */
export function heroVideoMp4(fallback: string): string {
  const fromEnv = import.meta.env.VITE_HERO_VIDEO_MP4
  return typeof fromEnv === 'string' && fromEnv.length > 0 ? fromEnv : fallback
}

export function heroVideoWebm(): string | undefined {
  const fromEnv = import.meta.env.VITE_HERO_VIDEO_WEBM
  return typeof fromEnv === 'string' && fromEnv.length > 0 ? fromEnv : undefined
}
