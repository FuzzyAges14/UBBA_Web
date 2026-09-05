# Image & Video Source Document

Production media is **self-hosted** under `public/media/` and referenced only
from `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS` / `IMAGE_SRCSETS` in
`src/data/site.ts`.

## Licensing status (2026-09-05 audit)

A full crawl of [unitedbba.com](https://unitedbba.com/) found that nearly all
program / lifestyle photographs on the previous WebsiteDojo site are **template
stock or commercial studio cutouts**, not academy-owned dojang photography.

Per owner direction (**no stolen / paid-license stock on this rebuild**):

| Asset class | Status in this repo UI |
| --- | --- |
| WebsiteDojo / Vimeo hero loop (`253381000`) | **Disabled** — `shouldLoadHeroVideo()` always returns `false`; hero uses a brand atmosphere panel only |
| WebsiteDojo / stock program stills (adult kick, kids line, teen studio group, belt grip, birthday/camp/PNO stock, featured cutouts) | **Not wired in UI** — program cards, overview splits, detail covers, benefits media, and Just 4 Kids frames use text / placeholder layouts instead |
| Master Lee / Sanghyun Lee portrait (`owner-portrait.jpg`) | **Allowed** — academy owner portrait from unitedbba.com about assets; shown with `object-fit: contain` so the full portrait is visible |
| Brand logo (`/logo.png`) | **Allowed** — academy logo |
| Social post thumbnails previously duplicated from stock stills | **Removed** from curated fallback posts (captions + links remain) |

Files may still exist under `public/media/` for historical reference, but they
must **not** be reconnected in the UI until replaced with authentic UBBA-owned
photos / video. Prefer a fresh owner shoot of class, family, and event moments.

## Authenticity-required slots still open

| Slot | Status |
| --- | --- |
| Home hero video / poster | Brand panel only until owned footage exists |
| Program overview + detail covers | Text-first / glyph cards until owned photos exist |
| Benefits / adult & children story splits | Text-first layouts |
| Just 4 Kids tiles & event pages | `MediaFrame` placeholders with “OWNER PHOTO REQUIRED” |
| Allendale / Midland Park exteriors & interiors | `OwnerMediaSlot` placeholders |
| Testimonials | Text-only until owner-approved reviews |

## Brand logo

| Asset | Usage | File / URL | Source | Temporary? |
| --- | --- | --- | --- | --- |
| Site logo / favicon | Header, footer, browser tab | `/logo.png` | Official logo from unitedbba.com | No |

## Fonts

| Font | Usage | Source | License |
| --- | --- | --- | --- |
| Ocean Rush (DEMO) | Home hero title only (`public/fonts/OceanRush.otf`) | The Branded Quotes (dafont) | **Free for personal use only — purchase a commercial license before launch** |
| Teko / Anton / Inter | Headings & body | Google Fonts | Open Font License (free, commercial OK) |

## Rules

1. Do not hotlink production media (including `unitedbba.com/upload/…`).
2. Do not commit watermarked previews or paid stock without a license receipt.
3. Do not present unrelated third-party stock people as UBBA students.
4. Do not use stock facility photos as UBBA locations.
5. Do not re-enable the WebsiteDojo / Vimeo hero loop.
6. Update this file whenever an integrated asset changes.
7. When authentic photos arrive, assign **unique** images per page slot — avoid
   repeating the same photo on home, overview, and detail pages.
