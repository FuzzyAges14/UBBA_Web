# Image & Video Source Document

Production media is **self-hosted** under `public/media/` and referenced only
from `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS` / `IMAGE_SRCSETS` in
`src/data/site.ts`. Assets below follow Agent 2’s temporary free package in
[`MEDIA_CANDIDATES.md`](MEDIA_CANDIDATES.md) (PR #27) until authentic UBBA
photography and footage replace them.

Photos show a `Temporary stock photo` credit in program detail UI. Do **not**
present stock participants as UBBA students, instructors, or locations.

## Integrated production assets (2026-07-18)

| Key / file | Usage | Source URL · ID | Creator | License | Download date | Original → production | Size | Temporary? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `hero.mp4` | Home hero (H.264) | [Pexels 7045155](https://www.pexels.com/video/master-demonstrating-his-martial-art-skills-7045155/) | RDNE Stock project | [Pexels License](https://www.pexels.com/license/) — free commercial; no attribution required; no endorsement implication | 2026-07-18 | 1920×1080 source → 1920×1080 CRF28 muted `+faststart` | 2.5 MB | Yes — prefer authentic UBBA loop |
| `hero.webm` | Home hero (VP9) | same | same | Pexels License | 2026-07-18 | 1280×720 VP9 CRF34 muted | 2.1 MB | Yes |
| `hero-poster.jpg` (+ `.webp`, `-960`, `-1280`) | Hero LCP poster | Frame @ ~5s of 7045155 | RDNE | Pexels License | 2026-07-18 | 1920×1080 JPEG q≈78 | 97 KB (JPEG) / 71 KB (WebP) | Yes |
| `hero-poster-mobile.jpg` (+ `-640`, `.webp`) | ≤720px poster crop | same frame, attention crop 4:5 | RDNE | Pexels License | 2026-07-18 | 960×1200 | 76 KB | Yes |
| `og-default.jpg` | Open Graph / Twitter default | Crop of hero frame | RDNE | Pexels License | 2026-07-18 | 1200×630 | 67 KB | Yes |
| `kids-kicks.jpg` (+ responsive) | Tiny Tigers / kids kicks slots | [Wikimedia CC0 class 01](https://commons.wikimedia.org/wiki/File:Children_practicing_taekwondo_in_National_stadium_01.jpg) | Oluwatoyinp | **CC0 1.0** — commercial OK; EXIF GPS stripped | 2026-07-18 | 4032×3024 → 1280×720 (+640/960) | 221 KB @1280 | Yes |
| `kids-group.jpg` (+ responsive) | Junior / family group slots | [Wikimedia CC0 class 05](https://commons.wikimedia.org/wiki/File:Children_practicing_taekwondo_in_National_stadium_05.jpg) | Oluwatoyinp | **CC0 1.0** — EXIF GPS stripped | 2026-07-18 | 4032×3024 → 1280×720 | 189 KB @1280 | Yes |
| `teen-training.jpg` (+ responsive) | Teen / Olympic sparring slots | [Pexels 30777328](https://www.pexels.com/photo/taekwondo-class-training-session-outdoors-30777328/) | Martin.que | Pexels License | 2026-07-18 | 8629×5753 → 1280×720 | 131 KB @1280 | Yes |
| `adult-action.jpg` (+ responsive) | Adult / SWAT action slots | Frame of [Mixkit 49632](https://mixkit.co/free-stock-video/a-young-man-practicing-karate-moves-49632/) | Mixkit | [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree) — commercial OK | 2026-07-18 | 1920×1080 frame | 39 KB @1920 | Yes — karate studio; alt should say martial arts training |
| `respect-bow.jpg` (+ responsive) | Self-defense / weapons (`beltTest`) — no longer reuses hero | [Pexels 7991209](https://www.pexels.com/photo/a-martial-arts-instructor-bowing-to-a-student-7991209/) | cottonbro studio | Pexels License | 2026-07-18 | 6365×4243 → 1920×1080 | 115 KB @1920 | Yes — respect/mentorship mood; not a belt-test photo |

### License notes (verified on asset pages 2026-07-18)

- **Pexels:** Free commercial use; attribution not required; may edit; do not sell unaltered copies as stock; do not imply endorsement; identifiable people must not be shown in a bad light.
- **Mixkit Free:** Commercial and personal use without attribution; redistribution as competing stock prohibited.
- **CC0:** Public domain dedication; attribution appreciated but not required.
- **Minors:** Several assets depict recognizable children — stock only; never present as UBBA students.
- **Model/property release:** Per platform license terms; not separately verified beyond license page.
- **Editing:** All stills re-encoded (resize, JPEG/WebP); EXIF GPS removed from Wikimedia phone photos.
- **Self-host:** Yes for all integrated files. No production hotlinks remain.

## Removed / rejected (do not restore)

| Former asset | Reason |
| --- | --- |
| Mixkit CDN `49706-1080.mp4` hotlink | Third-party production dependency; karate void-studio art direction |
| `/media/kids-stance.jpg` (Mixkit **48141** frame) | Mixkit **Restricted** free tier — personal use only |
| `/media/kids-bow.jpg` (Mixkit **48140** frame) | Mixkit Restricted |
| `/media/kids-motion.jpg` (Mixkit **48139** frame) | Mixkit Restricted + severe compression |
| `/media/instructor-portrait.jpg` (Mixkit **49705** frame) | Misrepresents academy owner; UI already uses Placeholder |
| Unsplash `Yf1SegAI84o` (Agent 2 AD1) | Visual inspection showed **BJJ grappling**, not Taekwondo — rejected for accuracy |

## Authenticity-required slots (no stock substituted)

| Slot | Status |
| --- | --- |
| Owner portrait (`Sanghyun Lee`) | Placeholder in UI · path reserved as `/media/owner-portrait.jpg` · **OWNER PHOTO REQUIRED** |
| Allendale / Midland Park / Glen Rock exteriors & interiors | Placeholder / location cards · **OWNER PHOTO REQUIRED** |
| Birthday / Summer Camp / Parents’ Night Out as historical UBBA events | `MediaFrame` placeholders — do not fake with party stock |
| Testimonials | Text-only until owner-approved reviews |

## Brand logo

| Asset | Usage | File / URL | Source | Temporary? |
| --- | --- | --- | --- | --- |
| Site logo / favicon | Header, footer, browser tab | `/logo.png` | Official United Black Belt Academy logo from [unitedbba.com/upload/logo.png](https://unitedbba.com/upload/logo.png) | No — current academy logo |

## Fonts

| Font | Usage | Source | License |
| --- | --- | --- | --- |
| Ocean Rush (DEMO) | Home hero title only (`public/fonts/OceanRush.otf`) | The Branded Quotes (dafont) | **Free for personal use only — purchase a commercial license before launch** (https://sellfy.com/p/tbmhcl/) |
| Teko / Anton / Inter | Headings & body | Google Fonts | Open Font License (free, commercial OK) |

## Rules

1. Do not hotlink production media.
2. Do not commit watermarked previews or paid stock without a license receipt.
3. Do not present stock people as UBBA students, instructors, or the owner.
4. Do not use stock facility photos as UBBA locations.
5. Update this file whenever an integrated asset changes.
6. Prefer authentic UBBA hero footage (Agent 2 V-H12) before launch.
