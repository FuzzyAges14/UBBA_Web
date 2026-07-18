# UBBA Media Audit

**Agent:** 2 — Media Audit, Research, and Licensing  
**Branch baseline:** `origin/main` @ `0d8116f` (2026-07-18)  
**Scope:** Inventory every media slot, quality problems, crop requirements, and whether stock vs authentic UBBA media is acceptable.  
**Companion docs:** [`MEDIA_CANDIDATES.md`](MEDIA_CANDIDATES.md), [`UBBA_PHOTO_VIDEO_SHOT_LIST.md`](UBBA_PHOTO_VIDEO_SHOT_LIST.md)

---

## 1. Executive summary

The site’s photographic system is centralized and structurally sound (`IMAGES`, `HERO_MEDIA`, `IMAGE_DIMENSIONS`, `OptimizedImage`, `HeroMedia`, `MediaFrame`), but **production media quality and licensing are not launch-ready**.

Critical findings:

1. **Heavy compression / video-frame stills.** Committed JPEGs are Mixkit video frames (`Lavc` encoder comment). File weights are extremely low for their pixel dimensions (≈17–42 KB at 1280×720 or 1920×1080), producing soft, blotchy, non-cinematic stills.
2. **Hero video is a third-party CDN hotlink** (`assets.mixkit.co` … `49706-1080.mp4`). Production must self-host.
3. **Martial-arts accuracy gap.** Hero asset Mixkit **49706** is titled and described as a **karate** fighter on a black studio backdrop — not a family dojang / Taekwondo class scene.
4. **Licensing error in current kids stills provenance.** Frames for `kidsKicks`, `kidsGroup`, and `teenSpar` come from Mixkit **48141 / 48140 / 48139**. On 2026-07-18 those asset pages offer free 720p under **Mixkit Restricted License (personal use only)**; commercial use requires Envato/premium. Current `IMAGE_SOURCES.md` incorrectly labels them Mixkit Free License. **Do not ship those frames commercially without a paid license or replacement.**
5. **Many high-visibility slots are non-photo placeholders** (`Placeholder` / `MediaFrame`), so large parts of the journey have no real imagery yet.
6. **Owner / location authenticity rules remain hard requirements.** Stock must never stand in for Sanghyun Lee, real dojang interiors/exteriors, or testimonials.

---

## 2. Media architecture (verified present)

| System | Location | Status |
| --- | --- | --- |
| `IMAGES` registry | `src/data/site.ts` | Present — 7 keys |
| `HERO_MEDIA` | `src/data/site.ts` + `src/lib/mediaEnv.ts` | Present — poster / mp4 / optional webm / production paths |
| `IMAGE_DIMENSIONS` + `imageDimensionsFor()` | `src/data/site.ts` | Present — CLS-safe sizes |
| `HeroMedia` | `src/components/HeroMedia.tsx` | Present — poster LCP, conditional video, pause/play, reduced-motion |
| `OptimizedImage` | `src/components/OptimizedImage.tsx` | Present — width/height, lazy, optional srcset |
| `MediaFrame` | `src/components/MediaFrame.tsx` | Present — wraps `Placeholder` (+ stickers) |
| `Placeholder` | `src/components/Placeholder.tsx` | Present — labeled empty frames |
| Local media | `public/media/*` | 6 JPEGs + README; **no** `hero.mp4` / `hero.webm` committed |
| Brand logo | `public/logo.png` | Official UBBA logo (300×282) |
| Docs | `docs/IMAGE_SOURCES.md`, `docs/PERFORMANCE.md` | Present; sources doc needs license correction for kids frames |
| OG default | `src/config/siteUrl.ts` → `/media/hero-poster.jpg` | Present |
| Motifs / textures | `src/styles/motifs.css` (`.dojang`, `.belt-bar`) | CSS-only — no raster texture assets |

---

## 3. Current committed file inventory

