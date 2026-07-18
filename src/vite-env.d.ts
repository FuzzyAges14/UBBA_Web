/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HERO_VIDEO_MP4?: string
  readonly VITE_HERO_VIDEO_WEBM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
