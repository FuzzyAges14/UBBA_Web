# UBBA Creative Direction V2

**Agent:** 1 — Creative Direction and Awwwards Research  
**Companion:** [`DESIGN_RESEARCH_V2.md`](DESIGN_RESEARCH_V2.md)  
**Audience:** Agents 3–8 (media, buttons, homepage, interior, QA, integration)  
**Constraint:** Elevate art direction without rebuilding working systems (routes, SEO, API, a11y, hero media policy, content model).

---

## 1. Overall concept

**Working title:** *Step Onto the Mat*

United Black Belt Academy should feel like a **premium neighborhood dojang** — cinematic enough to be memorable, disciplined enough to earn parental trust, warm enough for families, and sharp enough for adults who want real training.

The site is not:

- a fight-promotion microsite  
- a generic gym template  
- a kids-party brand that forgot Taekwondo  
- an experimental Awwwards toy  

The site is:

- a local multi-school academy in Bergen County (Allendale, Midland Park, and Glen Rock when enabled)  
- a confidence-building martial-arts education brand  
- a conversion surface for free-class trials and Just 4 Kids events  

**North star sentence:**  
Parents should feel *safe and inspired* in five seconds; adults should feel *respected and energized*; both should know exactly how to book a free class.

---

## 2. Emotional tone

| Tone | How it shows | Guardrail |
| --- | --- | --- |
| Premium | Controlled type, intentional crops, restrained motion | No cheap stock staging |
| Cinematic | Full-bleed hero, editorial media plates, pacing | No scroll hijacking |
| Energetic | Red CTAs, marquee momentum, kick/pad imagery | No aggression / MMA gore energy |
| Disciplined | Grid rhythm, belt progression, clear hierarchy | No cluttered promo stickers in hero |
| Family-friendly | Warm lighting, kids with instructors, clear safety cues | No infantile cartoon takeover on core pages |
| Trustworthy | Real owner/school imagery, readable forms, reviews without fake faces | No misleading stock identity |
| Locally relevant | School names, Bergen County framing, maps as support not hero | Keep Glen Rock copy consistent when enabled |

---

## 3. Brand test (first viewport)

If the nav were removed, a visitor must still know this is **United Black Belt Academy**.

Homepage hero budget (retain and tighten):

1. Brand name as the dominant type signal  
2. One supporting headline / tagline  
3. One short sentence of proof or benefit  
4. One primary CTA group (Free Class dominant; programs secondary)  
5. One dominant full-bleed media plane  

Do **not** add to the first viewport: stats strips, schedules, address blocks, promo chips, event calendars, or floating badges on the video.

---

## 4. Typography hierarchy

### Font roles

| Role | Face | Use | Notes |
| --- | --- | --- | --- |
| Brand hero display | Ocean Rush (or licensed replacement) | Home hero brand title only | DEMO license today — commercialize or replace before launch |
| Display / UI headings | Teko | Section titles, buttons, nav emphasis | Athletic condensed energy |
| Impact / short shouts | Anton | Selective large statements, marquee-adjacent moments | Use sparingly |
| Body / UI | Inter | Paragraphs, forms, FAQ, meta | Keep for readability; do not use as display |

### Hierarchy rules

1. **One display voice per section.** Do not stack Anton + Teko + Ocean Rush in one block.  
2. **Brand outranks slogan.** On branded surfaces, academy name wins.  
3. **Section titles:** Teko, tight tracking, high contrast.  
4. **Leads:** Inter, 1–2 sentences max.  
5. **Eyebrows:** small, uppercase or small-caps via letter-spacing; prefer belt/heritage marks over emoji.  
6. Fix orphan `Sora` reference on owner signature — either load a licensed face or use existing display/body fonts.

### Type scale guidance (implementation targets)

- Hero brand: viewport-fluid, dominant, wraps cleanly on 320px  
- Section H2: large but secondary to hero brand  
- Card titles: readable at mobile without truncation gimmicks  
- Buttons: Teko/semibold, never disappear during hover transitions  

---

## 5. Color hierarchy

### Retain core palette

From `src/styles/tokens.css`:

- `--black` / `--graphite` / `--graphite-2` — structure and dark sections  
- `--red` / `--red-2` / `--red-dark` — primary action / energy  
- `--blue` / `--blue-soft` — secondary accent / trust / belt stage  
- `--white` / `--off-white` — surfaces (dobok/paper feel)  
- `--muted` — body secondary  
- `--kr-red` / `--kr-blue` — heritage accents (currently underused)

### Do not redesign around gold

`.btn--gold` is a **legacy name for the blue treatment**. Keep alias or migrate to `.btn--blue`; do not introduce metallic gold as a brand pillar.

