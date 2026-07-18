# Image & Video Source Document

Production media is **self-hosted** under `public/media/` and referenced only
from `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS` / `IMAGE_SRCSETS` in
`src/data/site.ts`.

Primary source: the live academy site
[unitedbba.com](https://unitedbba.com/) (same company). Assets were downloaded
from `/upload/` on 2026-07-18, re-encoded for responsive delivery, and committed
locally. Do **not** hotlink `unitedbba.com` in production.

The old site had **no self-hosted hero video** — only a YouTube embed of an ATA
franchise testimonial (`dKHeXC_2bHE`). The hero loop here is a Ken Burns montage
built from unitedbba.com stills (adult kick, kids class, TKD group, adult
featured portrait).

## Integrated production assets (2026-07-18)

| Key / file | Usage | Source URL | Notes | Temporary? |
| --- | --- | --- | --- | --- |
| `hero.mp4` / `hero.webm` | Home hero loop | Ken Burns from unitedbba.com stills below | H.264 ~1.2 MB · VP9 ~0.8 MB · ~12s | Prefer authentic dojang footage when available |
| `hero-poster.jpg` (+ responsive / mobile) | Hero LCP poster | [Adult-Martial-Arts.jpg](https://unitedbba.com/upload/about_us/Adult-Martial-Arts.jpg) | High-kick action still | No |
| `og-default.jpg` | Open Graph / Twitter | Crop of adult action still | 1200×630 | No |
| `owner-portrait.jpg` | Home “Meet The Owner” | [Owner-Sang.png](https://unitedbba.com/upload/about_us/Owner-Sang.png) | Master Lee / Sanghyun Lee portrait | No |
| `kids-kicks.jpg` (+ responsive) | Tiny Tigers / kids kicks | [kids-martial-arts-featured.jpg](https://unitedbba.com/upload/featuredprograms/1781612542kids-martial-arts-featured.jpg) | Featured kids program portrait | No |
| `kids-group.jpg` (+ responsive) | Junior / children overview | [kids-martial-arts1.jpg](https://unitedbba.com/upload/about_us/kids-martial-arts1.jpg) | Kids class punching line | No |
| `teen-training.jpg` (+ responsive) | Teen / Olympic sparring | [element_image_3.jpg](https://unitedbba.com/upload/featured/15095578651502090678element_image_3.jpg) | Multi-age TKD group pose | No |
| `adult-action.jpg` (+ responsive) | Adult / SWAT / benefits | [Adult-Martial-Arts.jpg](https://unitedbba.com/upload/about_us/Adult-Martial-Arts.jpg) | Same family as hero poster | No |
| `respect-bow.jpg` (+ responsive) | Self-defense / weapons (`beltTest`) | [Karate-belt6.jpg](https://unitedbba.com/upload/program_category/Karate-belt6.jpg) | Black-belt grip banner | No |
| `birthday-party.jpg` (+ responsive) | Birthday Parties | [birthdays-1.jpg](https://unitedbba.com/upload/programs/17816104581739211609birthdays-1.jpg) | Just 4 Kids | No |
| `summer-camp.jpg` (+ responsive) | Summer Camp | [Summer-Camp.jpg](https://unitedbba.com/upload/programs/1520533409Summer-Camp.jpg) | Just 4 Kids | No |
| `parents-night-out.jpg` (+ responsive) | Parents’ Night Out | [parents-night-out.jpg](https://unitedbba.com/upload/programs/1781611869parents-night-out.jpg) | Dojang pizza / games night | No |

### Other unitedbba.com media inventoried (not all wired)

Crawled from the sitemap + program pages. Icons, UI graphics, and WebsiteDojo
template cutouts were skipped for photographic slots. Notable extras available
if needed later:

- Featured: junior-tigers / Adult-Martial-Arts featured portraits
- About header / welcome B&W class stills (`owner-bg1`, `Welcome-Text-karate-*`)
- Self-defense: `womens-self-defense.jpg`, Krav backgrounds
- Staff thumb: `/upload/staff/thumb/1726173772Instructor_image.png` (210×250)
- YouTube only: ATA testimonial embed (not self-hosted; not used as hero)

### Rights

These files were published on the academy’s own production website for the same
business. Treat as academy-controlled marketing assets. Prefer a fresh owner
photo shoot and location exteriors before launch when available.

## Authenticity-required slots still open

| Slot | Status |
| --- | --- |
| Allendale / Midland Park / Glen Rock exteriors & interiors | `OwnerMediaSlot` placeholders — **location photos still needed** |
| Testimonials | Text-only until owner-approved reviews |
| Native dojang hero video | Ken Burns still-montage in place; replace with real footage when shot |

## Brand logo

| Asset | Usage | File / URL | Source | Temporary? |
| --- | --- | --- | --- | --- |
| Site logo / favicon | Header, footer, browser tab | `/logo.png` | Official logo from [unitedbba.com/upload/logo.png](https://unitedbba.com/upload/logo.png) | No |

## Fonts

| Font | Usage | Source | License |
| --- | --- | --- | --- |
| Ocean Rush (DEMO) | Home hero title only (`public/fonts/OceanRush.otf`) | The Branded Quotes (dafont) | **Free for personal use only — purchase a commercial license before launch** (https://sellfy.com/p/tbmhcl/) |
| Teko / Anton / Inter | Headings & body | Google Fonts | Open Font License (free, commercial OK) |

## Rules

1. Do not hotlink production media (including `unitedbba.com/upload/…`).
2. Do not commit watermarked previews or paid stock without a license receipt.
3. Do not present unrelated third-party stock people as UBBA students when
   academy site assets are available.
4. Do not use stock facility photos as UBBA locations.
5. Update this file whenever an integrated asset changes.
6. Prefer authentic continuous hero footage over the Ken Burns still montage
   when the academy provides a video.
