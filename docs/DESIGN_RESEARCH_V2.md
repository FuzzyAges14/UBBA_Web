# UBBA Design Research V2

**Agent:** 1 — Creative Direction and Awwwards Research  
**Branch base:** `origin/main` @ `0d8116f` (contrast corrections)  
**Scope:** Research and art-direction audit only. No production styling or media replacement in this branch.  
**Date:** 2026-07-18

---

## 1. Baseline verification

Before research, the current `origin/main` was inspected. The following systems remain present and must be preserved by later agents:

| System | Status | Location |
| --- | --- | --- |
| Decomposed homepage | Present | `src/pages/home/*`, `src/pages/Home.tsx` |
| Lazy-loaded routes | Present | `src/App.tsx` |
| Modular CSS | Present | `src/index.css` → `src/styles/*.css` |
| Route SEO | Present | `src/components/Seo.tsx`, `src/data/seo.ts` |
| Allendale / Midland Park pages | Present | `src/pages/LocationDetail.tsx`, `src/data/site.ts` |
| Reduced motion | Present | `src/styles/motion.css`, `usePrefersReducedMotion` |
| Hero pause / conditional video | Present | `HeroMedia.tsx`, `heroMediaPolicy.ts` |
| Centralized media registry | Present | `IMAGES`, `HERO_MEDIA`, `IMAGE_DIMENSIONS` in `site.ts` |
| Responsive program cards | Present | `ProgramCard.tsx`, `cards-media.css` |
| `.btn--gold` (blue treatment) | Present | `buttons.css` |
| Motifs | Present | `Taegeuk`, `Marquee`, `.dojang`, `.belt-bar` |

**Asset caveat for later agents:** `docs/IMAGE_SOURCES.md` and `site.ts` reference self-hosted files under `public/media/` and `public/fonts/`. In this checkout, those binaries are largely absent (only `public/media/README.md` is present). Architecture is intact; media pipeline work remains required.

---

## 2. Existing-site audit

### 2.1 What is already strong (retain)

1. **Cinematic hero architecture** — full-bleed media, poster-first, pause control, conditional loading, reduced-motion fallback. Brand name is hero-level (`Ocean Rush` + red/blue accent split).
2. **Conversion clarity** — Free-class CTA, children’s vs adult paths, locations, contact, events, and Just 4 Kids remain discoverable from header and homepage.
3. **Accessibility foundations** — keyboard mega menus, focus restoration, escape handling, inert drawer, form labels, contrast recent fixes.
4. **Motif seeds** — abstract `Taegeuk`, dojang grid, header belt bar, red-blue `SectionSeam`. These are the most distinctive brand assets and should be elevated, not replaced.
5. **Data-driven content model** — programs, locations, SEO, and media keys are centralized. Visual upgrades should extend these systems.
6. **Instructor sticky editorial block** — one of the few compositions that already feels magazine-like rather than card-template.
7. **Belt Journey concept** — white → blue → red → black is the strongest narrative device on the site; composition underdelivers relative to concept.
8. **Just 4 Kids sub-brand** — warm gradients, stickers, and energy differentiate events without requiring a second product. Needs cohesion with academy credibility, not more childishness.

### 2.2 Weaknesses by area

#### Header / navigation

- Desktop nav is dense and utilitarian; mega menus are strong functionally but visually plain.
- Header CTA uses `.btn--gold` (blue). Naming vs appearance creates handoff confusion.
- Location pin emoji and star glyphs undercut the otherwise premium martial-arts system.
- Glen Rock visibility can disagree between header count, hero badge, footer, and CTA copy.

#### Homepage hero

- Three large CTAs compete; primary hierarchy is readable but not decisive.
- Location badge hardcodes Allendale & Midland Park while `getVisibleLocations()` may include Glen Rock.
- Hero meta row and emoji treatments feel template-generic.
- Media quality and authenticity are temporary Mixkit frames; cinematic intent exceeds asset quality.

#### Program discovery / audience

- Both sections reuse `.pcard` language → visual déjà vu.
- Card CTAs often repeat “Learn How It Works.”
- Age/program imagery is a small reused pool; crops feel stock-generic.

#### Benefits / stats / trial

- Benefits correctly uses dojang + Taegeuk, but placeholder media breaks trust.
- Value pills largely echo the marquee → redundancy.
- Stats read as SaaS KPI cards, not dojang proof.
- Trial headline skews generic fitness (“crush your goals”) rather than family martial-arts confidence.

#### Instructor / testimonials / locations

