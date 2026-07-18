# Responsive Test Matrix — Agent 7

**Baseline:** Redesigned `origin/main` (homepage #29, interior #30, buttons #31) + QA fixes on `cursor/visual-a11y-qa-26db` (rebased)  
**Harness:** `e2e/visual-responsive-qa.spec.ts` (Chromium + mobile-chrome / Pixel 7)  
**Artifacts:** `/opt/cursor/artifacts/visual-qa/` and `test-results/visual-qa/`  
**Post-rebase smoke:** Overflow ALL_OK across `/`, children/adult programs, J4K, birthday, Allendale, contact @ 320–1440.

Legend: **P** = Pass · **F** = Fail · **S** = Soft pass / caveat · **N/A** = not applicable · **—** = not separately captured

---

## 1. Required viewports — homepage first screen

| Viewport | Overflow | H1 visible | Primary CTA | Sticky CTA | Screenshot | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 320×568 | P | P | P | P (present) | `home-320x568.png` | Hero lead may sit under sticky bar (VQA-06) |
| 360×800 | P | P | P | P | `home-360x800.png` | Overflow fixed (was F) |
| 390×844 | P | P | P | P | `home-390x844.png` | |
| 412×915 | P | P | P | P | `home-412x915.png` | |
| 768×1024 | P | P | P | P | `home-768x1024.png` | Still hamburger (≤1120) |
| 1024×768 | P | P | P | P | `home-1024x768.png` | Overflow fixed (form split; was F) |
| 1280×800 | P | P | P | N/A (desktop nav) | `home-1280x800.png` | |
| 1440×900 | P | P | P | N/A | `home-1440x900.png` | Hero video control visible when CDN allows |
| 1920×1080 | P | P | P | N/A | `home-1920x1080.png` | |

---

## 2. Priority routes × sample viewports

Routes: home, programs/children, programs/adult, tiny-tigers, just-4-kids, birthday, summer-camp, PNO, Allendale, Midland Park, contact.

| Route | 390×844 | 768×1024 | 1440×900 | Notes |
| --- | --- | --- | --- | --- |
| `/` | P | P | P | See viewport table |
| `/programs/children` | P | P | P | |
| `/programs/adult` | P | P | P | |
| `/programs/tiny-tigers` | P | P | P | |
| `/just-4-kids` | P | P | P | Breadcrumb contrast fixed |
| `/just-4-kids/birthday-parties` | P | P | P | Event form present |
| `/just-4-kids/summer-camp` | P | P | P | |
| `/just-4-kids/parents-night-out` | P | P | P | |
| `/locations/allendale` | P | P | P | |
| `/locations/midland-park` | P | P | P | Pending details copy remains |
| `/contact` | P | P | P | Validation + success screenshots |

Additional routes smoke-checked via existing `src/routes.test.tsx` (H1/title) and critical-flow E2E: Follow Us, Privacy, Terms, remaining program slugs, 404.

---

## 3. Content zoom

| Zoom | Viewport | Route | Result | Screenshot |
| --- | --- | --- | --- | --- |
| 200% | 1280×800 | `/` | P | `home-zoom-200-1280.png` |
| 400% | 1280×800 | `/contact` | P | `contact-zoom-400-1280.png` |

---

## 4. Interaction matrix

| Interaction | 390×844 | 1440×900 | Result | Screenshot / evidence |
| --- | --- | --- | --- | --- |
| Skip link focus | N/A | P | P | `skip-link-focus.png` |
| Mobile menu open | P | N/A | P | `mobile-nav-open.png` |
| Mobile Escape → focus restore | P | N/A | P | E2E |
| Programs mega open | N/A | P | P | `programs-mega-open-1440.png` |
| Programs Escape → focus restore | N/A | P | P | E2E + unit |
| Hero pause/play | N/A | P* | P* | `hero-video-toggled-1440.png` (*when Mixkit loads) |
| Reduced motion | — | P | P | `home-reduced-motion.png` |
| CTA focus-visible | — | P | P | `cta-focus-visible-1440.png` |
| Contact validation | P | — | P | `contact-validation-390.png` |
| Contact success | P | — | P | `contact-success-390.png` |
| Sticky CTA vs contact H1 | P @320/390/768 | N/A | P | E2E |

---

## 5. Breakpoint behavior cheat-sheet

| Breakpoint | Behavior under test |
| --- | --- |
| ≤560px | Form grid → 1 column (global) |
| ≤720px | Extra container inset; hero title clamps |
| ≤960px | `.split` stacks; tall placeholders use 4:3 |
| ≤1100px | Owner stacks; **split forms force 1-col grid** (QA fix) |
| ≤1120px | Hamburger + drawer + sticky mobile CTA |
| ≥1121px | Desktop primary nav + mega menus |

---

## 6. Pre-fix failures retained for history

| Viewport | Before | After |
| --- | --- | --- |
| 320×568 home | `scrollWidth=369` Fail | Pass |
| 360×800 home | `scrollWidth=369` Fail | Pass |
| 1024×768 home | `scrollWidth=1096` Fail (Trial form) | Pass |

---

## 7. How to re-run

```bash
pnpm build
pnpm test:e2e
# Screenshots land in test-results/visual-qa/
```

After merging homepage / interior / button / media branches, re-run this matrix on the integration branch before launch sign-off.
