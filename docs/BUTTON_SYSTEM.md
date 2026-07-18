# UBBA Button System

Interaction design for buttons, CTAs, and editorial links. Built for conversion clarity with Awwwards-level polish — not experimental navigation.

**Branch / agent:** Agent 4 — Button and Microinteraction Specialist  
**Primary stylesheet:** `src/styles/buttons.css`  
**Related:** `src/styles/motion.css`, `src/styles/header.css`, `src/styles/chrome.css`, `src/styles/cards-media.css`, `src/styles/hero.css`, `src/styles/tokens.css`

---

## Design principles

1. **One family, few variants** — layered fill wipe + lift + arrow nudge + pressed compression. No per-page one-off animations.
2. **Labels stay readable** — fill uses a same-family shade (or intentional invert on outline) so text never vanishes mid-transition.
3. **Hover is progressive enhancement** — fine pointers get motion; touch gets `:active` feedback. Important info never depends on hover.
4. **Keyboard first** — every control has a visible `:focus-visible` ring; dark surfaces use `--blue-soft`.
5. **Reduced motion** — color/fill state changes remain; lift, wipe duration, and arrow travel are removed.
6. **Free-class CTA stays dominant** — default `.btn` (red) is the primary conversion treatment; blue is secondary accent.

---

## Research summary (adapted, not copied)

