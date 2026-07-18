# Frontend performance guide

Guidance for Core Web Vitals–friendly media, fonts, and bundle checks on the
UBBA marketing site. Design fidelity stays the same; this document covers
loading strategy and deployment-time measurement.

## What this codebase already does

| Area | Behavior |
| --- | --- |
| Route splitting | Homepage is eager; other pages use `React.lazy` + `Suspense` (`src/App.tsx`) |
| Vendor chunks | `react` / `react-dom` / `react-router` and `framer-motion` are split in `vite.config.ts` |
| Hero media | Eager poster (`fetchpriority=high`); video loads only when conditions allow |
| Images | `OptimizedImage` sets width/height, lazy-loads below-the-fold photos; `srcSet` from `IMAGE_SRCSETS` |
| Fonts | Ocean Rush preloaded + `font-display: swap`; Google Fonts use `display=swap` |

## Hero video loading rules

`HeroMedia` skips downloading the video when any of these are true:

- `prefers-reduced-motion: reduce`
- Network `Save-Data`
- Effective connection `2g` / `slow-2g`
- Viewport width ≤ 720px (poster-only on phones — mobile poster crop via `<picture>`)

Video uses `preload="none"`, `muted`, `playsInline`, and `loop`. Production
defaults are self-hosted `/media/hero.mp4` + `/media/hero.webm` (no CDN hotlink).

### Production media files

Committed under `public/media/` (see `public/media/README.md`):

| File | Role | Target | Current (2026-07-18) |
| --- | --- | --- | --- |
| `hero-poster.jpg` | LCP / fallback | ≤ 150 KB, ~1920×1080 | **~123 KB** (unitedbba.com adult kick) |
| `hero-poster.webp` | Modern LCP candidate | Smaller than JPEG | WebP sibling committed |
| `hero-poster-mobile.jpg` | ≤720px art-directed crop | ≤ 120 KB | Mobile crop committed |
| `hero.mp4` | H.264 fallback | ≤ 2–3 MB, 720p–1080p | **~1.2 MB** Ken Burns still montage |
| `hero.webm` | Modern browsers | Same duration, VP9 | **~0.8 MB** |
| `og-default.jpg` | Social share | 1200×630 | **~62 KB** |

Env overrides (Vite) — optional now that defaults are local:

```bash
VITE_HERO_VIDEO_MP4=/media/hero.mp4
VITE_HERO_VIDEO_WEBM=/media/hero.webm
```

Example ffmpeg encode (adjust CRF to taste):

```bash
# Poster frame
ffmpeg -y -ss 00:00:05 -i source.mp4 -frames:v 1 -q:v 4 public/media/hero-poster.jpg

# MP4 (H.264)
ffmpeg -y -i source.mp4 -vf "scale=-2:1080" -c:v libx264 -pix_fmt yuv420p \
  -profile:v high -movflags +faststart -an -crf 28 public/media/hero.mp4

# WebM (VP9)
ffmpeg -y -i source.mp4 -vf "scale=-2:720" -c:v libvpx-vp9 -b:v 0 -crf 34 \
  -an -row-mt 1 public/media/hero.webm
```

Production stills and the hero montage are sourced from unitedbba.com
(see `docs/IMAGE_SOURCES.md`). Prefer continuous dojang footage when available.

## Still photography

| Guideline | Recommendation |
| --- | --- |
| Dimensions | Match layout: landscape cards ~1280×720; portraits ~1080×1920 |
| Format | JPEG fallback + WebP sibling committed for each primary still |
| Responsive | Widths 640 / 960 / 1280 (and 1920 for large heroes) via `IMAGE_SRCSETS` |
| Weight | Aim ≤ 120 KB per above-the-fold still; ≤ 200 KB for large heroes |
| Markup | Always set `width` / `height`; `loading="lazy"` below the fold |
| LCP | Only the hero poster (and header logo) should use `fetchpriority="high"` |
| Srcset | `ProgramCard` / `ProgramDetail` / `HeroMedia` pass `srcSet` + `sizes` |

All paths are centralized in `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS` /
`IMAGE_SRCSETS` in `src/data/site.ts`.

## Before / after media weights (Agent 3 — 2026-07-18)

| Class | Before | After |
| --- | --- | --- |
| Committed stills (JPEG only) | **200 KB** total (6 soft Mixkit frames, incl. Restricted kids) | **~1.2 MB** primary JPEGs + responsive/WebP siblings (**~4.0 MB** all still derivatives) |
| Hero video | Mixkit CDN hotlink (~3.7 MB listed; not self-hosted) | **2.5 MB** MP4 + **2.1 MB** WebM self-hosted |
| Third-party production media requests | Mixkit CDN on video load | **None** (local `/media/*` only) |
| Largest LCP still | Soft 34 KB 1920×1080 karate poster | **97 KB** class-scene poster (sharper, intentional) |

Notes:

- Still weight increased deliberately: previous files were over-compressed video
  frames unsuitable for a premium site. Responsive `srcSet` keeps mobile
  downloads near the 640w variants (~40–60 KB for many slots).
- Restricted Mixkit kids frames were removed (license risk), not merely re-encoded.

## Fonts

| Font | Notes |
| --- | --- |
| Ocean Rush | ~55 KB OTF, self-hosted, preloaded, `font-display: swap`. **Demo license — purchase before commercial launch.** |
| Teko / Anton / Inter | Loaded from Google Fonts with `display=swap` and `preconnect`. |

Avoid adding extra weights. Self-hosting Google Fonts later can shave a DNS
hop but is optional.

## Bundle analysis

```bash
pnpm build
ls -lah dist/assets
```

Inspect gzip sizes printed by Vite. For a treemap without adding a permanent
dependency:

```bash
pnpm dlx vite-bundle-visualizer
```

Expect: a `react-vendor` chunk, a `motion` chunk, the homepage entry, and
per-route chunks for Privacy, Terms, events, programs, etc.

## Lighthouse after deploy

1. Deploy a production build (`pnpm build` → host `dist/`).
2. Open Chrome DevTools → Lighthouse (or PageSpeed Insights).
3. Test the **homepage** and one secondary route (e.g. `/programs/children`) on
   **mobile** throttling.
4. Focus on LCP (hero poster), CLS (image dimensions), INP (nav / forms).
5. Re-test with “Reduce motion” enabled and on a mid-tier Android profile.

Do not treat local `pnpm preview` scores as final — CDN, TLS, and cache headers
change results. Do not claim a Lighthouse score without running Lighthouse.

## Asset size limits (practical)

| Asset class | Soft limit |
| --- | --- |
| Initial JS (homepage entry + vendors, gzipped) | Keep under ~180 KB gzipped where practical |
| CSS (gzipped) | ~10–15 KB is healthy for this site |
| Hero poster | ≤ 150 KB |
| Hero video | ≤ 3 MB (prefer shorter loops) |
| Content stills (primary) | ≤ 220 KB each @1280w |
| Mobile srcset candidate | Prefer ≤ 80 KB @640w |

## Remaining deployment-dependent work

- Replace temporary stock with licensed academy photography (prefer WebP + JPEG)
- Encode authentic UBBA hero WebM/MP4 when footage exists
- Enable CDN caching + Brotli/gzip at the host
- Confirm HTTP/2 or HTTP/3 and long-cache hashed assets (`dist/assets/*`)
- Optional: self-host Google Fonts after license/ops review
