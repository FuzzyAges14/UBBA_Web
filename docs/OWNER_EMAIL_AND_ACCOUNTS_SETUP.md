# Owner Guide: Link Emails, Accounts & Organized Form Delivery

**Who this is for:** the academy owner / staff who need website form requests
(free class, birthday parties, summer camp, Parents’ Night Out) delivered to the
correct inboxes, with Instagram and Facebook linked correctly.

**Goal:** every website signup produces a clear, labeled email in the right
mailbox so staff can open it, see all the details in order, and hit **Reply** to
reach the family.

---

## What “organized backend retrieval” means on this site

This website does **not** log into Gmail/Outlook as an email app. Instead:

1. A visitor fills out a form on the site.
2. The small backend API packages their answers into a **structured email**
   (name, phone, location, program, child info, dates, message, etc.).
3. That email is sent to the academy inbox(es) you configure.
4. Staff retrieve leads by reading those emails in their normal mail app
   (Gmail, Outlook, phone Mail, etc.).

Until the steps below are finished, forms may only **print** the email in a
server log (useful for testing) and **not** arrive in a real inbox.

---

## Quick checklist (do these in order)

- [ ] **Step 1** — Decide which email addresses receive which forms
- [ ] **Step 2** — Edit `src/data/contact.ts` (inboxes + Instagram + Facebook)
- [ ] **Step 3** — Create a `.env` file and connect a mail service (Resend **or** SMTP)
- [ ] **Step 4** — Test locally (`pnpm dev:all`) and confirm a real inbox message
- [ ] **Step 5** — Deploy the website **and** the API so live forms keep working
- [ ] **Step 6** — Optional: route birthday/camp/etc. to separate staff inboxes

Related short reference: [`BACKEND.md`](BACKEND.md)  
Editable file for emails & social: [`src/data/contact.ts`](../src/data/contact.ts)  
Secrets template: [`.env.example`](../.env.example)

---

## Step 1 — Decide your inboxes

Write down the real addresses you want to use. Examples:

| Purpose | Example address | Notes |
| --- | --- | --- |
| Default inbox (all forms unless overridden) | `info@unitedbba.com` | Main staff mailbox |
| Public “mailto” on the website | Usually same as default | Shown to visitors |
| Optional: free-class only | `trials@unitedbba.com` | Only if you want a separate box |
| Optional: birthday parties only | `parties@unitedbba.com` | Only if someone else handles parties |
| Optional: summer camp only | `camp@unitedbba.com` | Only if someone else handles camp |
| Optional: Parents’ Night Out only | `events@unitedbba.com` | Only if needed |

You can start with **one** address for everything. Separate inboxes are optional.

Also gather:

- Your **Instagram** profile URL (e.g. `https://www.instagram.com/yourhandle`)
- Your **Facebook** page URL (e.g. `https://www.facebook.com/yourpage`)

---

## Step 2 — Edit emails & social links in `src/data/contact.ts`

Open this one file:

```
src/data/contact.ts
```

This is the main owner-edit file for delivery and social accounts.

### 2a. Default notify inbox (required)

Find `CONTACT.notifyEmails` and replace the placeholder with your real address(es):

```ts
notifyEmails: [
  'info@unitedbba.com',          // ← put your real inbox here
  // 'owner@example.com',        // ← optional second copy
],
```

Every form sends here unless you set a per-form override (Step 6).

### 2b. Public email on the site (required)

Find `CONTACT.publicEmail` and set the address visitors see / mailto:

```ts
publicEmail: 'info@unitedbba.com',
```

### 2c. From-name & Reply-To (usually leave as-is)

- `fromName: 'UBBA Website'` — what appears as the sender name in your inbox.
- `replyToVisitor: true` — keep this **true** so staff can hit Reply and email
  the family who submitted the form.

### 2d. Optional separate inboxes per form

Still in `contact.ts`, under `INQUIRY_TYPES`, uncomment and fill only the ones
you want routed differently:

```ts
'free-class': {
  label: 'Free Class Request',
  notifyEmails: ['trials@unitedbba.com'],
},
birthday: {
  label: 'Birthday Party Inquiry',
  notifyEmails: ['parties@unitedbba.com'],
},
'summer-camp': {
  label: 'Summer Camp Inquiry',
  notifyEmails: ['camp@unitedbba.com'],
},
'parents-night-out': {
  label: "Parents' Night Out Inquiry",
  notifyEmails: ['events@unitedbba.com'],
},
```