| Reference | Lesson adapted | Rejected |
| --- | --- | --- |
| [Christian Garcia — Buttons & links](https://www.awwwards.com/inspiration/buttons-and-links-design-and-interactions-christian-garcia) | Cohesive link + button language; underline growth for text | Texture-heavy / experimental chrome |
| [Boldworld — Button hover microanimation](https://www.awwwards.com/inspiration/button-hover-microanimation-boldworld) | Short, tactile hover that does not delay activation | Long entrance sequences |
| [Propel — Buttons micro interaction](https://www.awwwards.com/inspiration/buttons-micro-interaction) | Shared motion vocabulary across CTAs | Pointer-only discovery |
| Layered / wipe CTA patterns (industry) | Left-to-right fill via `background-size` (text stays above fill) | Liquid blobs, custom cursors, WebGL |
| Athletic / fitness brand CTAs | High-contrast solid pill, arrow as directional cue | Mystery icons, gold luxury tropes |

---

## Variant definitions

| Class | Role | Default look | Hover / active |
| --- | --- | --- | --- |
| `.btn` | **Primary** conversion (free class, submit) | UBBA red, white label | Darker red wipe L→R, lift, red shadow, arrow +4px |
| `.btn--blue` | Secondary / accent CTA | Brand blue, white label | Deeper blue wipe, blue shadow |
| `.btn--gold` | **Legacy alias of blue** | Same as `.btn--blue` | Same as `.btn--blue` |
| `.btn--dark` | Strong tertiary on light pages | Near-black | Graphite wipe |
| `.btn--ghost` | Secondary on dark media / banners | Transparent, light border | Soft white fill wipe, white border |
| `.btn--outline` | Neutral secondary on light pages | White fill, ink text, ink border | Black wipe + white text |
| Dark-surface `.btn--outline` | Outline on hero / dark sections | Transparent, white border | Soft white fill wipe |
| `.btn--lg` | Hero / banner size | Larger padding, min-height 48px | Same family motion |
| `.btn--block` | Full-width (forms, mobile nav) | `width: 100%` | Same family motion |
| `.text-link` | Editorial / card-style text CTA | Underline grows L→R | Arrow nudge |
| `.pcard__cta` | Program card link treatment | Underline + arrow (card hover/focus) | Same |
| `.nav__link` | Header nav | Underline scaleX | Active/focus same |
| Footer links | Chrome text links | Underline scaleX in blue-soft | Color brightens |
| `.hero__media-toggle` | Video pause/play control | Pill control, labeled | Border/bg emphasis, press scale |

### Markup examples

```html
<!-- Primary free-class CTA -->
<a class="btn btn--lg" href="/contact">
  Try a Class for Free <span class="btn__arrow" aria-hidden="true">→</span>
</a>

<!-- Accent / secondary conversion -->
<a class="btn btn--blue" href="/contact">Book a Birthday</a>

<!-- Ghost on dark hero -->
<a class="btn btn--ghost btn--lg" href="/programs/children">Kids Programs</a>

<!-- Outline on light page -->
<a class="btn btn--outline" href="/locations/allendale">Allendale</a>

<!-- Form submit -->
<button type="submit" class="btn btn--lg btn--block" disabled>
  Sending…
</button>
```

---

## Usage guidance

| Surface | Prefer | Avoid |
| --- | --- | --- |
| Homepage hero primary | `.btn` (red) + `--lg` | Blue as the only hero CTA |
| Header CTA | `.btn--blue` | Ghost (low contrast on black bar is fine only as secondary) |
| Final CTA / banners | `.btn--blue` primary + `.btn--ghost` secondary | Competing two reds |
| Forms (lead) | `.btn` block submit (red = free class) | Outline as submit |
| Event inquiry forms | `.btn--blue` block submit | Red if the page CTA is birthday/camp booking |
| Location / program secondaries | `.btn--outline` or `.btn--ghost` on dark | Multiple primaries in one row |
| Program cards | `.pcard__cta` (text link family) | Nested solid buttons inside the card art |
| Owner / instructor CTAs | `.btn--blue` | Misleading stock portrait buttons |

**Hit targets:** default and large buttons use `min-height: 44px` / `48px`. Text links and card CTAs also reserve ~44px height where practical.

---

## State matrix

| State | Visual | Notes |
| --- | --- | --- |
| Rest | Variant fill + border | Wipe at `background-size: 0%` |
| Hover (fine pointer) | Wipe to 100%, lift −2px, optional shadow, arrow +4px | Gated by `@media (hover: hover) and (pointer: fine)` |
| Focus-visible | 3px blue / blue-soft outline, offset 3px | Does not wait for hover |
| Active / pressed | `scale(0.98)`, reduced shadow | Works on touch |
| Disabled / aria-disabled | 55% opacity, no pointer, no wipe | Used while forms send |
| Loading (forms) | Label becomes “Sending…”, control `disabled` | Arrow hidden while sending |
| Reduced motion | Instant fill/color; no lift/arrow travel | See `motion.css` |

Activation is never delayed by animation — transitions run in parallel with navigation/submit.

---

## Motion behavior

Shared tokens in `tokens.css`:

- `--btn-duration: 0.38s` — fill wipe / color
- `--btn-lift-duration: 0.22s` — lift + arrow
- `--ease: cubic-bezier(0.22, 1, 0.36, 1)`

**Technique:** left-origin `background-image` linear gradient with animated `background-size`. This keeps label glyphs above the fill (no `z-index` stacking bugs with bare text nodes).

**Arrow:** `.btn__arrow` translates +4px on hover; decorative only (`aria-hidden="true"` when present).

---

## Accessibility behavior

| Requirement | Implementation |
| --- | --- |
| Visible focus | `:focus-visible` outline on buttons, text links, nav, footer, video toggle |
| Touch independence | Hover motion gated; `:active` always available |
| Reduced motion | `prefers-reduced-motion: reduce` strips transform/transition noise |
| Contrast | Red/blue/dark solids use white labels; outline default is ink on white; dark-surface outline uses white labels |
| Disabled clarity | Opacity + `not-allowed` + `pointer-events: none` |
| Labels | Buttons remain text-labeled; video control keeps accessible name + `aria-pressed` |
| Hit size | ≈44×44 CSS px minimum on interactive pills |

Do **not** add: custom cursors, hover-only essential copy, unlabeled icon buttons, or motion that blocks clicks.

---

## Legacy `.btn--gold` migration

| Item | Status |
| --- | --- |
| Visual meaning | Blue accent (never gold) |
| CSS | `.btn--gold` retained as compatibility alias of `.btn--blue` |
| Markup | All in-repo TSX usages migrated to `.btn--blue` |
| New code | Use `.btn--blue` only |
| External / cached HTML | `.btn--gold` continues to render correctly |

---

## Files touched (Agent 4)

| File | Change |
| --- | --- |
| `src/styles/buttons.css` | Interaction family, variants, text-link, disabled |
| `src/styles/tokens.css` | Shared button timing tokens |
| `src/styles/motion.css` | Reduced-motion coverage for new transitions |
| `src/styles/header.css` | Nav underline uses `scaleX` + focus parity |
| `src/styles/chrome.css` | Footer link underline growth + focus |
| `src/styles/cards-media.css` | Program card CTA underline family |
| `src/styles/hero.css` | Video toggle press/hover polish |
| `src/components/*.tsx`, `src/pages/**/*.tsx` | `btn--gold` → `btn--blue` |
| `docs/BUTTON_SYSTEM.md` | This document |

**Not changed:** route architecture, SEO, forms logic, navigation structure, hero video loading behavior.

---

## Screenshots / recordings

Captured from `pnpm dev` on this branch (desktop 1440×900 unless noted):

| # | File | What it shows |
| --- | --- | --- |
| 1 | `/opt/cursor/artifacts/button-system/01-hero-ctas-rest.png` | Hero red primary + ghost secondaries at rest |
| 2 | `/opt/cursor/artifacts/button-system/02-hero-primary-hover.png` | Primary hover (lift, shadow, wipe, arrow) |
| 2b | `/opt/cursor/artifacts/button-system/02b-primary-hover-closeup.png` | Primary hover close-up |
| 3 | `/opt/cursor/artifacts/button-system/03-header-cta-focus.png` | Header blue CTA `:focus-visible` ring |
| 4 | `/opt/cursor/artifacts/button-system/04-program-card-cta-hover.png` | Program card CTA underline family |
| 5 | `/opt/cursor/artifacts/button-system/05-form-submit-rest.png` | Lead-form red submit |
| 6 | `/opt/cursor/artifacts/button-system/06-form-submit-focus.png` | Lead-form submit focus ring |
| 7 | `/opt/cursor/artifacts/button-system/07-footer-link-hover.png` | Footer underline growth |
| 8 | `/opt/cursor/artifacts/button-system/08-hero-hover-reduced-motion.png` | Hover with `prefers-reduced-motion: reduce` |
| 9 | `/opt/cursor/artifacts/button-system/09-hero-ctas-mobile.png` | Hero CTAs at 390×844 |

---

## QA checklist (buttons)

- [ ] Primary red remains the free-class / lead-form submit treatment
- [ ] Blue accent used for header + many interior CTAs
- [ ] Outline readable on cream pages and on dark heroes
- [ ] Keyboard tab shows focus on every CTA in the first viewport
- [ ] Mobile tap does not require hover to understand the control
- [ ] Reduced-motion: no lift; fill may still change instantly
- [ ] `pnpm lint` / `pnpm test` / `pnpm build` pass