- Owner portrait and credentials are placeholders — highest trust risk on the site.
- Testimonials are labeled placeholders; never attach stock faces.
- Location maps dominate; school identity photography is missing.
- Location titles sometimes ignore Glen Rock when enabled.

#### FAQ / final CTA

- FAQ is a generic centered accordion.
- Final CTA banner is reused across many pages with identical red-card energy.

#### Interior pages

Repeated family across Children, Adult, Program Detail, Location Detail, Birthday, Camp, PNO:

`PageHero → SectionSeam → grid/split → FAQ → CtaBanner`

This creates sameness. Information architecture is clear; art direction is not page-specific enough.

#### Just 4 Kids / events

- Strong energy, but drifts toward generic kids-party language.
- MediaFrames are placeholders; event proof is absent.
- Stickers/emojis need martial-arts specificity (belt tie, bow, board break) rather than party defaults.

#### Buttons / links

- Current family: default red, `.btn--gold` (blue), dark, ghost, outline, large, block.
- Interaction is limited to lift + arrow nudge + shadow. Functional, not memorable.
- Pill radius is universal; no layered fill, wipe, border draw, or pressed language beyond scale.
- Focus/contrast work exists; microinteraction polish does not.

#### Motifs / texture / heritage

- `--kr-red` / `--kr-blue` exist in tokens but are underused versus `--red` / `--blue`.
- `.motion-lines` appears unused.
- Taegeuk mostly limited to Benefits + Footer watermark.
- Emoji icons compete with the custom motif system.

#### Media

- Temporary Mixkit stills; owner/location authenticity slots require owner photography.
- Hotlinked hero video remains temporary per `IMAGE_SOURCES.md`.
- Small image pool reused across many cards → visual fatigue.
- Cropping is not yet intentionally art-directed for desktop vs mobile faces/techniques.

### 2.3 Generic / generated-feeling patterns to break

| Pattern | Where it shows | Direction |
| --- | --- | --- |
| Equal card grids everywhere | Programs, audience, events, related programs | Mix editorial splits, numbered lists, full-bleed media, rail variety |
| Eyebrow → title → lead → cards | Most sections | Vary lead length, alignment, and media/text ratio |
| Dark split + placeholder | Benefits, program stories, events | Replace placeholders; vary left/right rhythm and caption overlays |
| Red rounded CTA banner | Nearly every page end | Keep conversion, vary composition (mat path, belt stripe, asymmetric CTA) |
| Emoji as icon system | Hero, audience, mobile cues | Replace with custom line icons / belt / taegeuk marks |
| SaaS stats strip | Homepage stats | Make dojang-coded proof, or demote until real numbers exist |

### 2.4 Korean red-and-blue heritage opportunities

Use heritage **intentionally and sparingly**, never as wallpaper:

1. **Belt progression** as structural motif (header, journey, form steps, section numbers).
2. **Taegeuk** as abstract red/blue balance mark at section anchors and key CTAs — not a literal flag stamp.
3. **SectionSeam** expanded into a family of dividers (thin split line, belt stripe, mat edge).
4. **Color roles:** red = energy / trial CTA; blue = trust / secondary / locations; black = mastery / chrome; off-white = dobok / paper.
5. **Promote `--kr-red` / `--kr-blue`** for heritage accents while keeping conversion red (`--red`) for primary CTAs if contrast/testing prefers it — document the relationship rather than inventing gold.

---

## 3. Research method

Starting points reviewed:

- https://www.awwwards.com/
- https://www.awwwards.com/inspiration/buttons-and-links-design-and-interactions-christian-garcia
- https://www.awwwards.com/websites/navigation/
- https://www.awwwards.com/awwwards/collections/menu/
- https://www.awwwards.com/creative-ui-design-examples-for-great-ux.html

Additional independent research covered sports/fitness nominees, martial-arts gym sites, editorial photography portfolios, accessible interaction systems, and conversion-focused academy UX writing (Avori Media, Clicks Geek, Market Muscles / Colorlib martial-arts roundups). Patterns were selected for **translation into UBBA’s existing systems**, not cloning.

**Deliberately rejected categories from Awwwards culture:** scroll hijacking, mystery navigation, custom cursors that replace browser feedback, WebGL spectacle, horizontal-scroll essentials, long loaders, hover-only content.

---

## 4. Reference set (14)

Category coverage (a reference may satisfy multiple):

