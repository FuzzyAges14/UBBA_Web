# Image & Video Source Document

The site uses **free placeholder media** so the design can be evaluated with real
Taekwondo imagery. Photos show a small `Placeholder photo` credit in the UI.
Replace with the academy's own licensed photography before launch and update this
file. All media is referenced centrally from `IMAGES` in `src/data/site.ts`.

## Current media

All current stills are frames captured from Mixkit's free Taekwondo stock videos
and are committed under `public/media/`. Mixkit's Free License permits commercial
use with **no attribution required**.

| Key | Page · section | File / URL | Source | License | Attribution? | Temporary? |
| --- | --- | --- | --- | --- | --- | --- |
| `heroVideo` | Home · hero background | https://assets.mixkit.co/videos/49706/49706-1080.mp4 | Mixkit (49706) | Mixkit Free License | No | Yes |
| `heroPoster` | Home · hero poster | `/media/hero-poster.jpg` (frame of 49706) | Mixkit | Mixkit Free License | No | Yes |
| `instructorPortrait` | Home · owner | `/media/instructor-portrait.jpg` (frame of 49705) | Mixkit | Mixkit Free License | No | Yes — replace with real owner photo |
| `action` | Adult/story sections | `/media/adult-action.jpg` (frame of 49706) | Mixkit | Mixkit Free License | No | Yes |
| `kidsKicks` | Tiny Tigers, camp | `/media/kids-stance.jpg` (frame of 48141) | Mixkit | Mixkit Free License | No | Yes |
| `kidsGroup` | Junior/Family/features | `/media/kids-bow.jpg` (frame of 48140) | Mixkit | Mixkit Free License | No | Yes |
| `teenSpar` | Teen/Olympic | `/media/kids-motion.jpg` (frame of 48139) | Mixkit | Mixkit Free License | No | Yes |
| `beltTest` | Self Defense/Weapons/events | `/media/hero-poster.jpg` | Mixkit | Mixkit Free License | No | Yes |

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

- **Owner portrait:** `instructorPortrait` is a generic stand-in — replace with a
  real photo of Sanghyun Lee.
- For production, self-host the final hero video instead of hotlinking Mixkit.
  Use `VITE_HERO_VIDEO_MP4` / `VITE_HERO_VIDEO_WEBM` and the encode guidance in
  [`docs/PERFORMANCE.md`](PERFORMANCE.md).
- No low-resolution or watermarked images; no AI-generated people without
  disclosure; do not misrepresent Taekwondo with unrelated martial arts imagery.
