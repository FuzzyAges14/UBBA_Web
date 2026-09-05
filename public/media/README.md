# Public media (`public/media`)

Self-hosted photography and hero video sourced from the live
[unitedbba.com](https://unitedbba.com/) site (same academy).
Licenses and provenance: [`docs/IMAGE_SOURCES.md`](../../docs/IMAGE_SOURCES.md).
Encoding targets: [`docs/PERFORMANCE.md`](../../docs/PERFORMANCE.md).

## Files

| Path | Required? | Notes |
| --- | --- | --- |
| `hero-poster.jpg` / `.webp` | Yes | LCP poster from hero loop frame; `-960` / `-1280` siblings |
| `hero-poster-mobile.jpg` / `.webp` | Yes | Tighter crop for ≤720px via `<picture>` |
| `hero.mp4` | Yes | Same Vimeo BG as live unitedbba.com (WebsiteDojo stock), H.264 `+faststart` |
| `hero.webm` | Yes | VP9 companion |
| `og-default.jpg` | Yes | 1200×630 social share |
| `owner-portrait.jpg` | Yes | Master Lee / Sanghyun Lee from unitedbba.com |
| `kids-kicks.*` | Yes | Featured kids program portrait |
| `kids-group.*` | Yes | Kids class line |
| `teen-training.*` | Yes | Multi-age TKD group |
| `adult-action.*` | Yes | Adult high-kick action |
| `respect-bow.*` | Yes | Black-belt grip banner (`beltTest`) |
| `birthday-party.*` | Yes | Just 4 Kids birthday |
| `summer-camp.*` | Yes | Just 4 Kids camp |
| `parents-night-out.*` | Yes | Just 4 Kids PNO |
| `social/instagram-profile.jpg` | Yes | Instagram profile avatar (Follow Us) |
| `social/facebook-profile.jpg` | Yes | Facebook Page avatar from Graph (Follow Us) |
| `social/*-post-*.jpg` | Yes | Curated post preview thumbs (fallback when Meta live feed is off) |

Responsive widths: `*-640`, `*-960`, `*-1280` (and `*-1920` where applicable), each as JPEG + WebP.

## Env overrides

```bash
VITE_HERO_VIDEO_MP4=/media/hero.mp4
VITE_HERO_VIDEO_WEBM=/media/hero.webm
```

## Licensing note (2026-09-05)

UI no longer mounts WebsiteDojo / Vimeo stock hero video or stock program stills.
Only the Master Lee owner portrait is treated as an authentic academy likeness for
display. Other files under this folder are quarantined until replaced with
UBBA-owned photography — see `docs/IMAGE_SOURCES.md`.