| File | Pixel size | Bytes | Source (per docs / provenance) | Notes |
| --- | --- | --- | --- | --- |
| `public/media/hero-poster.jpg` | 1920×1080 | 33,834 | Mixkit 49706 frame | Soft; black studio; used as poster + OG + `beltTest` |
| `public/media/adult-action.jpg` | 1920×1080 | 33,764 | Mixkit 49706 frame | Same scene family as hero |
| `public/media/instructor-portrait.jpg` | 1080×1920 | 42,304 | Mixkit 49705 frame (vertical) | **Not owner**; registered but UI uses Placeholder |
| `public/media/kids-stance.jpg` | 1280×720 | 34,605 | Mixkit 48141 frame | **Restricted / personal-use free tier** |
| `public/media/kids-bow.jpg` | 1280×720 | 38,705 | Mixkit 48140 frame | **Restricted / personal-use free tier** |
| `public/media/kids-motion.jpg` | 1280×720 | 17,087 | Mixkit 48139 frame | Worst compression; **Restricted** |
| `public/logo.png` | 300×282 | 86,457 | Official UBBA logo | Keep |
| Hero MP4 (runtime) | Mixkit CDN 1080p | ~3.7 MB listed on asset page | Mixkit Free License (49706) | Hotlinked; karate studio clip |
| `hero.mp4` / `hero.webm` | — | — | Not committed | Production targets documented only |

---

## 4. Slot inventory

Priority legend: **P0** launch-blocking visual / license risk · **P1** high conversion / homepage · **P2** interior completeness · **P3** supporting / legal / social.

Stock acceptability:

- **OK (temporary marketing)** — may use licensed stock if clearly not presented as UBBA people/locations.
- **AUTHENTIC REQUIRED** — mark `OWNER PHOTO REQUIRED — DO NOT SUBSTITUTE WITH MISLEADING STOCK`.
- **NO IMAGE / TEXT ONLY** — intentionally avoid stock portraits.

### 4.1 Homepage hero

| Field | Value |
| --- | --- |
| Slot ID | `heroVideo` / `heroPoster` |
| Priority | **P0** |
| Route | `/` |
| Component | `src/pages/home/HeroSection.tsx` → `HeroMedia` |
| Registry | `HERO_MEDIA` / `IMAGES.heroVideo` / `IMAGES.heroPoster` |
| Current asset | CDN MP4 Mixkit 49706 + `/media/hero-poster.jpg` |
| Type | video/mp4 + JPEG poster |
| Dimensions | 1920×1080 (poster); video 1920×1080 on CDN |
| Quality problems | Hotlink; karate not Taekwondo; black studio (cold, non-family); soft poster; no WebM; not local-branded |
| Desired subject | Kids + teens + instructor energy in a bright dojang; pad work / forms; warm family academy feel |
| Desired emotion | Energetic, disciplined, welcoming, premium |
| Orientation | Landscape 16:9 primary; vertical social cutdown secondary |
| Min resolution | Poster ≥ 1920×1080; video ≥ 1280×720 (prefer 1080p), ≤ ~3 MB encoded |
| Text overlay | Heavy left/bottom dark gradient; faces must stay out of left third on desktop; mobile center-safe |
| Desktop crop | 16:9 full-bleed, subject mid-right or center-right |
| Mobile crop | Poster-only ≤720px width; keep faces/action in center 60% |
| Stock acceptable? | OK temporary if commercially licensed + not mislabeled as UBBA — **prefer authentic footage** |
| Authentic required? | Strongly preferred for launch hero |

### 4.2 Open Graph / social share image

| Field | Value |
| --- | --- |
| Slot ID | `ogDefault` |
| Priority | **P1** |
| Route | All routes via `Seo` (`DEFAULT_OG_IMAGE_PATH`) |
| Component | `src/components/Seo.tsx` / `src/data/seo.ts` |
| Current | `/media/hero-poster.jpg` |
| Type | JPEG |
| Dimensions | 1920×1080 (works); ideal share crop 1200×630 |
| Quality problems | Same soft karate poster; weak brand signal when shared |
| Desired subject | Branded still: logo lockup optional + dojang class energy |
| Desired emotion | Trust + energy |
| Orientation | 1.91:1 share crop |
| Min resolution | ≥ 1200×630 |
| Text overlay | Optional — OG often no on-image text |
| Stock acceptable? | OK temporary |
| Authentic required? | Prefer authentic |

