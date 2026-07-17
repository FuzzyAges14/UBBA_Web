# AGENTS.md

## Cursor Cloud specific instructions

UBBA_Web is a single-page website built with Vite + React + TypeScript. There is
one service: the Vite dev server. Standard commands live in `README.md` and
`package.json` scripts; refer to those rather than duplicating them.

- **Run the app (dev):** `pnpm dev` serves at `http://localhost:5173` with hot
  module reload. The server is configured with `host: true`, so it also binds to
  the VM's network interface.
- **Lint / test / build:** `pnpm lint`, `pnpm test` (Vitest, runs once and exits),
  `pnpm build` (runs `tsc -b` then `vite build`).
- **Package manager:** use `pnpm` (a `pnpm-lock.yaml` is committed). `esbuild` is
  listed under `pnpm.onlyBuiltDependencies` in `package.json` so its postinstall
  build step runs non-interactively; do not remove it or `pnpm install` will skip
  building esbuild and the dev server/build will fail.
- **Tests use jsdom**, configured inline in `vite.config.ts` (`test` block) with
  `src/test/setup.ts` importing `@testing-library/jest-dom`. There is no separate
  `vitest.config.ts`.

- **App structure:** client-side routing via `react-router-dom` (`BrowserRouter`
  in `src/main.tsx`, routes in `src/App.tsx`). Editable site content is centralized
  in `src/data/site.ts` — prefer changing copy/programs/locations there rather than
  in JSX. Components that render tests-visible text (e.g. `Placeholder`) duplicate
  labels, so use `getAllByText` in tests when a term appears in both a heading and a
  placeholder.
- **Forms are front-end only** (`src/components/LeadForm.tsx`): they validate and
  show a success state but do not POST anywhere yet. `jsdom` has no
  `IntersectionObserver`, so the `Reveal` animation component falls back to visible
  immediately in tests — that is expected.
