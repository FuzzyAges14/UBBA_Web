# Agent 7 — Testing & QA Deliverables

## 1. Test strategy

See [`docs/QA.md`](QA.md). Critical conversion paths (free-class + event inquiry), routing/SEO titles, navigation keyboard behavior, and API abuse cases are automated. Visual polish and live email delivery remain manual.

## 2. Coverage added

| Area | Files |
| --- | --- |
| Routes / H1 / titles | `src/routes.test.tsx`, `src/App.test.tsx` |
| SEO metadata | `src/components/Seo.test.tsx` |
| Header / mobile nav / skip link | `src/components/Header.test.tsx` |
| Lead + event forms | `src/components/LeadForm.test.tsx`, `EventInquiryForm.test.tsx` |
| Accessibility (axe) | `src/accessibility.test.tsx`, `src/test/axe.ts` |
| API HTTP | `server/app.test.ts` (+ extras in `server/leads.test.ts`) |
| E2E | `e2e/critical-flows.spec.ts`, `playwright.config.ts` |
| CI | `.github/workflows/ci.yml` |
| Manual checklist | `docs/QA.md` |

### Minimal production changes for testability
- Skip link + `#main` focus target (`Layout.tsx`, `index.css`)
- Mobile menu Escape + focus restore (`Header.tsx`)
- FAQ `aria-controls` / `aria-labelledby` (`Faq.tsx`)

## 3. Commands

```bash
pnpm test          # Vitest
pnpm test:ci       # lint + Vitest + build
pnpm build && pnpm test:e2e
pnpm exec playwright install chromium   # first time
```

## 4. Manual QA checklist

Full browser/device/network/keyboard checklist: [`docs/QA.md`](QA.md#manual-qa-checklist).

## 5. Known untested areas

- Rate limiting (pending Agent 5) — `it.todo` in `server/app.test.ts`
- Dedicated `/locations/*` pages (not in app yet)
- Full Open Graph / Twitter tag matrix (pending Agent 1)
- Real SMTP/Resend delivery; Safari/WebKit CI; Lighthouse CI
- Heading-order axe rule disabled pending content/structure cleanup

## 6. Final test results (this branch)

| Command | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm test` | **94 passed**, 1 todo |
| `pnpm build` | Pass |
| `pnpm test:e2e` | **10 passed**, 2 skipped (project-scoped) |