### Color jobs

| Color | Job | Examples |
| --- | --- | --- |
| Red | Primary conversion | Free class, final CTA, critical emphasis |
| Blue | Secondary trust / progression | Header secondary CTA, location emphasis, belt stage |
| Black/graphite | Authority, chrome, dark storytelling | Header, footer, instructor/story bands |
| Off-white | Calm reading surfaces | FAQ, program lists, forms on light |
| KR red/blue | Heritage punctuation | Seams, Taegeuk, icons, numbered marks |

### Usage limits

- Red is for **action**, not decoration floods.  
- Heritage red/blue appear as **pairs or splits**, not random single accents everywhere.  
- Avoid purple/indigo gradients, cream+terracotta clichés, and glow-heavy dark-mode trends called out in frontend rules.

---

## 6. Spacing rhythm

### Retain

- `.container` max width (`--maxw: 1240px`)  
- `.section` / `.section--tight` as base vertical rhythm  
- Responsive `.split` and `.grid` systems  

### Elevate

Introduce a **section density ladder** so not every band feels equally padded:

| Density | Use |
| --- | --- |
| Hero / full-bleed | Edge-to-edge media, minimal internal chrome |
| Editorial | Asymmetric padding, sticky media, longer reading measure |
| Utility | Tighter FAQ, stats, form clusters |
| Closing CTA | Generous but not identical red card every time |

### Rhythm rules

1. Alternate light / dark / media-led sections — avoid three identical off-white card grids in a row.  
2. Prefer one generous whitespace pause after dense program grids.  
3. Keep mobile vertical spacing disciplined; large desktop padding should compress intelligently, not merely stack huge gaps.

---

## 7. Grid logic

### Compositional vocabulary (homepage + interiors)

Use these as a **menu**, not a mandate that every page uses all of them:

1. **Full-bleed media plane** — hero, select event openers  
2. **Editorial split** — sticky media + narrative (instructor model)  
3. **Program rail** — existing `.rail` / `.pcard` for discovery  
4. **Numbered progression** — Belt Journey as path, not four equal boxes only  
5. **Proof cluster** — testimonials as pull-quote + supporting quotes (no stock faces)  
6. **Local chapter cards** — locations with photo identity + practical facts  
7. **Utility accordion** — FAQ stays narrow and calm  
8. **Conversion dock** — trial form / final CTA  

### Anti-patterns

- Every section centered  
- Every section card-based  
- Equal-height everything  
- Identical eyebrow/title/lead skeleton  
- Horizontal scroll for essential content  

### Cards policy

- Cards are for **interactive choices** (programs, locations, events).  
- No cards in the hero.  
- If removing border/shadow/radius does not hurt understanding, prefer flatter editorial presentation.

---

## 8. Media cropping rules

### Principles

1. **Faces and eyes** protected on mobile crops.  
2. **Technique readability** — kicks/pads/belts should not be clipped into abstraction.  
3. **Text-over-media** only with controlled scrims; never place small muted text on busy mats.  
4. **One focal subject** per frame for hero/poster; group energy for program rails.  
5. **Consistent color grade** across the site (warm-neutral, dojang lighting — not mixed Instagram filters).

### Orientation guidance

| Slot | Preferred | Notes |
| --- | --- | --- |
| Home hero / poster | Landscape cinematic + mobile-safe center weight | Poster must work alone under reduced motion |
| Program cards | 4:3 or 3:2 with top-weighted subject | Avoid random reuse of the same frame |
| Instructor / owner | Portrait, authentic only | `OWNER PHOTO REQUIRED` — no stock stand-in as Sanghyun Lee |
| Locations | Exterior/interior authentic | Maps support; photos identify the school |
| Events / J4K | Warm activity crops | Martial-arts party cues, not generic balloons-only |
| Testimonials | No stock portraits | Typography/pull-quote treatment if no consent photo |

### Stock vs authentic

| Content | Stock OK? | Rule |
| --- | --- | --- |
| Atmospheric training energy | Temporary OK if licensed + labeled honestly | Never claim “our students” |
| Owner / instructors | No | Owner-supplied |
| School buildings / interiors | No | Owner-supplied |
| Testimonials | No faces unless real | Prefer quote-only |
| OG / social share | Prefer authentic | Avoid misleading classroom claims |

---

## 9. Video treatment

### Preserve (non-negotiable)

- Poster-first rendering  
- WebM + MP4 support  
- Conditional loading (`heroMediaPolicy`)  
- Muted, loop, `playsInline`  
- Accessible pause/play control  
- Reduced-motion → no autoplay video  

### Elevate

