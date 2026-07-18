# UBBA_Web

Marketing website for **United Black Belt Academy** — confidence-building martial
arts classes for kids, teens, and adults in Allendale &amp; Midland Park, NJ.

Built with [Vite](https://vitejs.dev/), [React](https://react.dev/),
[React Router](https://reactrouter.com/), [Framer Motion](https://www.framer.com/motion/),
and TypeScript. Premium, cinematic Taekwondo brand design with a custom design
system (Ocean Rush hero title, Teko/Anton headings, Inter body; black/red/gold
palette; Taegeuk + dojang-grid motifs).

> **New here?** Jump to [Launching your website](#-launching-your-website) to put
> the site online, or [Making quick text changes](#-making-quick-text-changes) to
> edit wording, hours, or phone numbers — no coding experience needed.

## Prerequisites

- Node.js 22+
- [pnpm](https://pnpm.io/) 10+

## Getting started

```bash
pnpm install      # install dependencies
pnpm dev:all      # website (:5173) + API for free-class emails (:3001)
```

For the frontend only: `pnpm dev`. For the API only: `pnpm dev:api`.

Free-class form submissions are emailed by the small Node API — see
[`docs/BACKEND.md`](docs/BACKEND.md). Edit recipient emails and Instagram /
Facebook profile links in [`src/data/contact.ts`](src/data/contact.ts).

## 🚀 Launching your website

The site is a static website (plain HTML/CSS/JS after building), so it can be
hosted almost anywhere. There are two steps: **build**, then **publish**.

### 1. Build the site

```bash
pnpm install     # first time only
pnpm build       # creates a ready-to-publish "dist/" folder
```

This produces a `dist/` folder containing everything the website needs.

Want to preview exactly what visitors will see before publishing?

```bash
pnpm preview     # serves the built site locally so you can check it
```

### 2. Publish it (pick ONE option)

**Option A — Netlify (easiest, drag & drop):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `dist/` folder onto the page.
3. It gives you a live URL. Done.

**Option B — Netlify or Vercel connected to GitHub (auto-publishes on every change):**
1. Create a free account at [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. "Add new site" → import this GitHub repo.
3. Use these settings when asked:
   - **Build command:** `pnpm build`
   - **Publish/output directory:** `dist`
4. After that, every time changes are merged into `main`, the live site updates
   automatically.

**Option C — any other web host:** upload the contents of the `dist/` folder to
your host's public web directory.

### ⚠️ One important setting for hosting

This site uses multiple pages handled in the browser (e.g. `/contact`,
`/programs/tiny-tigers`). Most hosts need a small "redirect everything to
`index.html`" rule so those pages load correctly when someone visits them directly
or refreshes:

- **Netlify:** add a file named `public/_redirects` containing:
  `/*    /index.html   200`
- **Vercel:** it usually handles this automatically for Vite/React apps.
- **Other hosts:** enable "SPA fallback" / "rewrite all routes to index.html".

Without this, the home page works but refreshing a sub-page may show a "404 Not
Found". (Ask me and I can add the redirect file for whichever host you choose.)

### Custom domain (e.g. unitedbba.com)

Netlify and Vercel both let you connect a custom domain for free in their
dashboard under **Domain settings** — just follow their step-by-step prompts.

### Before a real public launch

Check the [`docs/`](docs/) checklists — a few things still use placeholders:
- Replace placeholder photos and the personal-use **Ocean Rush** font with
  licensed versions.
- Add Glen Rock's real class hours.
- Set mail delivery in `.env` (Resend or SMTP) so free-class requests reach the
  inbox listed in `src/data/contact.ts` — see [`docs/BACKEND.md`](docs/BACKEND.md).
- Confirm testimonials, stats, and owner details with the owner.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite dev server with hot reload |
| `pnpm dev:api` | Start the free-class email API on port 3001 |
| `pnpm dev:all` | Run website + API together |
| `pnpm start:api` | Run the API (same as `dev:api`; use in production) |
| `pnpm build` | Type-check and build for production into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint over the project |
| `pnpm test` | Run the Vitest test suite once |
| `pnpm test:watch` | Run Vitest in watch mode |

## Project structure

```
src/
  data/contact.ts     # Easy edits: notify emails + Instagram / Facebook profile URLs
  data/site.ts        # All other editable content: programs, locations, testimonials, nav
  components/         # Reusable UI (Header, Footer, LeadForm, LocationCard, ...)
  pages/              # Routed pages (Home, Programs, Just 4 Kids, Contact, ...)
server/               # Free-class request API (emails staff a detailed message)
```

## ✍️ Making quick text changes

Almost all wording lives in **two easy-edit files**:
[`src/data/site.ts`](src/data/site.ts) (programs, locations, copy) and
[`src/data/contact.ts`](src/data/contact.ts) (notify emails + Instagram / Facebook).
Edit the text between the quotes without touching any layout or design. After
saving, the site updates instantly while `pnpm dev` is running.

**How to make an edit:**

1. Open `src/data/site.ts`.
2. Find the text you want to change (it's grouped by section — see below).
3. Change only the words **inside the quotes** (`'...'` or `"..."`). Don't remove
   the quotes, commas, or brackets.
4. Save the file.

**Where common things live in `src/data/site.ts`:**

| I want to change... | Look for |
| --- | --- |
| Who gets free-class request emails | [`src/data/contact.ts`](src/data/contact.ts) → `CONTACT.notifyEmails` |
| Instagram / Facebook profile links | [`src/data/contact.ts`](src/data/contact.ts) → `SOCIAL_PROFILES` |
| Phone number, address, or hours | `LOCATIONS` (Allendale / Midland Park) and `GLEN_ROCK` |
| Whether Glen Rock shows on the site | `SITE.showGlenRock` — set to `true` (show) or `false` (hide) |
| Program names & descriptions | `HOME_PROGRAM_CARDS`, `CHILDREN_PROGRAMS`, `ADULT_PROGRAMS`, `PROGRAM_DETAILS` |
| Owner bio / quote | `OWNER` |
| Reviews / testimonials | `TESTIMONIALS` |
| The "Try A Class For Free!" button text | `SITE.primaryCta` |
| Page titles for Google (SEO) | `SEO` |
| Menu links | `NAV`, `FOOTER_LINKS`, `MEGA_MENU` |

**Tip:** change one thing at a time and check the site in your browser. If
something looks broken after an edit, you probably removed a quote, comma, or
bracket by accident — undo your last change (Ctrl/Cmd + Z) and try again.

Photos are intentional placeholders (labeled `PLACEHOLDER` on screen). To use real
photos later, see [`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md).

### Deliverable docs

Launch-readiness documents live in [`docs/`](docs/):

- [`IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md) — photo replacement + licensing log
- [`OWNER_APPROVAL_CHECKLIST.md`](docs/OWNER_APPROVAL_CHECKLIST.md) — facts to confirm
- [`PLACEHOLDER_CHECKLIST.md`](docs/PLACEHOLDER_CHECKLIST.md) — placeholders to replace
- [`BACKEND.md`](docs/BACKEND.md) — free-class emails, social links, API setup

### Notes

- The site is a single-page app (client-side routing). Free-class forms `POST` to
  `/api/leads`; run `pnpm dev:all` locally and configure mail in `.env` for real delivery.
- Photos are art-directed placeholders (labeled `PLACEHOLDER` in the UI) — swap the
  `Placeholder` components for real `<img>` assets when available.
- Stats and testimonials are placeholders pending owner confirmation; do not
  present them as verified facts.
