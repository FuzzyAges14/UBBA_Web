/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical public origin for SEO/social URLs (no trailing slash). */
  readonly VITE_SITE_URL?: string
  readonly VITE_HERO_VIDEO_MP4?: string
  readonly VITE_HERO_VIDEO_WEBM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