### 4.3 Program card / detail images (shared registry keys)

These five still keys power homepage program discovery, children/adult listings, and every `PROGRAM_DETAILS` page via `ProgramCard` / `ProgramDetail`.

#### `kidsKicks` → Tiny Tigers

| Field | Value |
| --- | --- |
| Slot ID | `kidsKicks` |
| Priority | **P0** (license + quality) |
| Routes | `/`, `/programs/children`, `/programs/tiny-tigers` |
| Components | `ProgramCard`, `ProgramDetail` |
| Current | `/media/kids-stance.jpg` (Mixkit 48141 frame) |
| Type | JPEG |
| Dimensions | 1280×720 |
| Quality problems | Restricted license free tier; soft; single child studio/hall look; reused for camp-related copy elsewhere in registry history |
| Desired subject | Ages 3–5 playful stance/kick with instructor warmth |
| Desired emotion | Joyful, safe, cute-not-infantile |
| Orientation | Landscape 16:9; vertical alt for mobile cards helpful |
| Min resolution | ≥ 1600×900 (export 1280×720 + 640w) |
| Text overlay | Card scrim bottom; keep faces in upper 60% |
| Desktop / mobile crop | Wide class or pad kick; mobile center face + belt |
| Stock acceptable? | OK temporary if commercial license clear |
| Authentic required? | Prefer authentic UBBA Tiny Tigers |

#### `kidsGroup` → Junior Tigers / Family

| Field | Value |
| --- | --- |
| Slot ID | `kidsGroup` |
| Priority | **P0** |
| Routes | `/`, `/programs/children`, `/programs/junior-tigers`, `/programs/family-programs` |
| Current | `/media/kids-bow.jpg` (Mixkit 48140) |
| Quality problems | Restricted free tier; compression; limited diversity/energy |
| Desired subject | Ages 6–10 group bow, forms line, or pad line |
| Desired emotion | Belonging, discipline, friendship |
| Orientation | Landscape |
| Min resolution | ≥ 1600×900 |
| Text overlay | Card scrim |
| Stock acceptable? | OK temporary |
| Authentic required? | Prefer authentic |

#### `teenSpar` → Teen / Olympic Sparring

| Field | Value |
| --- | --- |
| Slot ID | `teenSpar` |
| Priority | **P0** |
| Routes | `/`, `/programs/children`, `/programs/teen-martial-arts`, `/programs/olympic-sparring` |
| Current | `/media/kids-motion.jpg` (Mixkit 48139) — **17 KB**, worst still |
| Quality problems | Restricted free tier; motion blur/compression; may read as child not teen; not gear-accurate sparring |
| Desired subject | Ages 11–17 training with focus pads or soft gear (not MMA cage) |
| Desired emotion | Strength, resilience, coached intensity |
| Orientation | Landscape |
| Min resolution | ≥ 1600×900 |
| Text overlay | Card scrim; avoid covering faces |
| Stock acceptable? | OK temporary if age-appropriate and not fight-promo |
| Authentic required? | Prefer authentic |

#### `action` → Adult / SWAT

| Field | Value |
| --- | --- |
| Slot ID | `action` |
| Priority | **P1** |
| Routes | `/`, `/programs/adult`, `/programs/adult-program`, `/programs/swat-team` |
| Current | `/media/adult-action.jpg` (Mixkit 49706 frame) |
| Quality problems | Same karate studio clip as hero; low warmth; not adult-class environment |
| Desired subject | Adults pad work / forms in dojang; mixed ages/fitness levels welcome vibe |
| Desired emotion | Capable, welcoming, no-ego fitness |
| Orientation | Landscape |
| Min resolution | ≥ 1920×1080 |
| Text overlay | Card + detail page photo credit area |
| Stock acceptable? | OK temporary |
| Authentic required? | Prefer authentic |