Leave `notifyEmails` commented out / omitted to keep using the default
`CONTACT.notifyEmails` list.

### 2e. Instagram & Facebook (required before launch)

Find `SOCIAL_PROFILES`. For each network:

1. Paste the real `href` URL.
2. Update `handle` if needed.
3. Set `placeholder: false`.

Example:

```ts
{
  slug: 'instagram',
  label: 'Instagram',
  href: 'https://www.instagram.com/unitedblackbelt',
  handle: '@unitedblackbelt',
  blurb: 'Class moments, belt promotions, and academy life — see what is happening on the mat.',
  placeholder: false,
},
{
  slug: 'facebook',
  label: 'Facebook',
  href: 'https://www.facebook.com/unitedblackbelt',
  handle: 'United Black Belt Academy',
  blurb: 'Events, camp updates, and community news for families across Bergen County.',
  placeholder: false,
},
```

These links appear on Follow Us pages, the footer, and at the bottom of staff
notification emails.

### After saving `contact.ts`

If the API is already running, **restart it** (`pnpm dev:api` or restart the
host). The website hot-reloads; the API reads this file at startup.

---

## Step 3 — Connect a mail account so emails actually send

Copy the secrets template (once):

```bash
cp .env.example .env
```

Open `.env`. **Never commit this file** (it holds passwords / API keys).

Pick **one** option below.

### Option A — Resend (recommended, simplest)

