# Backend: form emails & social links

> **Owner-friendly walkthrough:** for a full checklist of which emails to use,
> what to edit, how to connect Resend/Gmail/SMTP, and how to deploy so live
> forms deliver — see
> [`OWNER_EMAIL_AND_ACCOUNTS_SETUP.md`](OWNER_EMAIL_AND_ACCOUNTS_SETUP.md).

Everything you usually need to edit lives in **one file**:

[`src/data/contact.ts`](../src/data/contact.ts)

| I want to… | Edit |
| --- | --- |
| Change who receives form emails (default) | `CONTACT.notifyEmails` |
| Send birthday / camp emails to a different inbox | `INQUIRY_TYPES.birthday.notifyEmails` or `INQUIRY_TYPES['summer-camp'].notifyEmails` |
| Change email titles (“Birthday Party Inquiry”, etc.) | `INQUIRY_TYPES.*.label` |
| Change the public mailto address | `CONTACT.publicEmail` |
| Add / update Instagram or Facebook | `SOCIAL_PROFILES` → set `href`, `handle`, then `placeholder: false` |

Mail **secrets** (SMTP password / Resend API key) go in `.env` — see [`.env.example`](../.env.example). Never commit `.env`.

## Forms that email staff

| Form | Page | Intent |
| --- | --- | --- |
| Free class (`LeadForm`) | Home, Contact | `free-class` |
| Birthday party signup | `/just-4-kids/birthday-parties` | `birthday` |
| Summer camp signup | `/just-4-kids/summer-camp` | `summer-camp` |
| Parents’ Night Out | `/just-4-kids/parents-night-out` | `parents-night-out` |

## How a request works

1. Someone submits a form (`LeadForm` or Just 4 Kids `EventInquiryForm`).
2. The browser `POST`s to `/api/leads` with an `intent` plus the filled fields.
3. The API validates, builds a detailed HTML + plain-text email, and sends it to the right inbox(es).
4. Birthday emails include child name/age, preferred date, and guest count as their own rows.
5. Summer camp emails include child name/age and preferred weeks as their own rows.
6. **Reply-To** is the visitor’s email so staff can hit Reply.
7. Configured Instagram / Facebook profile links are included at the bottom.

## Run locally

```bash
cp .env.example .env          # optional — without mail keys, emails print in the API console
pnpm install
pnpm dev:all                  # website (:5173) + API (:3001)
```

Or in two terminals: `pnpm dev` and `pnpm dev:api`.

Check the API: open `http://localhost:3001/api/health`.

## Send real email (pick one)

### Option A — Resend (simplest)

1. Create a free account at [resend.com](https://resend.com).
2. Add `RESEND_API_KEY=re_...` and a verified `MAIL_FROM_EMAIL` in `.env`.
3. Restart `pnpm dev:api`.

### Option B — SMTP (Gmail, Outlook, host email, etc.)

Set either `SMTP_URL=...` **or** `SMTP_HOST` + `SMTP_USER` + `SMTP_PASS` in `.env`.

Gmail typically needs an [App Password](https://support.google.com/accounts/answer/185833), not your normal login password.

### Optional per-type inbox overrides via env

```bash
NOTIFY_EMAILS_BIRTHDAY=parties@unitedbba.com
NOTIFY_EMAILS_SUMMER_CAMP=camp@unitedbba.com
```

These override `CONTACT.notifyEmails` for that form only (same idea as `INQUIRY_TYPES.*.notifyEmails` in `contact.ts`).

## Deploy the API

The marketing site can stay on Netlify/Vercel as a static build. Host the API (`pnpm start:api`) on any Node host (Render, Railway, Fly.io, a VPS) and either:

- Proxy `/api/*` from your web host to that API, **or**
- Set the site’s form requests to the API origin (and add that origin to `CORS_ORIGINS`).

Without mail credentials the API still accepts requests and logs the formatted email — useful for staging.

## Security configuration (production)

| Variable | Purpose |
| --- | --- |
| `CORS_ORIGINS` | Comma-separated browser origins allowed to `POST /api/leads`. **Required in production** when browsers send `Origin` — an empty list rejects those requests (no silent allow-all). |
| `TRUST_PROXY` | Set `1` / `true` behind Render, Railway, Fly, nginx, etc. so per-IP rate limits use the real client address. |
| `RATE_LIMIT_MAX` | Max lead posts per IP per window (default `30`). |
| `RATE_LIMIT_WINDOW_MS` | Window length in ms (default `900000` = 15 minutes). |
| `MIN_FORM_MS` | Minimum time between form open and submit (default `2000`). Faster posts are treated as spam (silent success). |
| `CAPTCHA_SECRET` or `TURNSTILE_SECRET_KEY` | Optional. When set, `/api/leads` requires a valid `captchaToken`. Leave unset for the default CAPTCHA-free form. |

The API also sets Helmet security headers, validates/length-limits every lead field, rejects unknown JSON keys, strips control characters from email subjects, and never lets the client choose mail recipients.

### Proxy + CORS checklist

1. Set `NODE_ENV=production` on the host.
2. Set `CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com`.
3. If the API is behind a reverse proxy, set `TRUST_PROXY=1`.
4. Confirm a real form submit still delivers mail (or logs in staging).
5. Confirm a second origin (or curl with a fake `Origin`) receives `403` when not listed.

## Add another request type later

1. Add a key to `INQUIRY_TYPES` in `src/data/contact.ts`.
2. Extend `InquiryIntent` in the same file (+ `VALID_INTENTS` in `server/leads.ts`).
3. Point a form at `/api/leads` with that `intent` (see `EventInquiryForm`).