#### `beltTest` → Self Defense / Weapons (also events reuse historically)

| Field | Value |
| --- | --- |
| Slot ID | `beltTest` |
| Priority | **P1** |
| Routes | `/programs/self-defense`, `/programs/weapons-class` |
| Current | **Alias of** `hero-poster.jpg` (wrong subject) |
| Quality problems | Not a belt test, self-defense, or weapons scene; duplicate of hero |
| Desired subject | Self-defense: practical partner drill. Weapons: controlled traditional weapon form (if shown). Prefer separate keys later |
| Desired emotion | Focused, practical, respectful |
| Orientation | Landscape |
| Min resolution | ≥ 1600×900 |
| Stock acceptable? | OK temporary for self-defense; weapons often better authentic |
| Authentic required? | Weapons / belt promotions strongly prefer authentic |

### 4.4 Owner / instructor portrait

| Field | Value |
| --- | --- |
| Slot ID | `instructorPortrait` (registry) + `ownerPlaceholder` (UI) |
| Priority | **P0** authenticity |
| Route | `/` `#owner` |
| Component | `InstructorSection` uses **`Placeholder`**, not `IMAGES.instructorPortrait` |
| Current file | `/media/instructor-portrait.jpg` (Mixkit 49705 karate stand-in) — **orphaned from UI** |
| Type | JPEG vertical 1080×1920 |
| Quality problems | Not Sanghyun Lee; karate studio; misleading if wired without disclosure |
| Desired subject | Real portrait of Sanghyun Lee (and optionally staff) |
| Desired emotion | Approachable authority, warmth |
| Orientation | Portrait 3:4 or 9:16 for sticky column |
| Min resolution | ≥ 1200×1600 |
| Text overlay | Minimal |
| Stock acceptable? | **No** |
| Authentic required? | **AUTHENTIC REQUIRED** — `OWNER PHOTO REQUIRED — DO NOT SUBSTITUTE WITH MISLEADING STOCK` |

### 4.5 Benefits / coaching moment (homepage)

| Field | Value |
| --- | --- |
| Slot ID | `benefitsCoaching` |
| Priority | **P1** |
| Route | `/` |
| Component | `BenefitsSection` → `Placeholder` (“Instructor coaching a young student”) |
| Current | No photo |
| Desired subject | Instructor correcting stance / holding pads for a child |
| Desired emotion | Mentorship, safety, pride |
| Orientation | Portrait/tall preferred (`variant="tall"`) |
| Min resolution | ≥ 1200×1600 |
| Text overlay | None critical |
| Stock acceptable? | OK temporary if not presented as named UBBA staff |
| Authentic required? | Prefer authentic |

### 4.6 Children programs overview hero media

| Field | Value |
| --- | --- |
| Slot ID | `childrenOverview` |
| Priority | **P1** |
| Route | `/programs/children` |
| Component | `ChildrenPrograms` → `Placeholder` (“Kids Taekwondo class”) |
| Current | No photo |
| Desired subject | Wide kids class in dojang |
| Desired emotion | Energy + structure |
| Orientation | Tall/portrait in layout |
| Min resolution | ≥ 1200×1600 |
| Stock acceptable? | OK temporary |
| Authentic required? | Prefer authentic |

### 4.7 Adult programs overview hero media

| Field | Value |
| --- | --- |
| Slot ID | `adultOverview` |
| Priority | **P1** |
| Route | `/programs/adult` |
| Component | `AdultPrograms` → `Placeholder` |
| Current | No photo |
| Desired subject | Adult class pad work / forms |
| Desired emotion | Fitness with purpose |
| Orientation | Tall |
| Min resolution | ≥ 1200×1600 |
| Stock acceptable? | OK temporary |
| Authentic required? | Prefer authentic |

### 4.8 Location pages

