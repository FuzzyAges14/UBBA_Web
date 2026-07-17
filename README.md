# UBBA_Web

Marketing website for **United Black Belt Academy** — confidence-building martial
arts classes for kids, teens, and adults in Allendale &amp; Midland Park, NJ.

Built with [Vite](https://vitejs.dev/), [React](https://react.dev/),
[React Router](https://reactrouter.com/), [Framer Motion](https://www.framer.com/motion/),
and TypeScript. Premium, cinematic Taekwondo brand design with a custom design
system (Sora/Inter type, black/red/gold palette, Taegeuk + dojang-grid motifs).

## Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/) 10+

## Getting started

```bash
pnpm install      # install dependencies
pnpm dev          # start the dev server at http://localhost:5173
```

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server with hot reload |
| `pnpm build` | Type-check and build for production into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint over the project |
| `pnpm test` | Run the Vitest test suite once |
| `pnpm test:watch` | Run Vitest in watch mode |

## Project structure

```
src/
  data/site.ts        # All editable content: programs, locations, testimonials, nav
  components/          # Reusable UI (Header, Footer, LeadForm, LocationCard, ...)
  pages/              # Routed pages (Home, Programs, Just 4 Kids, Contact, ...)
```

### Editing content

Most copy — program names/descriptions, location details and hours, testimonials,
and navigation — lives in [`src/data/site.ts`](src/data/site.ts). Update text there
without touching layout. To show the Glen Rock location, set `SITE.showGlenRock` to
`true`.

### Deliverable docs

Launch-readiness documents live in [`docs/`](docs/):

- [`IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md) — photo replacement + licensing log
- [`OWNER_APPROVAL_CHECKLIST.md`](docs/OWNER_APPROVAL_CHECKLIST.md) — facts to confirm
- [`PLACEHOLDER_CHECKLIST.md`](docs/PLACEHOLDER_CHECKLIST.md) — placeholders to replace

### Notes

- The site is a single-page app (client-side routing). The lead/contact forms are
  currently front-end only (they validate and show a confirmation); wire them to a
  form service or CRM before launch.
- Photos are art-directed placeholders (labeled `PLACEHOLDER` in the UI) — swap the
  `Placeholder` components for real `<img>` assets when available.
- Stats and testimonials are placeholders pending owner confirmation; do not
  present them as verified facts.