1. Create an account at [resend.com](https://resend.com).
2. Verify your sending domain (or use their test sender while testing).
3. Create an API key.
4. In `.env` set:

```bash
RESEND_API_KEY=re_xxxxxxxx
MAIL_FROM_EMAIL=leads@your-verified-domain.com
MAIL_FROM_NAME=UBBA Website
```

`MAIL_FROM_EMAIL` must be on a domain Resend has verified, or delivery will fail.

### Option B — Gmail SMTP

1. Turn on 2-Step Verification on the Google account.
2. Create an [App Password](https://support.google.com/accounts/answer/185833)
   (do **not** use your normal Gmail password).
3. In `.env` set:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@gmail.com
SMTP_PASS=your-16-char-app-password
MAIL_FROM_EMAIL=your@gmail.com
MAIL_FROM_NAME=UBBA Website
```

### Option C — Outlook / Microsoft / host email / SendGrid / Mailgun

Use either a full URL:

```bash
SMTP_URL=smtps://user:pass@smtp.example.com:465
```

…or host + user + pass:

```bash
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your@email.com
SMTP_PASS=your-password-or-app-password
MAIL_FROM_EMAIL=your@email.com
MAIL_FROM_NAME=UBBA Website
```

Ask your email host for the correct SMTP host and port if unsure.

### Optional overrides in `.env` (instead of editing `contact.ts`)

You can also set recipients here (useful on a hosting dashboard without
redeploying code):

```bash
NOTIFY_EMAILS=info@unitedbba.com,owner@example.com
NOTIFY_EMAILS_BIRTHDAY=parties@unitedbba.com
NOTIFY_EMAILS_SUMMER_CAMP=camp@unitedbba.com
NOTIFY_EMAILS_PARENTS_NIGHT_OUT=events@unitedbba.com
NOTIFY_EMAILS_FREE_CLASS=trials@unitedbba.com
```

Priority for who gets each form:

1. `INQUIRY_TYPES.*.notifyEmails` in `contact.ts` (if set)
2. Else the matching `NOTIFY_EMAILS_*` env var
3. Else `NOTIFY_EMAILS` env var, else `CONTACT.notifyEmails`

---

## Step 4 — Test that organized emails arrive

1. Install and run website + API together:

```bash
pnpm install
pnpm dev:all
```

2. Open the health check: [http://localhost:3001/api/health](http://localhost:3001/api/health)

   - Look for `"mail": "resend"` or `"mail": "smtp"` → real sending is configured.
   - If you see `"mail": "log"` → no keys yet; emails only print in the API
     terminal (forms still “succeed,” but nothing hits an inbox).

3. Submit each form once and confirm the correct inbox receives a labeled email:

| Form | Where to test | Email title (default) |
| --- | --- | --- |
| Free class | Home or Contact page | Free Class Request |
| Birthday party | `/just-4-kids/birthday-parties` | Birthday Party Inquiry |
| Summer camp | `/just-4-kids/summer-camp` | Summer Camp Inquiry |
| Parents’ Night Out | `/just-4-kids/parents-night-out` | Parents' Night Out Inquiry |

4. Open the message and confirm:
   - All fields appear as clear labeled rows
   - Birthday / camp child details and dates/weeks are present when filled in
   - **Reply** goes to the visitor (Reply-To)
   - Instagram / Facebook links appear at the bottom (once Step 2e is done)

---

## Step 5 — Make it work on the live website

The marketing site (pages/photos) and the form API are **separate**:

| Piece | What it is | Typical host |
| --- | --- | --- |
| Website | Static files from `pnpm build` → `dist/` | Netlify, Vercel, etc. |
| API | Node server: `pnpm start:api` | Render, Railway, Fly.io, VPS |

### 5a. Deploy the website

Build and publish `dist/` (see the main [`README.md`](../README.md) launch
section). Remember SPA redirects so pages like `/contact` refresh correctly.

### 5b. Deploy the API

1. Host the Node API with start command `pnpm start:api` (or equivalent).
2. Copy the same `.env` values into that host’s environment variables
   (`RESEND_API_KEY` or SMTP settings, `NOTIFY_EMAILS` if used, etc.).
3. Confirm `https://YOUR-API-HOST/api/health` shows `"mail": "resend"` or
   `"mail": "smtp"`.

### 5c. Connect the website to the API

Choose one:

**Preferred:** on the web host, **proxy** `/api/*` to the API server so forms
keep posting to `/api/leads` with no frontend code change.

**Alternative:** point forms at the API’s full URL and set:

```bash
CORS_ORIGINS=https://unitedbba.com,https://www.unitedbba.com
```

on the API host (comma-separated live site origins).

Without Step 5, local testing can work while the **public** site silently fails
to email staff.

---

## Step 6 — Optional polish

- Add a second staff address to `CONTACT.notifyEmails` so two people always get
  a copy.
- Use per-form inboxes (Step 2d or `.env` overrides) when different staff own
  parties vs trials.
- If spam becomes a problem later, consider a CAPTCHA / privacy checkbox
  (noted in [`PLACEHOLDER_CHECKLIST.md`](PLACEHOLDER_CHECKLIST.md)).
- Keep Privacy Policy / Terms updated once a mail vendor (Resend/SMTP) is chosen.

---

## What you do **not** need

This project does **not** require:

- Google OAuth “Sign in with Google” for the website
- Microsoft Graph / Outlook app registration for reading mail
- Firebase accounts
- IMAP setup to pull messages into the site
- A CRM database for leads (emails are the delivery channel today)

If mail delivery fails after the form says “success,” check spam folders, the
API host logs, and that `MAIL_FROM_EMAIL` / SMTP credentials are valid.

---

## Owner sign-off

When finished, you should be able to say:

- [ ] Free-class requests arrive in the correct inbox with full details
- [ ] Birthday, summer camp, and Parents’ Night Out requests arrive (and to the
      right people if split)
- [ ] Replying from the notification email reaches the visitor
- [ ] Instagram and Facebook links on the site go to the real academy profiles
- [ ] The **live** website (not only localhost) still delivers form emails

Also mark the matching items in:

- [`OWNER_APPROVAL_CHECKLIST.md`](OWNER_APPROVAL_CHECKLIST.md) — Contact & legal
- [`PLACEHOLDER_CHECKLIST.md`](PLACEHOLDER_CHECKLIST.md) — Forms & email delivery

---

## Who to ask for help

| Need | Point them at |
| --- | --- |
| Change wording / hours / programs | `src/data/site.ts` + README “Making quick text changes” |
| Change inboxes / Instagram / Facebook | `src/data/contact.ts` (this guide, Step 2) |
| API / Resend / SMTP / deploy proxy | [`BACKEND.md`](BACKEND.md) + this guide Steps 3–5 |
| Photos / licensing | [`IMAGE_SOURCES.md`](IMAGE_SOURCES.md) |