| Slot ID | Route | Component | Current | Stock? | Notes |
| --- | --- | --- | --- | --- | --- |
| `locationAllendale` | `/locations/allendale` | `LocationDetail` Placeholder (`imageLabel`) | No photo | **AUTHENTIC REQUIRED** | Exterior + interior of 240 W Crescent Ave |
| `locationMidlandPark` | `/locations/midland-park` | same | No photo | **AUTHENTIC REQUIRED** | 644 Godwin Ave |
| `locationGlenRock` | shown when `SITE.showGlenRock` | cards / contact maps | Map embeds only | **AUTHENTIC REQUIRED** for school photos | 201 Rock Rd Suite 116 — do not invent facility stock |
| `locationMaps` | Contact, LocationCard, LocationDetail | Google Maps iframes | Live map tiles | N/A | Keep; not stock photography |

### 4.9 Just 4 Kids / events

| Slot ID | Route | Component | Current label | Stock? |
| --- | --- | --- | --- | --- |
| `j4kBirthdayTile` | `/just-4-kids` | `MediaFrame` | “Birthday Parties” tile | Prefer authentic; stock OK only as temporary generic party-in-dojang if not labeled as past UBBA event |
| `j4kCampTile` | `/just-4-kids` | `MediaFrame` | “Summer Camp” | Prefer authentic |
| `j4kPnoTile` | `/just-4-kids` | `MediaFrame` | “Parents’ Night Out” | Prefer authentic |
| `eventBirthdayHero` | `/birthday-parties` | `MediaFrame` | “Birthday party photo — coming soon” | Prefer authentic |
| `eventCampHero` | `/summer-camp` | `MediaFrame` | “Summer camp photo — coming soon” | Prefer authentic |
| `eventPnoHero` | `/parents-night-out` | `MediaFrame` | “Parents' Night Out photo — coming soon” | Prefer authentic |

All event slots: landscape or square 4:3/1:1 workable; min ≥ 1600×1200; warm, kid-forward, not frightening; **do not present stock as historical UBBA events**.

### 4.10 Testimonials

| Field | Value |
| --- | --- |
| Slot ID | `testimonialPortraits` |
| Priority | **P2** |
| Route | `/` `#reviews` |
| Component | `TestimonialsSection` — text placeholders only |
| Current | No portraits |
| Rule | **NO stock portraits.** Wait for owner-approved reviews + optional real parent photos with release |

### 4.11 Social / Follow Us

| Slot ID | Route | Current | Stock? |
| --- | --- | --- | --- |
| `socialProfileArt` | `/follow-us`, `/follow-us/:network` | `Placeholder` + placeholder posts | Prefer real IG/FB posts; no fake engagement stock |

### 4.12 Brand / chrome

| Slot ID | Usage | Current | Stock? |
| --- | --- | --- | --- |
| `logo` | Header, Footer, favicon path | `/logo.png` official | Keep — not temporary |
| `favicon` | `index.html` / public | Logo-derived | Keep |
| `cssTextures` | `.dojang` grid, `.belt-bar` | CSS gradients only | Optional subtle texture PNG later — not required |

### 4.13 Background / decorative media

| Slot ID | Notes |
| --- | --- |
| Hero gradient overlays | CSS in `hero.css` — retain; improve poster underlay only |
| Section seams | CSS gradients — no photos |
| Taegeuk / FunSticker | SVG/component illustration — out of photo scope |

---

## 5. Cross-cutting quality problems

| Problem | Impact | Severity |
| --- | --- | --- |
| Kids Mixkit Restricted License free tier | Commercial launch risk if frames remain | **Blocking** |
| Hero karate studio clip | Weak family academy storytelling | High |
| File sizes too small for declared dimensions | Soft, posterized stills | High |
| `beltTest` reuses hero poster | Wrong subject on Self Defense / Weapons | High |
| Owner file is stock + UI uses Placeholder | Trust gap on Meet the Owner | High |
| Location / event / overview Placeholders | Incomplete visual journey | Medium–High |
| CDN hotlink hero | Performance, availability, brand control | High |
| No responsive srcset production assets | Mobile downloads desktop-weight when upgraded | Medium |
| Duplicate key reuse across dissimilar programs | Visual monotony | Medium |