- Higher-quality, family-safe Taekwondo footage (self-hosted in production)  
- Poster that matches final grade and crop  
- Overlay scrim tuned for Ocean Rush/Teko readability on mobile  
- No third-party CDN dependency for production hero  

### Motion around video

- Avoid decorative parallax that fights the footage  
- Keep scroll cue subtle; hide under reduced motion (already done)

---

## 10. Button families

### Hierarchy

| Priority | Visual | Typical label | Variant direction |
| --- | --- | --- | --- |
| P1 Primary | Red solid | Free Class / Book Trial | Default `.btn` — most distinctive microinteraction |
| P2 Secondary | Blue solid | Locations / key secondary | Current `.btn--gold` behavior → document as blue |
| P3 Tertiary | Ghost / outline | Program browse, alternate | Context-aware outline (already inverted on dark) |
| P4 Dark | Black solid | On light utility surfaces | `.btn--dark` |
| P5 Text link | Underline growth | Inline / footer / nav | Not pill-shaped |

### Interaction family (for Agent 4)

Implement a **small reusable set**, not unique animations per button:

1. **Fill wipe / layered background** on P1 (and optionally P2)  
2. **Arrow translate** (existing) + optional 2px label shift  
3. **Pressed compression** (`scale(0.98)`) retained  
4. **Focus-visible ring** always obvious  
5. **Text-link underline growth** for non-button links  

### Requirements

- Labels readable throughout transitions  
- ~44×44 CSS px targets where practical  
- No hover-only meaning  
- Reduced-motion → instant state change, no travel animations  
- Disabled/loading remain understandable  
- Free-class CTA remains the visual boss  
- Do not restructure navigation to showcase buttons  

### Legacy `.btn--gold`

Either:

- Keep as compatibility alias mapped to blue, documented clearly, **or**  
- Migrate all usages to `.btn--blue` / `.btn--accent` and leave `.btn--gold` as deprecated alias  

Do not invent a gold color because of the class name.

---

## 11. Border treatment

- Prefer **sharp confidence** over soft everywhere: keep radius tokens, but avoid making every surface a floating marshmallow card.  
- Use **1px hairlines** (`--line` / `--line-dark`) for editorial separation.  
- Heritage moments: thin **red/blue split borders** (SectionSeam family) instead of thick decorative frames.  
- Buttons: preserve clear border states for ghost/outline; avoid neon outlines.

---

## 12. Texture treatment

### Motif hierarchy

1. **Taegeuk (abstract)** — section anchors, footer watermark, rare CTA punctuation  
2. **Dojang grid** — dark storytelling sections; keep fade variants  
3. **Belt bar / stripe** — header accent, journey, form progress  
4. **Motion lines** — activate sparingly for energy breaks (currently underused)  
5. **Just 4 Kids stickers** — event sub-brand only; martial-arts object language  

### Texture rules

- Textures support photography; they do not replace it.  
- Never tile loud patterns behind small body copy.  
- Prefer opacity-controlled overlays over heavy noise/grain.

---

## 13. Icon treatment

- Retire emoji as a primary icon system (location pin, audience glyphs, stars as chrome).  
- Replace with a **small custom set**: location mark, age groups, belt knot, calendar/event, phone, arrow.  
- Style: simple line or two-tone red/blue, consistent stroke, no mystery-meat icons.  
- Stars for reviews: graphic, not emoji; ensure contrast.

---

## 14. Motion philosophy

**Presence over spectacle.**

Ship **2–3 intentional motion languages** sitewide:

1. **Entrance reveals** — existing `.reveal` / framer hero fades (short, opacity+translate)  
2. **CTA microinteractions** — fill/arrow/press family  
3. **Ambient brand motion** — marquee + subtle Taegeuk/spin only where it already earns its place  

### Timing

- Microinteractions: ~150–300ms  
- Section reveals: ~400–700ms max  
- No route-blocking transitions  
- No long intro sequences  

### Reduced motion

Existing `motion.css` behavior is a baseline to preserve and extend whenever new motion is added.

---

## 15. Mobile adaptation

### Priorities

1. Brand + Free Class CTA remain obvious without opening the menu.  
2. Preserve mobile drawer a11y and Mobile CTA bar — refine visuals, don’t remove.  
3. Hero type and scrim must pass readability on 320–412 widths.  
4. Program cards stack cleanly; avoid orphan awkwardness (existing `:has()` logic is good).  
5. Forms stay single-column, large controls, visible errors.  
6. Maps don’t crush content — photo/identity first when authentic media exists.  
7. Just 4 Kids stays fun without oversized sticker collisions on small screens.

### Breakpoint mindset

Design for:

- 320 / 360 / 390 / 412 phone  
- 768 tablet  
- 1024+ desktop  

Landscape phones: keep header compact; avoid mega-menu traps.

