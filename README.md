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

This section is for whoever will put the site on the academy’s real web address
(for example `www.youracademy.com`) — even if they are not a developer.

**Big picture (4 ideas):**

1. **Prepare** — paste the real signup links and check phone numbers / hours.
2. **Build** — turn the project into a finished website folder named `dist`.
3. **Publish** — upload that folder to a free host (Netlify or Vercel).
4. **Connect your domain** — point the customer’s purchased domain at that host.

You do **not** need Gmail setup for free-class, birthday, summer camp, or
Parents' Night Out. Free class / birthday / camp use NextKick. Parents' Night
Out is reserved by calling the school.

---

### Step 1 — Paste the real signup links (before people start signing up)

Open this one file in the project:

**[`src/data/contact.ts`](src/data/contact.ts)**

Look for `NEXTKICK_FORMS`. That block holds the “share link” for each school’s
signup form.

| What visitors sign up for | Where they click it on the site | Schools |
| --- | --- | --- |
| Free trial class | Home, Contact, program & location pages | Allendale, Midland Park, Glen Rock |
| Birthday party | Just 4 Kids → Birthday Parties | same three schools |
| Summer / day camp | Just 4 Kids → Summer Camp | same three schools |
| Parents' Night Out | Just 4 Kids → Parents' Night Out | **Call the school** — no online form |

**How to paste a NextKick link:**

1. Log into NextKick (the academy’s class/signup system).
2. Open the form you want (trial, birthday, or camp) for one school.
3. Copy the **student share link** (a long web address that usually includes
   `/form/` and a code).
4. In `src/data/contact.ts`, find that form + school and paste the link where
   it says `href: '...'`.
5. Save the file.

Also in the same file, under `SOCIAL_PROFILES`, paste the real Instagram and
Facebook page links.

**Parents' Night Out:** do not look for a NextKick form. That page already tells
families to call. Make sure the phone numbers in [`src/data/site.ts`](src/data/site.ts)
are correct.

---

### Step 2 — Quick content check (before the public goes live)