---

## 6. Crop & overlay standards (for Agent 3)

| Context | Aspect | Safe text zone | Face priority |
| --- | --- | --- | --- |
| Homepage hero desktop | 16:9 | Left ~40% for type | Keep faces mid/right |
| Homepage hero mobile (poster) | 9:16 or center crop of 16:9 | Center band | Face in middle 50% |
| Program cards | 16:9 | Bottom 35% scrim | Faces above scrim |
| Program detail hero | ~16:9 or 3:2 | Bottom credit OK | Full body preferred |
| Owner column | 3:4 | Minimal | Headroom + eyes upper third |
| OG share | 1200×630 | Optional brand bar | Avoid tiny faces |

Minimum export ladder (recommended): **640w / 960w / 1280w / 1920w** WebP + JPEG fallback; hero video H.264 + WebM per `PERFORMANCE.md`.

---

## 7. Authenticity matrix (quick reference)

| Subject | Stock OK as temporary atmosphere? | Present as UBBA fact? |
| --- | --- | --- |
| Generic kids class | Yes (licensed) | No |
| Named owner Sanghyun Lee | **No** | Must be real photo |
| Allendale / Midland Park / Glen Rock interiors | **No** | Must be real |
| Location exteriors | **No** | Must be real |
| Testimonials faces | **No** | Only with approval + release |
| Birthday / camp / PNO past events | Avoid | Only authentic |
| Hero loop | Yes temporary | Prefer authentic academy footage |

---

## 8. Recommended replacement priority (Agent 3)

1. **Remove or re-license Restricted Mixkit kids frames** (`kids-*`) — immediate.
2. **Replace hero video + poster** with commercially clear, family dojang footage (or strong still fallback) and **self-host**.
3. **Split `beltTest`** into distinct self-defense (+ optional weapons) assets.
4. **Wire owner portrait only after authentic file arrives**; delete/ignore Mixkit stand-in.
5. Fill P1 Placeholders (benefits, children/adult overviews) with approved stock or authentic.
6. Leave locations/events as labeled placeholders until authentic shoot — do not fake facilities/events.
7. Produce dedicated OG 1200×630 from final hero still + logo.

---

## 9. Libraries investigated (research log)

| # | Library | Type | Used for candidates? |
| --- | --- | --- | --- |
| 1 | Mixkit | Free/Restricted video | Current + candidates |
| 2 | Pexels | Free photo/video | Primary free candidates |
| 3 | Unsplash / Unsplash+ | Free + paid | Free vs Plus carefully separated |
| 4 | Pixabay | Free photo/video | Secondary free |
| 5 | Coverr | Free video | Video alternatives |
| 6 | Adobe Stock | Premium | Premium shortlist |
| 7 | Shutterstock / iStock / Getty | Premium | Premium shortlist |
| 8 | Storyblocks | Premium subscription video | Premium shortlist |
| 9 | Envato Elements | Premium | Pad-work / kids training |
| 10 | Wikimedia Commons | CC0 / CC BY* | Authentic-feeling documentary stills |
| 11 | Hippopx | Public-domain redistributor | Extra free stills (verify each page) |
| 12 | Pond5 / Motion Array / Artgrid | Premium | Referenced for future paid search |

**Not in the prompt’s starter list (independent research):** Wikimedia Commons, Hippopx, Envato Elements asset pages, Coverr karate/martial-art collections, Storyblocks martial-arts search.

Research date for license checks: **2026-07-18**. Licenses can change — re-verify on download day.

---

## 10. What Agent 2 did / did not do

| Done | Not done (by design) |
| --- | --- |
| Full slot inventory | Downloading production binaries into `public/media` |
| Candidate URLs + scoring in `MEDIA_CANDIDATES.md` | Broad CSS/page redesign |
| Authentic shoot list | Committing paid previews |
| Flagged current license mismatch | Updating `IMAGE_SOURCES.md` for unintegrated media |

`IMAGE_SOURCES.md` should be updated by Agent 3 when assets are actually selected and self-hosted.
