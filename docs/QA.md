# QA Strategy & Manual Checklist

United Black Belt Academy (UBBA) quality gates for the marketing site and lead API.

## Test strategy

| Layer | Tool | Scope |
| --- | --- | --- |
| Unit / component | Vitest + Testing Library | Forms, SEO, Header/nav, route H1/title matrix |
| Accessibility | `jest-axe` via Vitest | Representative public routes (serious structural issues) |
| API | Vitest + Supertest | `/api/leads` validation, honeypot, CORS, payload size, delivery failure |
| End-to-end | Playwright | Homepage → free class, mobile nav → program, locations, event inquiry, keyboard path |

**Priorities:** conversion flows (free-class + event inquiry), routing/navigation, SEO title updates, form failure states. Avoid large page snapshots and live email providers.

## Commands

```bash
pnpm test              # Vitest unit/component/API (once)
pnpm test:watch        # Vitest watch mode
pnpm lint              # ESLint
pnpm build             # Typecheck + production build (required before E2E)
pnpm test:e2e          # Playwright (starts `pnpm preview` on :4173)
pnpm test:e2e:ui       # Playwright UI mode
pnpm test:ci           # lint + unit tests + build (CI default)
```

First-time Playwright browsers:

```bash
pnpm exec playwright install chromium
```

## CI instructions

GitHub Actions workflow: `.github/workflows/ci.yml`

1. Install with `pnpm install --frozen-lockfile`
2. Run `pnpm test:ci` (lint, Vitest, production build)
3. Install Playwright Chromium + OS deps
4. Run `pnpm test:e2e` with `CI=1`

E2E mocks `/api/leads` in the browser — no SMTP/Resend credentials required.

## Coverage added (Agent 7)

- Route matrix: every public page H1 + document title; all `PROGRAM_DETAILS` slugs; 404
- Nav: Programs mega → Tiny Tigers; Contact link; mobile open/close; Escape + focus restore; accordion; skip link
- SEO: title/description updates, no duplicate meta description tags, program fallback
- LeadForm: validation, invalid email, success, API failure, network failure, loading/duplicate submit, keyboard Enter
- EventInquiryForm: birthday/camp/PNO success, empty validation, invalid email, API failure
- Accessibility: axe on major routes; form label associations; single homepage H1
- API HTTP: valid lead, missing fields, invalid email, honeypot, oversized body, CORS allow/deny, email failure, health
- E2E: five critical flows (see `e2e/critical-flows.spec.ts`)

## Known untested / deferred areas

| Area | Why |
| --- | --- |
| Real SMTP/Resend delivery | Intentionally mocked; use manual checklist with staging secrets |
| Visual regression / Lighthouse CI | Deployment-dependent; run manually after publish |
| Safari/iOS WebKit in CI | Chromium + Pixel profile only in automation |
| Color-contrast axe rule | Disabled in jsdom (unreliable); verify in browsers |

Covered after merging with main: `/locations/*` pages, rate-limit `429`, Open Graph/Twitter via `Seo` + `src/components/Seo.test.tsx`, and Agent 3 component a11y in `Accessibility.test.tsx`.

## Manual QA checklist

### Browsers

- [ ] Chrome (latest)
- [ ] Safari (latest macOS / iOS)
- [ ] Firefox (latest)
- [ ] Edge (optional)

### Viewports

- [ ] Desktop 1440×900
- [ ] Desktop 1280×800
- [ ] Tablet 768×1024
- [ ] Mobile 390×844
- [ ] Mobile 360×740

### Devices / OS

- [ ] iOS Safari — hamburger, forms, tel: links, video autoplay policies
- [ ] Android Chrome — same as above

### Network & motion

- [ ] Slow 3G / Fast 3G: hero poster shows; forms remain usable
- [ ] Offline API: free-class form shows reachable error (stop local API)
- [ ] `prefers-reduced-motion: reduce` — hero video stays paused; no jarring loops

### Keyboard-only

- [ ] Skip link appears on first Tab and moves focus to `#main`
- [ ] Primary nav + Programs / Just 4 Kids menus operable
- [ ] Mobile menu: open, Escape closes, focus returns to hamburger
- [ ] Free-class form completable without mouse
- [ ] Focus rings visible on links/buttons/inputs

### Conversion / email

- [ ] Free-class submit with real SMTP or Resend in staging
- [ ] Birthday / Summer Camp / Parents’ Night Out inquiries arrive with correct subject labels
- [ ] Honeypot field remains hidden and empty for humans
- [ ] Notify inboxes match `src/data/contact.ts` / env overrides

### Content / SEO smoke

- [ ] Each major URL has a unique `<title>` and meta description
- [ ] Share preview (when OG tags land) uses placeholder image until owner asset arrives
- [ ] 404 page for unknown URLs
- [ ] Direct load of `/programs/tiny-tigers` and `/contact` works on host (SPA fallback)

## Owner / staging inputs still needed

- Verified phone numbers and hours per location
- Production `CORS_ORIGINS`, mail transport secrets
- Final review of placeholder stats/testimonials/photos before launch
