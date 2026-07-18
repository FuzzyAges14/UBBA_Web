# Agent 7 — Testing & QA Deliverables

## 1. Test strategy

See [`docs/QA.md`](QA.md). Critical conversion paths (free-class + event inquiry), routing/SEO titles, navigation keyboard behavior, and API abuse cases are automated. Visual polish and live email delivery remain manual.

This branch is rebased onto current `main` (Agents 1–6 landed) so QA coverage uses the integrated SEO, location pages, hardened API, and accessibility APIs.

## 2. Coverage added

| Area | Files |
| --- | --- |
| Routes / H1 / titles | `src/routes.test.tsx`, `src/App.test.tsx` |
| SEO metadata (canonical/OG/Twitter) | `src/components/Seo.test.tsx` (from main + kept) |
| Header / mobile nav / skip link | `src/components/Header.test.tsx`, `Accessibility.test.tsx` |
| Lead + event forms | `src/components/LeadForm.test.tsx`, `EventInquiryForm.test.tsx` |
| Accessibility (axe) | `src/accessibility.test.tsx`, `src/test/axe.ts`, `Accessibility.test.tsx` |
| API HTTP | `server/app.test.ts` (rate limit, CORS, headers from Agent 5) |
| E2E | `e2e/critical-flows.spec.ts`, `playwright.config.ts` |
| CI | `.github/workflows/ci.yml` |
| Manual checklist | `docs/QA.md` |

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

- Real SMTP/Resend delivery (mocked in automation)
- Safari/WebKit in CI; Lighthouse CI
- Color-contrast axe rule (disabled under jsdom)

## 6. Final test results (rebased branch)

| Command | Result |
| --- | --- |
| `pnpm lint` | Pass |
| `pnpm test` | Pass (full suite on current main) |
| `pnpm build` | Pass |
| `pnpm test:e2e` | Pass |
