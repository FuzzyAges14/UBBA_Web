# Visual QA Report — Agent 7 (Responsive / Accessibility / Visual)

**Date:** 2026-07-18  
**Baseline:** `origin/main` @ `0d8116f` (contrast fix #26)  
**QA branch:** `cursor/visual-a11y-qa-26db`  
**Environment:** Chromium (Playwright) + Google Chrome headless on Linux CI VM  
**Scope note:** Sibling redesign agents (creative direction, media research, buttons, homepage, interior, integration) were still open as PRs during this pass. This report validates the **current integrated main baseline** plus defects fixed on the QA branch. Redesign PRs were inspected for shared-file risk; a full post-merge re-QA remains required after Agent 8 squash-merges.

Screenshots: `/opt/cursor/artifacts/visual-qa/` (also produced under `test-results/visual-qa/` by `e2e/visual-responsive-qa.spec.ts`).

---

## 1. Executive summary

| Area | Status |
| --- | --- |
| Required viewports (home + priority routes) | Pass after overflow fixes |
| Keyboard / skip link / mobile Escape focus | Pass |
| Desktop Programs mega Escape focus restore | Pass (fixed) |
| Reduced motion | Pass |
| Forms validation + success | Pass |
| Hero pause/play (when video loads) | Pass |
| Horizontal overflow ≤360px and 1024px | Pass after CSS fixes (was Fail) |
| Contrast (manual sample) | Mostly pass; residual notes below |
| Production media hotlink | Open issue (Mixkit CDN hero MP4) — owned by media pipeline |
| Lighthouse | Not run (no claim) |

**Commands run**

| Command | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm test` | Pass (129) |
| `pnpm build` | Pass |
| `pnpm test:e2e` | Pass (115 + 7 skipped) |

---

## 2. Defects

### Fixed on this branch

| ID | Severity | Blocking? | Route | Viewport | Issue | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| VQA-01 | High | Yes | `/` (Benefits / Owner / Trial) | 320–360, 1024 | Horizontal document overflow (`scrollWidth` 369 / 1096). Caused by (a) `.ph--tall` `aspect-ratio` + `min-height` forcing ~341px width, (b) grid `min-width:auto`, (c) lead-form inputs expanding mid-width split columns. | `min-width:0` on `.split > *` / `.owner > *`; `width/max-width:100%` + `height:auto` on stacked tall placeholders; form `min-width:0` + stack `.split .form-grid` ≤1100px |
| VQA-02 | Medium | Yes (a11y) | Global header | Desktop | Programs / Just 4 Kids mega Escape closed menus but did **not** restore focus to the trigger (comment claimed it did). | Refs + `queueMicrotask` focus restore in `Header.tsx`; unit + E2E coverage |
| VQA-03 | Medium | No* | Just 4 Kids heroes | All | Breadcrumb ink at `rgba(20,20,26,0.55)` failed AA on light playful backgrounds. | Raised to `0.72` in `just4kids.css` |
| VQA-04 | Low | No | `/` hero | Desktop | `.hero__scroll` at `rgba(255,255,255,0.55)` was hard to read over video (decorative / `aria-hidden`). | Raised to `0.78` |

\*Contrast failures are launch-quality blockers for body/UI text; breadcrumbs are secondary navigation but were corrected.

### Open / not fixed (out of Agent 7 redesign scope or needs owner media)

| ID | Severity | Blocking? | Route | Viewport | Issue | Recommended fix | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| VQA-05 | High | Launch | `/` | Desktop (≥721px, motion allowed) | **Resolved in integration (Agent 3):** hero is self-hosted `/media/hero.webm` + `/media/hero.mp4` with local poster variants. No Mixkit CDN hotlink remains. | Keep poster-first + conditional load; replace with authentic UBBA footage before launch | Done |
| VQA-06 | Medium | Soft | `/` mobile | 320–390 short heights | Sticky `.mobile-cta` covers lower hero body copy until scroll (H1 remains visible). | Tighten hero copy length on ≤390 or add bottom padding inside hero content equal to CTA height | Homepage / chrome |
| VQA-07 | Medium | Soft | Global mobile | ≤1120 | Sticky Call always dials Allendale (`2019622922`) even for Midland Park intent | Location-aware tel or Locations-first flow | Product |
| VQA-08 | Medium | Soft | `/follow-us` | All | Placeholder social links (`href: '#'`) | Wire real URLs or disable until ready | Content |
| VQA-09 | Low | No | Forms | Keyboard | `.field *:focus { outline: none }` relies solely on red border + soft glow | Keep ring; optionally add `:focus-visible` outline matching global token for Windows high-contrast | Buttons / forms |
| VQA-10 | Low | No | Programs mega | Desktop ~1120–1280 | `.mega__meta { white-space: nowrap }` can crowd meta labels | Allow wrap below 1280 | Header |
| VQA-11 | Info | No | Multiple | All | Stock / placeholder photography and Ocean Rush DEMO font still present | Authentic shoot + font license | Owner / media |

### Reproduction examples

**VQA-01 (before fix)**  
1. Open `/` at 320×568.  
2. Evaluate `document.documentElement.scrollWidth` → `369`.  
3. Same at 1024×768 → `1096` from Trial `LeadForm` in `.container.split`.

**VQA-02 (before fix)**  
1. Desktop 1440×900, open Programs mega.  
2. Press Escape → menu closes; focus not returned to Programs button.

---

## 3. Interaction QA results

| Interaction | Result | Notes |
| --- | --- | --- |
| Skip link | Pass | First Tab focuses skip link; Enter moves to `#main` |
| Desktop header | Pass | Primary nav + header CTA visible ≥1121px |
| Mobile menu open/close | Pass | Dialog semantics, inert when closed |
| Escape + focus restore (mobile) | Pass | Returns to hamburger |
| Escape + focus restore (Programs mega) | Pass | Fixed this branch |
| Dropdowns / accordions | Pass | Programs + Just 4 Kids mobile accordions |
| Hero pause/play | Pass | Visible when video policy allows; toggles `aria-pressed` |
| Forms errors | Pass | Alert summary + field messages |
| Forms success | Pass | Mocked `/api/leads` |
| Disabled / loading submit | Pass (unit) | Covered in `LeadForm.test.tsx` |
| Card / program links | Pass | Priority routes load H1 |
| Button focus-visible | Pass | Outline or box-shadow ring present |
| Reduced motion | Pass | Scroll cue hidden; CTAs remain |
| Touch / sticky CTA vs H1 | Pass | Contact H1 not overlapped |
| Direct route loading | Pass | All priority routes |
| Content zoom 200% / 400% | Pass | Home CTA + contact fields reachable |

---

## 4. Visual checks

| Check | Result | Notes |
| --- | --- | --- |
| Text contrast (body / CTAs) | Pass (sampled) | Recent #26 contrast work holds on black/off-white |
| Text over hero media | Pass with caveats | Scrim + text-shadow; location badge uses `--blue-soft` — monitor over bright frames |
| Button contrast | Pass | Red / blue solids with white labels |
| Focus visibility | Pass | Global `:focus-visible`; form custom ring |
| Cropping / faces | Partial | Placeholder frames only; authentic media N/A |
| Mobile hero readability | Pass | Brand + H1 + primary CTA clear; lead may sit under sticky bar (VQA-06) |
| Section spacing | Pass | Baseline; homepage redesign PR will change rhythm |
| Long headings | Pass | Clamp + wrap OK after overflow fix |
| Form wrapping | Pass | After VQA-01 form fix |
| Footer layout | Pass | Decorative Taegeuk clipped via `overflow:hidden` |
| Nav wrapping | Pass | Switches to hamburger ≤1120 |
| Landscape mobile | Spot-checked via 1024×768 | Pass after form fix |
| Missing media fallback | Pass | Poster path works if CDN blocked |

---

## 5. Browser matrix

| Browser | Availability | Result |
| --- | --- | --- |
| Chromium (Playwright) | Yes | Full automated matrix |
| Google Chrome | Yes (VM) | Used for preview + screenshots |
| Firefox | Not installed in this environment | Deferred |
| Safari / iOS Safari | Not available | Deferred |
| Edge | Not installed | Deferred (Chromium-equivalent expected) |
| Android Chrome | Emulated via Pixel 7 Playwright project | Pass |

---

## 6. Performance / media observations

| Metric | Observation |
| --- | --- |
| Largest local hero still | `hero-poster.jpg` ≈ 33 KB |
| Largest local photo | `instructor-portrait.jpg` ≈ 42 KB |
| Initial homepage media requests (desktop, networkidle) | 6 local images + **1 third-party Mixkit MP4** |
| Unexpected third-party | Mixkit CDN video (VQA-05) |
| Layout shift | Width/height present on logo + registry dims; placeholders use aspect rules — no new CLS introduced by QA fixes |
| Failed formats | No committed WebM/MP4 locally; poster-only if CDN fails |
| Oversized images | Local stills are small (temporary stock); quality/resolution upgrade still pending media agents |
| Duplicate downloads | None observed in sample |
| Lighthouse | **Not run** — do not cite a score |

See `docs/PERFORMANCE.md` and `docs/IMAGE_SOURCES.md` for architecture; update those when Agent 3 lands self-hosted hero files.

---

## 7. Shared files modified (integration risk)

This QA branch touches files also edited by open redesign PRs:

| File | Also touched by |
| --- | --- |
| `src/styles/hero.css` | Homepage art direction (#29) |
| `src/styles/sections.css` | Homepage (#29), buttons (#31), interior (#30) |
| `src/styles/cards-media.css` | Interior (#30) |
| `src/styles/just4kids.css` | Interior (#30) |
| `src/components/Header.tsx` | Buttons (#31) may touch CTA classes only |

**Integration guidance:** Do not take “ours/theirs” wholesale. Re-apply:

1. `.hero__scroll` contrast (`0.78`)  
2. `.j4k-hero .breadcrumbs` contrast (`0.72`)  
3. `.split > *` / `.owner > *` `min-width: 0`  
4. Tall placeholder `width/max-width:100%; height:auto`  
5. Lead form `min-width:0` + `.split .form-grid` 1-col ≤1100px  
6. Mega Escape focus restore in `Header.tsx`

---

## 8. Automation added

- `e2e/visual-responsive-qa.spec.ts` — viewport screenshots, overflow asserts, keyboard/mega/mobile/reduced-motion/zoom/form/media request capture  
- `Accessibility.test.tsx` — Programs mega Escape focus restore  

Run:

```bash
pnpm build && pnpm test:e2e
```

---

## 9. Residual risk for Agent 8

1. Merge order must preserve VQA overflow + focus fixes when landing homepage/buttons/interior CSS.  
2. Re-run `pnpm test:e2e` (including visual-responsive suite) on the integration branch after each major visual merge.  
3. Media pipeline must eliminate Mixkit hotlink before launch.  
4. Manual Safari/iOS pass still required on a Mac / device.  
5. Color-contrast axe remains disabled under jsdom — keep manual/browser checks.