---

## 16. Accessibility guardrails

Non-negotiable for all visual work:

1. Preserve skip link, focus order, mega-menu keyboard behavior, drawer focus restore.  
2. Contrast: text and buttons meet WCAG AA; recent contrast fixes stay.  
3. Text over images/video always has adequate scrim.  
4. `prefers-reduced-motion` honored for every new animation.  
5. Form labels, errors, success states remain explicit.  
6. Hero video control remains labeled and operable.  
7. Do not convey essential info by hover or color alone.  
8. Decorative motifs: `aria-hidden` / empty alt as appropriate.

---

## 17. Homepage art direction brief (Agent 5)

### Desired pacing storyboard

1. **Hero** — brand + free class + program forks; cinematic media  
2. **Marquee** — values momentum (upgrade separators to heritage marks)  
3. **Program discovery** — interactive cards OK; specific CTAs  
4. **Benefits** — editorial dojang story; better media; less pill redundancy  
5. **Proof band** — either real stats or a non-KPI trust module; avoid fake SaaS metrics  
6. **Trial** — conversion dock; parent-safe headline  
7. **Instructor** — sticky editorial portrait (authentic)  
8. **Belt Journey** — signature progression set piece  
9. **Audience** — differentiate visually from program cards  
10. **Testimonials** — pull quote led; no stock faces  
11. **Locations** — local chapters  
12. **FAQ** — calm utility  
13. **Final CTA** — mat invitation, not identical red cookie every time  

### Conversion clarity checklist

Visitor must still immediately answer:

- What is offered?  
- Who is it for?  
- Where are the schools?  
- How do I try a free class?  
- Where are kids vs adult programs?

---

## 18. Interior page families (Agent 6)

| Family | Pages | Shared logic | Distinct character |
| --- | --- | --- | --- |
| Program category | Children, Adult | PageHero + discovery grid + story | Kids: warmth/character; Adult: discipline/athleticism |
| Program detail | `/programs/:slug` | Data-driven detail + related | Motif/color cue by audience, not new templates per slug |
| Event / campaign | Birthday, Camp, PNO, J4K hub | Offer → proof → details → form | J4K playful layer; still academy-credible |
| Location | Allendale, Midland Park (+ Glen Rock when shown) | Local SEO structure | School photo identity + map support |
| Conversion | Contact, trial embeds | Forms + reassurance | Practical, high clarity |
| Legal | Privacy, Terms | Quiet typography | Visual consistency only |

Do not clone the homepage. Match its **quality**, not its exact composition.

---

## 19. Motif & heritage application map

| Surface | Motif |
| --- | --- |
| Header | Belt bar (retain); optional split underline on active nav |
| Hero | Dojang fade + scrim; no floating badges |
| Benefits / dark stories | Dojang + Taegeuk |
| Belt Journey | Belt path / numbered ranks |
| Forms | Step markers as belt segments (subtle) |
| Footer | Taegeuk watermark + dojang fade (retain, refine) |
| Seams | Red/blue SectionSeam family |
| J4K | Stickers mapped to martial objects |

---

## 20. Copy/tone guidance (layout-adjacent only)

Visual agents should not rewrite SEO strategy. Where headlines are layout-adjacent:

- Prefer **confidence / discipline / family / local** over generic fitness slogans.  
- Keep Glen Rock mentions synchronized with `SITE.showGlenRock`.  
- Never caption stock as real UBBA students, instructors, or facilities.

---

## 21. Success criteria for the visual upgrade

The redesign succeeds when:

1. The site feels art-directed rather than template-assembled.  
2. Korean red/blue heritage is intentional, not decorative spam.  
3. Buttons feel tactile and premium without confusing parents.  
4. Homepage sections vary in composition while conversion stays obvious.  
5. Interior pages feel equal in quality to the homepage.  
6. Media is sharper, warmer, martial-arts accurate, and honestly labeled.  
7. Owner/school authenticity slots are either real or clearly marked required.  
8. Accessibility, SEO, routes, forms, and hero controls remain intact.  
9. Lint, tests, and build continue to pass.

---

## 22. Explicit non-goals

- No new route architecture  
- No experimental navigation  
- No gold rebrand  
- No WebGL spectacle  
- No wholesale CSS rewrite that discards modular files  
- No weakening tests to chase aesthetics  
- No hotlinked production media  
- No stock faces on testimonials or owner slots  

---

## 23. Deliverable status

| Doc | Purpose |
| --- | --- |
| `docs/DESIGN_RESEARCH_V2.md` | Audit + reference research |
| `docs/CREATIVE_DIRECTION_V2.md` | This visual system for implementation agents |

Implementation begins only after these documents are reviewed (Phase 1 complete).
