# UBBA_Web

Marketing website for **United Black Belt Academy** — confidence-building martial
arts for kids, teens, and adults in **Allendale**, **Midland Park**, and
**Glen Rock**, NJ.

Built with [Vite](https://vitejs.dev/), [React](https://react.dev/),
[React Router](https://reactrouter.com/), [Framer Motion](https://www.framer.com/motion/),
and TypeScript. Premium Taekwondo brand design (Anton impact titles, Teko headings,
Inter body; black / red / gold palette; Taegeuk + dojang-grid motifs).

> **Putting the site online?** Start at [Launching your website](#-launching-your-website).
> **Editing copy?** See [Making quick text changes](#-making-quick-text-changes).
> **What pages exist?** See [Website map — pages & features](#-website-map--pages--features).

---

## Prerequisites

- **Node.js 22+**
- **[pnpm](https://pnpm.io/) 10+** (this repo commits a `pnpm-lock.yaml` — do not switch to npm/yarn)

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

---

## Getting started (local development)

```bash
pnpm install      # once, and again after lockfile changes
pnpm dev          # website at http://localhost:5173 (hot reload)
```

Optional — also start the legacy Express API on port `3001` (Vite proxies `/api`):

```bash
pnpm dev:all
```

**Important:** live marketing signups (free class, birthday, summer camp, Parents'
Night Out) use **NextKick** forms in a lightbox. They do **not** need Gmail, SMTP,
or the Express API. Use `pnpm dev:all` only when testing the optional legacy
`POST /api/leads` endpoint.

```bash
cp .env.example .env   # only if you need mail secrets, Meta tokens, or VITE_SITE_URL
```

---

## 🚀 Launching your website

Follow these steps in order. After `pnpm build`, the site is static files in
`dist/` (HTML/CSS/JS). Signups load NextKick in the browser — you do **not** need
to deploy Gmail or the Node mail API for free-class, birthday, camp, or PNO.

### Step A — Wire NextKick form URLs (required before real signups)

Most visitor signup CTAs use per-school NextKick share links in one file (Parents' Night Out is phone-only):

**[`src/data/contact.ts`](src/data/contact.ts)** → `NEXTKICK_FORMS`

| Form kind | Used on | Location keys |
| --- | --- | --- |
| `trial` | Home, Contact, program & location CTAs (“Try A Class For Free!” / free trial) | `allendale`, `midland-park`, `glen-rock` |
| `birthday` | `/just-4-kids/birthday-parties` | same three schools |
| `summer-camp` | `/just-4-kids/summer-camp` | same three schools |
| *(Parents' Night Out)* | `/just-4-kids/parents-night-out` | **Call to reserve** — no NextKick form |

**How to update a URL:**

1. In NextKick admin, open the form → copy the **student share link**
   (looks like `https://student.nextkick.ai/form/<uuid>`).
2. Paste it into the matching `href` under `NEXTKICK_FORMS` for that kind + school.
3. Save. With `pnpm dev` running, the site hot-reloads.

**Parents' Night Out:** the three school `href`s may still be placeholders until
you paste the real share links. Until then, the portal opens NextKick but will not
collect live PNO submissions for those schools.

Also set Instagram / Facebook in the same file under `SOCIAL_PROFILES`
(`href`, `handle`, then `placeholder: false` when live).

### Step B — Owner content checklist (before a public launch)

| Priority | What | Where |
| --- | --- | --- |
| High | Real NextKick URLs for all four form kinds × three schools | `src/data/contact.ts` → `NEXTKICK_FORMS` |
| High | Location phones, hours, Glen Rock details | `LOCATIONS` / `GLEN_ROCK` in `src/data/site.ts` |
| High | Privacy Policy & Terms copy | `/privacy`, `/terms` |
| Medium | Location exterior photos | still placeholders in places — see [`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md) |
| Medium | Owner-approved testimonials & stats | `TESTIMONIALS`, stats in `site.ts` |
| Medium | Canonical site URL for SEO | `VITE_SITE_URL` in `.env` / host env (see [`docs/SEO.md`](docs/SEO.md)) |
| Low | Optional Meta Graph tokens for live social feeds | `.env` — see [`docs/OWNER_EMAIL_AND_ACCOUNTS_SETUP.md`](docs/OWNER_EMAIL_AND_ACCOUNTS_SETUP.md) |

Also review:

- [`docs/PLACEHOLDER_CHECKLIST.md`](docs/PLACEHOLDER_CHECKLIST.md)
- [`docs/OWNER_APPROVAL_CHECKLIST.md`](docs/OWNER_APPROVAL_CHECKLIST.md)

### Step C — Build the production site

```bash
pnpm install     # first time / after dependency changes
pnpm build       # regenerates sitemap, type-checks, writes dist/
```

Preview locally what visitors will see:

```bash
pnpm preview     # serves the contents of dist/
```

Optional quality gates before publish:

```bash
pnpm lint
pnpm test
pnpm test:ci     # lint + unit tests + production build
```

### Step D — Publish (pick ONE host)

The publish output is the **`dist/`** folder.

#### Option 1 — Netlify (drag & drop, fastest smoke test)

1. Run `pnpm build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the entire `dist/` folder onto the page.
4. Netlify gives you a live URL.

This repo includes [`public/_redirects`](public/_redirects) so SPA routes
(e.g. `/contact`) work on refresh after deploy.

#### Option 2 — Netlify or Vercel connected to GitHub (recommended for ongoing updates)

1. Create an account at [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. **Add new site** → import this GitHub repository.
3. Build settings:

   | Setting | Value |
   | --- | --- |
   | **Build command** | `pnpm build` |
   | **Publish / output directory** | `dist` |
   | **Node version** | 22 (set in host UI or `NODE_VERSION=22`) |

4. Set environment variables in the host dashboard if needed:
   - `VITE_SITE_URL=https://www.unitedbba.com` (or your real canonical domain)
   - Optional Meta tokens for social feed refresh (see `.env.example`)
5. After merge to `main`, the host rebuilds and republishes automatically.

#### Option 3 — Any static host / traditional web host

Upload the **contents** of `dist/` to the host’s public web root. Enable an
**SPA fallback**: rewrite all unknown paths to `index.html` (HTTP 200), not a 404.

### Step E — SPA routing (critical)

This is a single-page app. Deep links and browser refresh must serve `index.html`.

| Host | What to do |
| --- | --- |
| **Netlify** | `public/_redirects` is already included (`/* /index.html 200`) and copies into `dist/` on build |
| **Vercel** | Usually automatic for Vite/React; add a `vercel.json` rewrite if refreshes 404 |
| **Other** | Enable “SPA fallback” / rewrite all routes to `index.html` |

Without this, the home page works but `/programs/tiny-tigers` etc. may 404 on refresh.

### Step F — Custom domain

In Netlify or Vercel: **Domain settings** → add `unitedbba.com` / `www` → follow DNS
prompts (A/CNAME records at your registrar). After DNS propagates, set
`VITE_SITE_URL` to the live HTTPS origin and rebuild so sitemap/canonical tags match.

### Step G — After go-live smoke test

1. Open the home page and confirm the hero + free-class CTA opens the **school
   picker** → picking Allendale loads the NextKick trial iframe.
2. Repeat for Birthday Parties, Summer Camp, and Parents' Night Out pages.
3. Open Allendale / Midland Park location pages; confirm phone/hours look right.
4. Open `/follow-us` and confirm Instagram/Facebook links.
5. Spot-check `/privacy` and `/terms`.
6. In Google Search Console (optional), submit `https://your-domain/sitemap.xml`.

You do **not** need to deploy the Express `server/` package for these NextKick
flows. The optional email API is documented in [`docs/BACKEND.md`](docs/BACKEND.md)
for legacy / custom lead posting only.

---

## 🗺 Website map — pages & features

Routes are defined in [`src/App.tsx`](src/App.tsx). Editable copy lives mainly in
[`src/data/site.ts`](src/data/site.ts); forms & social in
[`src/data/contact.ts`](src/data/contact.ts).

### Marketing pages

| URL | Page | What visitors get |
| --- | --- | --- |
| `/` | **Home** | Full-bleed hero (Ken Burns video / poster), brand title, primary free-class CTA, programs overview, values/marquee, locations teaser, owner story, testimonials, follow-us, trial section |
| `/programs/children` | **Children’s programs** | Age-based kids program overview + links into each program detail |
| `/programs/adult` | **Adult programs** | Adult / specialty program overview |
| `/programs/:slug` | **Program detail** | Data-driven page per program (`PROGRAM_DETAILS`) — benefits, schedule notes, related programs, free-class CTA |
| `/just-4-kids` | **Just 4 Kids hub** | Birthday parties, summer camp, and Parents' Night Out tiles |
| `/just-4-kids/birthday-parties` | **Birthday parties** | Event story, inclusions, FAQs, NextKick birthday signup (pick school → form) |
| `/just-4-kids/summer-camp` | **Summer / day camp** | Camp story, pack list, FAQs, NextKick camp signup |
| `/just-4-kids/parents-night-out` | **Parents' Night Out** | Monthly Friday drop-off event story, FAQs, **call-to-reserve** directions (no online form) |
| `/locations/allendale` | **Allendale** | Address, phone, hours, map/directions cues, free-class CTA |
| `/locations/midland-park` | **Midland Park** | Same location template |
| `/locations/glen-rock` | **Glen Rock** | Same template when Glen Rock is enabled in site data |
| `/contact` | **Contact** | School contacts + free-class NextKick launcher |
| `/follow-us` | **Follow Us** | Instagram & Facebook profile cards |
| `/follow-us/instagram` | **Instagram feed** | Curated / API-backed posts when configured |
| `/follow-us/facebook` | **Facebook feed** | Same for Facebook |
| `/privacy` | **Privacy Policy** | Legal copy (replace placeholders before launch) |
| `/terms` | **Terms** | Legal copy (replace placeholders before launch) |
| *(any other path)* | **404** | Not-found page |

### Program detail slugs (`/programs/:slug`)

Add or edit programs in `PROGRAM_DETAILS` (+ the children/adult arrays). No new
route file is required.

| Slug | Typical audience |
| --- | --- |
| `tiny-tigers` | Youngest kids |
| `junior-tigers` | Elementary-age kids |
| `teen-martial-arts` | Teens |
| `adult-program` | Adults |
| `family-programs` | Families training together |
| `olympic-sparring` | Competitive sparring |
| `swat-team` | Advanced / team track |
| `self-defense` | Self-defense focus |
| `weapons-class` | Weapons training |

Note: `/programs/children` and `/programs/adult` are **static** category pages and
take precedence over the dynamic `:slug` route.

### Site-wide features

- **NextKick form portal** — location picker lightbox → per-school iframe for
  trial, birthday, summer camp, and Parents' Night Out (`TrialCta` +
  `NextKickFormPortal` + trial portal context).
- **SEO** — per-route `<title>` / meta / Open Graph via `Seo` + site/SEO data;
  sitemap & robots generated on build (`pnpm sitemap` / part of `pnpm build`).
- **Design system** — CSS variables in `src/index.css`; Reveal scroll motion;
  Framer Motion on the home hero; belt-bar / dojang motifs.
- **Authentic media** — self-hosted stills/video under `public/media/` referenced
  from `IMAGES` / authentic media helpers (see [`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md)).
- **Responsive layout** — mobile nav, stacked sections, Playwright visual matrix
  in [`docs/RESPONSIVE_TEST_MATRIX.md`](docs/RESPONSIVE_TEST_MATRIX.md).
- **Legacy Express API** (`server/`) — optional `POST /api/leads` mailer; **not**
  used by live marketing CTAs after the NextKick migration.

---

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Vite dev server with hot reload (`http://localhost:5173`) |
| `pnpm dev:api` | Legacy leads email API on port 3001 |
| `pnpm dev:all` | Website + API together |
| `pnpm start:api` | Run the API (production-style entry) |
| `pnpm sitemap` | Regenerate `public/sitemap.xml` and `public/robots.txt` |
| `pnpm build` | Sitemap + TypeScript project build + Vite production bundle → `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest once (client + `server/**`) |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm test:ci` | Lint + Vitest + production build |
| `pnpm test:e2e` | Playwright E2E (against preview) |
| `pnpm test:e2e:ui` | Playwright UI mode |

Manual QA: [`docs/QA.md`](docs/QA.md).

---

## Project structure

```
src/
  data/contact.ts     # NextKick form URLs (all CTAs) + Instagram / Facebook + legacy notify emails
  data/site.ts        # Programs, locations, Just 4 Kids copy, nav, testimonials, SEO helpers
  data/authenticMedia.ts  # Provenance-aware media slots
  components/         # Header, Footer, TrialCta, NextKickFormPortal, Seo, MediaFrame, …
  pages/              # Routed pages (Home, Programs, Just 4 Kids, Locations, Contact, …)
  styles/             # portal.css and other feature styles
server/               # Optional Express API (legacy /api/leads email delivery)
public/               # Static assets copied into dist/ (media, fonts, sitemap, _redirects)
docs/                 # Launch, media, SEO, backend, and QA guides
```

---

## ✍️ Making quick text changes

Almost all wording lives in **two files**:

1. [`src/data/site.ts`](src/data/site.ts) — programs, locations, Just 4 Kids, nav, owner, testimonials
2. [`src/data/contact.ts`](src/data/contact.ts) — NextKick URLs, social profiles, (legacy) notify emails

Edit only the text **inside quotes**. Keep commas, brackets, and quotes intact.
With `pnpm dev` running, changes hot-reload.

| I want to change… | Look for |
| --- | --- |
| Free-class / birthday / camp / PNO NextKick URLs | `NEXTKICK_FORMS` in `contact.ts` |
| Instagram / Facebook links | `SOCIAL_PROFILES` in `contact.ts` |
| Phone, address, or hours | `LOCATIONS`, `GLEN_ROCK` in `site.ts` |
| Show / hide Glen Rock | Glen Rock flag in `SITE` / location data |
| Program names & blurbs | home program cards, children/adult arrays, `PROGRAM_DETAILS` |
| Birthday / camp / PNO page copy & FAQs | `JUST_4_KIDS_DETAILS` |
| Owner bio / quote | `OWNER` |
| Reviews | `TESTIMONIALS` |
| Primary CTA button label | `SITE.primaryCta` (or equivalent site CTA field) |
| Menu links | `NAV`, footer links, mega menu |

Photos and video paths are centralized in `IMAGES` / authentic media helpers.
Provenance and replacement notes: [`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md).

### Deliverable docs

- [`IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md) — photo/video provenance + licensing
- [`PERFORMANCE.md`](docs/PERFORMANCE.md) — media encode targets, code splitting
- [`OWNER_APPROVAL_CHECKLIST.md`](docs/OWNER_APPROVAL_CHECKLIST.md) — facts to confirm
- [`PLACEHOLDER_CHECKLIST.md`](docs/PLACEHOLDER_CHECKLIST.md) — remaining placeholders
- [`OWNER_EMAIL_AND_ACCOUNTS_SETUP.md`](docs/OWNER_EMAIL_AND_ACCOUNTS_SETUP.md) — social + optional mail API
- [`BACKEND.md`](docs/BACKEND.md) — NextKick URL table + legacy API reference
- [`SEO.md`](docs/SEO.md) — metadata, sitemap, canonical URL

### Notes

- Trial, birthday, and summer camp CTAs use **NextKick**. Parents' Night Out is reserved **by phone** (no online form, no Gmail).
- Stats and some testimonials may still be marked pending owner confirmation —
  do not present unverified numbers as facts.
- Hero/impact titles use **Anton**; other headings use Teko; body uses Inter
  (Google Fonts).
