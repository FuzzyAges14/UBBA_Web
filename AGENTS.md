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
  `IntersectionObserver`, so the `Reveal`/`StatCounter` components fall back to
  their final state immediately in tests — that is expected. `jsdom` also lacks
  `window.scrollTo`/`matchMedia`; those are guarded, do not "fix" them.
- **Design system:** premium brand palette + Sora/Inter typography live in
  `src/index.css`; motion uses `framer-motion` (hero) plus the CSS `Reveal`
  wrapper. Signature motifs are components: `Taegeuk`, `Marquee`, plus the
  `.dojang` grid and `.belt-bar` CSS utilities. Per-route `<title>`/meta is set by
  `src/components/Seo.tsx` from `SEO` in `src/data/site.ts`.
- **Launch-blocking placeholders** are tracked in `docs/` (image sources, owner
  approval, placeholder checklist). Placeholders are intentionally labeled in the
  UI — do not treat placeholder stats/testimonials/photos as real content.
- **Media:** all photos/video are referenced from `IMAGES` in `src/data/site.ts`.
  Photos hotlink free/CC assets (Flickr/Wikimedia); the hero uses a Mixkit CDN
  video with a committed local poster fallback at `public/media/`. These are
  placeholders — see `docs/IMAGE_SOURCES.md` for licenses/attribution.
- **Programs are data-driven:** each program has a `slug` and a `PROGRAM_DETAILS`
  entry rendered by `src/pages/ProgramDetail.tsx` at `/programs/:slug`. The static
  routes `/programs/children` and `/programs/adult` are category overviews and take
  precedence over the dynamic slug route. Add a program by adding to
  `PROGRAM_DETAILS` + the relevant program array — no new page/route needed.
- **Fonts:** the home hero title uses `Ocean Rush` (self-hosted at
  `public/fonts/OceanRush.otf`, `@font-face` in `src/index.css`) — this is a
  personal-use DEMO font, license before commercial launch. Other headings use
  `Teko`/`Anton`; body is `Inter` (Google Fonts, loaded in `index.html`).