| Must do | What to check | Where to edit |
| --- | --- | --- |
| Yes | Free-class, birthday, and camp NextKick links are the real ones | `src/data/contact.ts` |
| Yes | Phone numbers and class hours for each school | `src/data/site.ts` |
| Yes | Privacy Policy and Terms pages have real wording | `/privacy` and `/terms` pages |
| Recommended | Photos of school exteriors look good | see [`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md) |
| Recommended | Reviews and stats are owner-approved | `src/data/site.ts` |
| Recommended | The “official” website address is set (for Google) | `VITE_SITE_URL` — explained in Step 5 |

Checklists:

- [`docs/PLACEHOLDER_CHECKLIST.md`](docs/PLACEHOLDER_CHECKLIST.md)
- [`docs/OWNER_APPROVAL_CHECKLIST.md`](docs/OWNER_APPROVAL_CHECKLIST.md)

---

### Step 3 — Build the finished website folder

On a computer with Node.js and pnpm installed (see Prerequisites at the top),
open a terminal in this project folder and run:

```bash
pnpm install     # downloads tools the site needs (first time, and after updates)
pnpm build       # creates the finished website in a folder named dist
```

When that finishes, you will see a folder called **`dist`**. That folder *is*
the website — plain files a host can show to visitors.

Optional: see it on your own computer first:

```bash
pnpm preview     # opens a local preview of the finished site
```

---

### Step 4 — Put the site on the internet (pick ONE)

You need a place that stores and serves the `dist` folder. Free options that work
well: **Netlify** or **Vercel**.

#### Option A — Fastest test (Netlify drag & drop)

Good for a quick “is it live?” check. Less ideal for ongoing updates.

1. Run `pnpm build` (Step 3).
2. Open [app.netlify.com/drop](https://app.netlify.com/drop) and sign in / create
   a free account.
3. Drag the whole **`dist`** folder onto that page.
4. Netlify gives you a temporary web address (something like
   `https://random-name.netlify.app`). Open it and check the site.

#### Option B — Best for real use (Netlify or Vercel + GitHub)

After this is set up once, every time you update the project on GitHub, the live
site can update automatically.

1. Create a free account at [Netlify](https://www.netlify.com) **or**
   [Vercel](https://vercel.com).
2. Click **Add new site** / **Import project** and connect the GitHub account
   that has this repository.
3. Choose this project. When asked for build settings, use:

   | Question they ask | What to type |
   | --- | --- |
   | Build command | `pnpm build` |
   | Publish folder / Output directory | `dist` |
   | Node version (if asked) | `22` |

4. In the host’s settings, add a site variable named `VITE_SITE_URL` and set it
   to the academy’s real address once you know it
   (example: `https://www.youracademy.com`). You can add this after Step 5.
5. Click deploy. Wait until it says the site is live. Open the temporary URL
   they give you and check it.

#### Option C — Other web hosts

If the academy already pays for web hosting, upload **everything inside** the
`dist` folder to the public website folder (sometimes called `public_html` or
`www`). Ask the host how to make “every page address load the main site file”
(needed so links like `/contact` work when someone refreshes the page). On
Netlify this is already handled for you.

---

### Step 5 — Connect the customer’s own domain (important)

A **domain** is the address people type, like `youracademy.com`. The customer
usually buys this from a company such as GoDaddy, Namecheap, Google Domains, or
Cloudflare. Publishing on Netlify/Vercel alone gives a temporary address; this
step makes **their** address show the new site.

Do this after Step 4 (the site must already be live on Netlify or Vercel).

**On Netlify or Vercel:**

1. Open your site in the Netlify or Vercel dashboard.
2. Find **Domain settings** / **Domains**.
3. Click **Add custom domain** (wording varies slightly).
4. Type the academy’s domain, for example:
   - `youracademy.com`
   - and/or `www.youracademy.com`
5. The host will show **DNS instructions** — usually one or two lines that look
   like “create a record of type A” or “create a record of type CNAME.”
   Copy those exactly. You will paste them at the domain company next.

**At the company where the domain was bought (GoDaddy, Namecheap, etc.):**

1. Log in and open the domain’s **DNS** settings (sometimes called “Manage DNS”
   or “DNS records”).
2. Add or edit the records exactly as Netlify/Vercel showed you.
   - Do not invent values — use the host’s numbers/names.
   - If the host says to remove an old “parking page” or old website record,
     remove or replace that old record so it does not fight the new one.
3. Save.

**Wait:** DNS changes can take from a few minutes up to about 24–48 hours.
Meanwhile the temporary Netlify/Vercel address still works.

**When the custom domain works in a browser:**

1. Back in Netlify/Vercel, confirm the domain shows as active / HTTPS (secure
   padlock). Free HTTPS certificates are usually automatic.
2. Set `VITE_SITE_URL` to that live address, for example
   `https://www.youracademy.com` (include `https://`, no slash at the end).
3. Trigger one more deploy / rebuild so Google-facing details (sitemap, page
   titles) use the real address.

**If something fails:**

- Double-check the DNS records match the host’s instructions character for
  character.
- Make sure you are editing DNS for the correct domain.
- Wait longer — DNS is often the slow part, not the website files.
- Netlify and Vercel both have “custom domain” help pages with screenshots.

---

### Step 6 — Make sure inside pages still work

This website has many pages (`/contact`, `/programs/...`, and so on). When
someone refreshes those pages, the host must still show the site (not a “page
not found” error).

| If you publish on… | What you need to do |
| --- | --- |
| **Netlify** | Nothing extra — this project already includes the needed setting file |
| **Vercel** | Usually works automatically |
| **Other host** | Ask them to send all unknown paths to `index.html` |

Quick check: open `https://your-domain/contact`, then press refresh. The Contact
page should still appear.

---

### Step 7 — Final checklist after the domain is live

1. Open the home page on the **customer’s domain** (not only the temporary host
   URL).
2. Click the free-class button → pick a school → confirm the NextKick signup
   form appears.
3. On Birthday Parties and Summer Camp pages, confirm the same kind of signup
   flow works.
4. On Parents' Night Out, confirm it says to **call** and shows school phone
   numbers (no online form).
5. Open each location page; confirm address, phone, and hours look right.
6. Open Follow Us; confirm Instagram and Facebook go to the real pages.
7. Open Privacy and Terms; confirm the wording is ready.
8. Optional: in [Google Search Console](https://search.google.com/search-console),
   add the site and submit `https://your-domain/sitemap.xml` so Google can find
   the pages.

You do **not** need a separate email server for the main marketing signups.
Extra backend notes (only if someone later wants custom email forms) are in
[`docs/BACKEND.md`](docs/BACKEND.md).

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
