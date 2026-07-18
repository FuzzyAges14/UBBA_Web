# Public media (`public/media`)

Self-hosted temporary stock (commercially licensed) plus production hero video.
Licenses and provenance: [`docs/IMAGE_SOURCES.md`](../../docs/IMAGE_SOURCES.md).
Encoding targets: [`docs/PERFORMANCE.md`](../../docs/PERFORMANCE.md).

## Files

| Path | Required? | Notes |
| --- | --- | --- |
| `hero-poster.jpg` / `.webp` | Yes | LCP poster; responsive `-960` / `-1280` siblings |
| `hero-poster-mobile.jpg` / `.webp` | Yes | Tighter crop for ≤720px via `<picture>` |
| `hero.mp4` | Yes | H.264, `+faststart`, muted loop, ~2.5 MB |
| `hero.webm` | Yes | VP9 companion, ~2.1 MB |
| `og-default.jpg` | Yes | 1200×630 social share |
| `kids-kicks.*` | Temporary | Wikimedia CC0 — Tiny Tigers |
| `kids-group.*` | Temporary | Wikimedia CC0 — Junior / family |
| `teen-training.*` | Temporary | Pexels outdoor class |
| `adult-action.*` | Temporary | Mixkit Free adult black-belt frame |
| `respect-bow.*` | Temporary | Pexels mentorship / respect (replaces hero reuse for `beltTest`) |
| `owner-portrait.jpg` | **Not committed** | OWNER PHOTO REQUIRED — UI uses Placeholder |

Responsive widths: `*-640`, `*-960`, `*-1280` (and `*-1920` where applicable), each as JPEG + WebP.

## Env overrides

Defaults already point at these files. Optional overrides:

```bash
VITE_HERO_VIDEO_MP4=/media/hero.mp4
VITE_HERO_VIDEO_WEBM=/media/hero.webm
```
