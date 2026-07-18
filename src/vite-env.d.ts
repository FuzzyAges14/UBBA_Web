/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical public origin for SEO/social URLs (no trailing slash). */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
