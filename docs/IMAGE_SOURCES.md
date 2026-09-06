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
| Social post thumbnails | **Restored** with caption-matched authentic `@ubbatkd` stills (promo/schedule stay feed-only) |

Files may still exist under `public/media/` for historical reference, but they
must **not** be reconnected in the UI until replaced with authentic UBBA-owned
photos / video. Prefer a fresh owner shoot of class, family, and event moments.

## Authenticity-required slots still open

| Slot | Status |
| --- | --- |
| Home hero video / poster | **Group-photo fade slideshow** from recent (2024–2026) facebook.com/ubbaad & ubbamp landscape stills (`public/media/authentic/hero-slides/`); stock Vimeo loop stays disabled |
| Program overview + detail covers | Text-first / glyph cards until owned photos exist |
| Benefits / adult & children story splits | Text-first layouts |
| Just 4 Kids tiles & event pages | Summer Camp uses authentic camp photos/videos; birthday & parents’ night out still need owner photos |
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


## Authentic Instagram media (`public/media/authentic/`)

Downloaded from the academy Instagram account `@ubbatkd`. Captions are recorded in
`MANIFEST.json`. Placement is **caption-driven**:

| Caption theme | Allowed | Not allowed |
| --- | --- | --- |
| Back-to-school promo flyers | Social feed / promo only | Program cards, Tiny Tigers, adult heroes, camp feature |
| Fall schedule / BBC training announcement | Social feed only | Any program or camp photo slot |
| Summer Camp zoo / crafts / animals / fitness / playground / field trip / group / smiles | Summer Camp page, Just 4 Kids camp tile (group/smiles), social feed | Adult programs, birthday package art |
| Birthday shout-out with board-break photo | Social feed only | Birthday Parties page |

Adult / self-defense / weapons program photography is still missing from this set —
leave those slots text-first rather than borrowing camp photos.

Web video clips (12s, ~540p) live under `public/media/authentic/videos/web/` and are
used only on the Summer Camp page with matching camp captions.

## Authentic Facebook hero slides (`public/media/authentic/hero-slides/`)

Seven **landscape-only** group photos from **recent (2024–2026)** United Black Belt
Academy Facebook posts under current ownership (Sanghyun Lee) —
[facebook.com/ubbaad](https://www.facebook.com/ubbaad/) and
[facebook.com/ubbamp](https://www.facebook.com/ubbamp/) (2025 Father’s Day, Winter
Camp, class albums, plus the current UBBA-branded cover). Pre-2024 Holmgren-era
albums are **not** used. Wired via `HERO_SLIDES` in `src/data/authenticMedia.ts`.

| Rule | Detail |
| --- | --- |
| Era | Current ownership only (school opened 2024) |
| Orientation | Width &gt; height only (≈4:3). Vertical / square IG crossposts are excluded |
| Display | `object-fit: cover` + `object-position: center 38%` so the group stays framed on tall / narrow viewports |
| Motion | Fade every ~5.5s; `prefers-reduced-motion` locks to the first slide |
| Provenance | See `public/media/authentic/hero-slides/MANIFEST.json` |

