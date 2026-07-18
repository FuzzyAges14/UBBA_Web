# Public media (`public/media`)

Placeholder stills are committed for design review. Production hero video files
are **not** committed by default (size + licensing). Place them here before
launch and set the Vite env vars documented in `docs/PERFORMANCE.md`.

## Expected production files

| Path | Required? | Notes |
| --- | --- | --- |
| `hero-poster.jpg` | Yes | Already committed; replace with academy frame |
| `hero.mp4` | Recommended | H.264, `+faststart`, muted loop, ≤ ~3 MB |
| `hero.webm` | Recommended | VP9/AV1 companion for modern browsers |
| `adult-action.jpg` | Temporary | Mixkit placeholder |
| `kids-*.jpg` | Temporary | Mixkit placeholders |
| `instructor-portrait.jpg` | Temporary | Replace with owner photo |

After adding `hero.mp4` / `hero.webm`:

```bash
VITE_HERO_VIDEO_MP4=/media/hero.mp4
VITE_HERO_VIDEO_WEBM=/media/hero.webm
```
