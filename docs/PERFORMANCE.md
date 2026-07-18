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
| Images | `OptimizedImage` sets width/height, lazy-loads below-the-fold photos |
| Fonts | Ocean Rush preloaded + `font-display: swap`; Google Fonts use `display=swap` |

## Hero video loading rules

`HeroMedia` skips downloading the video when any of these are true:

- `prefers-reduced-motion: reduce`
- Network `Save-Data`
- Effective connection `2g` / `slow-2g`
- Viewport width ≤ 720px (poster-only on phones)

Video uses `preload="none"`, `muted`, `playsInline`, and `loop`. Prefer
self-hosted WebM + MP4 for production instead of hotlinking Mixkit.

### Production media files

Commit or deploy these under `public/media/` (see `public/media/README.md`):

| File | Role | Target |
| --- | --- | --- |
| `hero-poster.jpg` | LCP / fallback | ≤ 150 KB, ~1920×1080, quality ~70–80 |
| `hero.mp4` | H.264 fallback | ≤ 2–3 MB, 720p–1080p, ~2–4 Mbps |
| `hero.webm` | Modern browsers | Same resolution, VP9/AV1, usually smaller |

Env overrides (Vite):

```bash
VITE_HERO_VIDEO_MP4=/media/hero.mp4
VITE_HERO_VIDEO_WEBM=/media/hero.webm
```

Example ffmpeg encode (adjust CRF to taste):

```bash
# Poster frame
ffmpeg -y -ss 00:00:01 -i source.mov -frames:v 1 -q:v 4 public/media/hero-poster.jpg

# MP4 (H.264)
ffmpeg -y -i source.mov -vf "scale=-2:1080" -c:v libx264 -pix_fmt yuv420p \
  -profile:v high -movflags +faststart -an -crf 28 public/media/hero.mp4

# WebM (VP9)
ffmpeg -y -i source.mov -vf "scale=-2:1080" -c:v libvpx-vp9 -b:v 0 -crf 34 \
  -an public/media/hero.webm
```

Do not ship copyrighted footage without authorization. Replace Mixkit
placeholders with academy-owned media before launch.

## Still photography

| Guideline | Recommendation |
| --- | --- |
| Dimensions | Match layout: landscape cards ~1280×720; portraits ~1080×1920 |
| Format | Prefer WebP/AVIF for production; JPEG is fine for placeholders |
| Weight | Aim ≤ 120 KB per above-the-fold still; ≤ 200 KB for large heroes |
| Markup | Always set `width` / `height`; `loading="lazy"` below the fold |
| LCP | Only the hero poster (and header logo) should use `fetchpriority="high"` |
| Srcset | When exporting multiple widths, pass `srcSet` + `sizes` to `OptimizedImage` |

All paths are centralized in `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS` in
`src/data/site.ts`.

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

Or with the build already configured:

```bash
pnpm build && pnpm dlx rollup-plugin-visualizer --help
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
change results.

## Asset size limits (practical)

| Asset class | Soft limit |
| --- | --- |
| Initial JS (homepage entry + vendors, gzipped) | Keep under ~180 KB gzipped where practical |
| CSS (gzipped) | ~10–15 KB is healthy for this site |
| Hero poster | ≤ 150 KB |
| Hero video | ≤ 3 MB (prefer shorter loops) |
| Content stills | ≤ 200 KB each |

## Remaining deployment-dependent work

- Encode and upload final academy hero WebM/MP4
- Replace Mixkit stills with licensed academy photography (WebP recommended)
- Enable CDN caching + Brotli/gzip at the host
- Confirm HTTP/2 or HTTP/3 and long-cache hashed assets (`dist/assets/*`)
- Optional: self-host Google Fonts after license/ops review