| Category | References |
| --- | --- |
| Strong buttons / links (≥4) | R01, R02, R03, R04, R05 |
| Sports / fitness / movement (≥3) | R06, R07, R08, R09 |
| Editorial layout (≥2) | R10, R11 |
| Strong mobile adaptation (≥2) | R01, R06, R10, R12 |
| Restrained motion (≥2) | R01, R03, R13 |
| High-quality image / video (≥3) | R06, R07, R12, R14 |

---

### R01 — Christian Garcia

- **URL:** https://www.awwwards.com/sites/christian-garcia  
- **Component:** Buttons/links interactions; accessibility; responsive system  
  (element: https://www.awwwards.com/inspiration/buttons-and-links-design-and-interactions-christian-garcia)  
- **Lesson:** Premium interaction design can coexist with accessibility-first UI; button/link states feel designed without hiding meaning.  
- **Do not copy:** Neon accent palette (`#BFFF07`), experimental portfolio tone, or any interaction that depends on pointer-only discovery.  
- **UBBA translation:** Layered hover fills, clear focus rings, and link underline growth that never obscure labels; keep free-class CTA dominant.  
- **Mobile:** Touch targets remain large; hover becomes press/focus.  
- **A11y:** Honor `prefers-reduced-motion`; never rely on color alone for state.

### R02 — Hoboken Yogi (button hover circle)

- **URL:** https://www.awwwards.com/sites/hoboken-yogi  
- **Component:** Circle-reveal button hover  
  (https://www.awwwards.com/inspiration/hoboken-yogi-button-hover-animation)  
- **Lesson:** A single distinctive CTA microinteraction can define brand tactility for a local wellness/service business.  
- **Do not copy:** Exact circle wipe timing, yoga brand voice, or making every button use the same flourish.  
- **UBBA translation:** One primary “trial” treatment with a restrained red fill wipe or mat-edge reveal; secondary buttons stay quieter.  
- **Mobile:** Instant pressed fill instead of hover circle travel.  
- **A11y:** Label always readable through the wipe; reduced-motion = static color change.

### R03 — Thinkingbox (button hover)

- **URL:** https://www.awwwards.com/inspiration/thinkingbox-button-hover-animation  
- **Component:** Footer / CTA button hover  
- **Lesson:** Clean border + fill choreography can feel expensive without 3D or glow excess.  
- **Do not copy:** Portfolio WebGL hover systems from related Thinkingbox interactions.  
- **UBBA translation:** Outline → filled secondary buttons; arrow translation already in UBBA can be paired with a directional background slide.  
- **Mobile:** Focus/active parity.  
- **A11y:** Keep contrast on both resting and hover fills (especially white text on blue/red).

### R04 — Handsome (hover button interaction)

- **URL:** https://www.awwwards.com/inspiration/handsome-hover-button-interaction  
- **Component:** Hover button interaction  
- **Lesson:** Text displacement + icon motion communicates “go” without changing the layout.  
- **Do not copy:** Custom cursor dependency.  
- **UBBA translation:** Extend existing `.btn__arrow` nudge with subtle label shift (2–3px) and pressed compression already partially present.  
- **Mobile:** No hover-required content.  
- **A11y:** Motion ≤ ~200–300ms; disable transforms under reduced motion.

### R05 — Boost (UI button hover gradient)

- **URL:** https://www.awwwards.com/inspiration/ui-button-hover-gradient-boost  
- **Component:** Gradient hover CTA  
- **Lesson:** Gradient motion can signal energy for sports commerce — but only if restrained.  
- **Do not copy:** Shopping-cursor reactivity, loud multicolor gradients, purple/indigo AI-default looks.  
- **UBBA translation:** If used at all, limit to a red→red-dark or red/blue heritage edge on **primary** CTA only; never rainbow.  
- **Mobile:** Prefer solid state change over animated gradients.  
- **A11y:** Gradient must maintain WCAG contrast for label.

### R06 — La Huella Workout Club

- **URL:** https://www.awwwards.com/sites/la-huella-workout-club  
- **Component:** Hero video, club locations, testimonials, design system, contact CTA  
- **Lesson:** Fitness storytelling works when media, culture, and location modules feel like one brand system.  
- **Do not copy:** GSAP-heavy page transitions, experimental 404 as a destination, or navigation that requires exploration.  
- **UBBA translation:** Treat each school as a “club chapter” with photo + hours + CTA; unify photography grade; keep contact CTA persistent.  
- **Mobile:** Compact location cards with call/directions priority over decorative video.  
- **A11y:** Preserve pause control and reduced-motion poster-only hero (already in UBBA).

### R07 — Fenriz Gym

- **URL:** https://www.awwwards.com/sites/fenriz-gym-homepage  
- **Component:** Discipline color gradients, photo cut-out dynamics, unified photo filter  
- **Lesson:** Martial-arts diversity + inclusive culture can be shown with photography language, not fight-poster aggression.  
- **Do not copy:** Fake cut-out gimmicks if they reduce credibility; MMA fight-club tone.  
- **UBBA translation:** Unified color grade across kids/adult/event photos; soft discipline accents via belt colors; open, family-safe framing.  
- **Mobile:** Large crops focused on faces and clear technique, not wide empty mats.  
- **A11y:** Avoid text over busy cut-outs without scrims.

### R08 — Phive Clubs

- **URL:** https://www.awwwards.com/sites/phive-clubs  
- **Component:** Homepage scroll, class timetable interaction, multi-slide header, mobile  
- **Lesson:** Premium gym brands pair bold type with practical class information.  
- **Do not copy:** Floating experimental menus, modal-first class discovery, yellow `#FFE000` system, scroll theater that delays content.  
- **UBBA translation:** Keep schedules/location facts scannable; use type scale for energy; avoid turning program discovery into a modal maze.  
- **Mobile:** Timetable-like clarity for age groups beats animated carousels.  
- **A11y:** Note Awwwards DEV accessibility score was relatively weak (6.2) — do **not** emulate that tradeoff.

### R09 — Lando Norris (sports energy — selective)

- **URL:** https://www.awwwards.com/sites/lando-norris  
- **Component:** Bold sports identity / motion energy (selective study only)  
- **Lesson:** Athletic sites earn memorability through confident type + motion pacing.  
- **Do not copy:** WebGL, gesture playgrounds, celebrity spectacle, or anything that slows parents finding programs.  
- **UBBA translation:** Borrow *confidence* and *pacing*, not the tech stack. Use 2–3 intentional motions sitewide.  
- **Mobile:** Energy must not sacrifice tap clarity.  
- **A11y:** Reject custom gesture requirements.

### R10 — Untold

- **URL:** https://www.awwwards.com/sites/untold-1  
- **Component:** Homepage / mobile homepage / editorial ecosystem storytelling  
- **Lesson:** Editorial minimalism + dynamic storytelling can unify diverse offerings under one brand.  
- **Do not copy:** Gesture-led interactions, complex menu theater, illustration systems that distract from local conversion.  
- **UBBA translation:** Homepage section pacing as chapters (Discover → Why → Proof → Train near you → Try); fewer identical card blocks.  
- **Mobile:** Mobile homepage should keep brand + one CTA + one media idea above the fold.  
- **A11y:** Prefer CSS reveals already in UBBA over gesture-only content.

### R11 — Shed.design / typographic portfolio craft

- **URL:** https://abduzeedo.com/award-winning-web-design-how-sheddesign-earned-awwwards-sotd (coverage of Awwwards SOTD)  
- **Component:** Typography rotation, considered pacing, clip-path/parallax used as gallery pacing  
- **Lesson:** Multiple display roles can stay intentional if each has a job; pacing beats decoration.  
- **Do not copy:** Custom cursor, Lenis-as-identity, or portfolio-only navigation.  
- **UBBA translation:** Keep Teko/Anton/Inter (+ licensed hero face); assign roles tightly; use restrained clip/mask reveals on media, not page chrome.  
- **Mobile:** Reduce type roles; never stack three competing display styles in one viewport.  
- **A11y:** Avoid parallax that causes vestibular issues; respect reduced motion.

### R12 — Ottografie 2025

- **URL:** https://www.awwwards.com/sites/ottografie-2025  
- **Component:** Photo gallery, project headers, mobile photography presentation  
- **Lesson:** High-end photography sites win on crop discipline, negative space, and image hierarchy.  
- **Do not copy:** Unusual navigation patterns or portfolio IA.  
- **UBBA translation:** Treat dojang photography like editorial plates — intentional crops, fewer but better images, consistent grade.  
- **Mobile:** Vertical-friendly crops with faces/technique protected.  
- **A11y:** Meaningful alt text; decorative textures empty alt.

### R13 — Accessible microinteraction practice (implementation pattern set)

- **URL:** https://netcodesign.com/micro-interactions-that-feel-magical-best-practices-code-snippets/ (and CSSShowcase layered button patterns)  
- **Component:** Hover lift + sweep + focus-visible + reduced-motion recipes  
- **Lesson:** Best 2025–2026 button craft is CSS-first, compositor-friendly (`transform`/`opacity`), and reduced-motion aware.  
- **Do not copy:** Novelty effects that obscure text or depend on glow/purple trends.  
- **UBBA translation:** Document a small state matrix for Agent 4; extend `buttons.css` / `motion.css` rather than inventing per-page animations.  
- **Mobile:** `:active` parity; 44×44 targets.  
- **A11y:** Pair `:hover` with `:focus-visible`; never remove outlines.

### R14 — Martial-arts academy conversion UX (category research)

- **URLs:**  
  - https://avorimedia.com/web-design-for-martial-arts-gyms/  
  - https://clicksgeek.com/web-design-for-martial-arts/  
  - https://colorlib.com/wp/martial-arts-website-examples/  
- **Component:** Dual-audience homepage paths, free-trial above the fold, age segmentation, real photos  
- **Lesson:** Parents and adults need separate emotional paths; free trial clarity beats abstract brand poetry.  
- **Do not copy:** Countdown-timer hard-sell templates, dark-and-gold MMA clichés, stock “fight night” aggression.  
- **UBBA translation:** Keep dual paths (Children / Adult) prominent; free-class CTA always primary; replace stock with authentic when possible; never misrepresent stock as UBBA students.  
- **Mobile:** Thumb-first CTAs (UBBA’s mobile CTA bar is aligned — refine visually, don’t remove).  
- **A11y:** Forms stay short and labeled; avoid urgency dark patterns.

---

## 5. Pattern adaptation matrix

| Adapt | Source energy | UBBA application | Reject adjacent risk |
| --- | --- | --- | --- |
| Layered / wipe button fills | R01–R05 | Primary + secondary CTA family | Hover-only info |
| Controlled arrow + text shift | R04 + existing `.btn__arrow` | All labeled buttons | Mystery icon buttons |
| Editorial chapter pacing | R10, R11 | Homepage section rhythm | Scroll hijacking |
| Unified photo grade | R07, R12 | Media pipeline | Fake authenticity |
| Location-as-chapter | R06 | Location cards / detail pages | Map-only identity |
| Dual audience clarity | R14 | Hero + audience + nav | Over-segmentation clutter |
| Restrained entrance reveals | Existing Reveal + R13 | Section entrances ~200–500ms | Long page-entry films |
| Heritage red/blue accents | Fenriz discipline colors + UBBA tokens | Belt, seams, icons | Gold redesign / flag spam |

---

## 6. Patterns prohibited for UBBA (confirming brief)

Do not introduce:

- Hidden or pointer-exploration navigation  
- Scroll hijacking / essential horizontal scroll  
- Custom cursors replacing OS cursors  
- Full-screen menu animations that block common actions  
- Autoplaying audio  
- WebGL / decorative 3D without conversion value  
- Hover-only access to programs, prices, or contact  
- Low-contrast text or buttons  
- Motion that ignores `prefers-reduced-motion`  
- Transitions that delay route changes  
- MMA fight-promotion aesthetics or militaristic imagery  

---

## 7. Handoff notes for later agents

### Agent 2 (Media)

Prioritize authentic owner portrait, school exteriors/interiors, kids class warmth, adult training discipline, event proof. Keep testimonials without stock faces. Document every candidate license at asset-page level.

### Agent 3 (Media pipeline)

Self-host approved assets; preserve `IMAGES` / `HERO_MEDIA` / `IMAGE_DIMENSIONS`; keep hero controls and conditional loading.

### Agent 4 (Buttons)

Create a small interaction family; resolve `.btn--gold` naming via alias or migration; keep free-class red dominant; document in `docs/BUTTON_SYSTEM.md`.

### Agent 5 (Homepage)

Break card-template monotony; preserve conversion order and SEO wording; elevate Belt Journey and Instructor as editorial set pieces.

### Agent 6 (Interior)

Define page families (program / event / location / campaign / legal) with shared logic but distinct media composition; keep Just 4 Kids energetic and academy-credible.

### Agent 7 / 8

Validate contrast, crops, keyboard, reduced motion, and no misleading stock identity claims.

---

## 8. Research completeness checklist

- [x] Audited header, homepage sections, interior pages, forms, footer, mobile, media, buttons, motifs  
- [x] Identified retain / weak / heritage opportunities  
- [x] ≥12 current references documented (14)  
- [x] ≥4 button/link examples  
- [x] ≥3 sports/fitness/movement examples  
- [x] ≥2 editorial examples  
- [x] ≥2 strong mobile adaptations  
- [x] ≥2 restrained-motion examples  
- [x] ≥3 high-quality image/video examples  
- [x] Independent research beyond the five starter Awwwards links  
- [x] No source code or proprietary assets copied  
