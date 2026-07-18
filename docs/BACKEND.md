# Backend: free-class emails & social links

Everything you usually need to edit lives in **one file**:

[`src/data/contact.ts`](../src/data/contact.ts)

| I want to… | Edit |
| --- | --- |
| Change who receives free-class requests | `CONTACT.notifyEmails` (add as many addresses as you like) |
| Change the public mailto address | `CONTACT.publicEmail` |
| Add / update Instagram or Facebook | `SOCIAL_PROFILES` → set `href`, `handle`, then `placeholder: false` |
| Change the email subject prefix | `CONTACT.subjectPrefix` |

Mail **secrets** (SMTP password / Resend API key) go in `.env` — see [`.env.example`](../.env.example). Never commit `.env`.

## How a free-class / Just 4 Kids request works

1. Someone submits a form on the site (`LeadForm` or Just 4 Kids `EventInquiryForm`).
2. The browser `POST`s to `/api/leads`.
3. The API validates the fields, builds a detailed HTML + plain-text email, and sends it to every address in `notifyEmails`.
4. The email subject / title follows the selected program (e.g. “Birthday Party Inquiry” vs “Free Class Request”).
5. **Reply-To** is set to the visitor’s email, so staff can hit Reply and reach them directly.
6. Configured Instagram / Facebook profile links are included at the bottom of the email.

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

## Deploy the API

The marketing site can stay on Netlify/Vercel as a static build. Host the API (`pnpm start:api`) on any Node host (Render, Railway, Fly.io, a VPS) and either:

- Proxy `/api/*` from your web host to that API, **or**
- Set the site’s form requests to the API origin (and add that origin to `CORS_ORIGINS`).

Without mail credentials the API still accepts requests and logs the formatted email — useful for staging.

## Add another request type later

1. Reuse `server/email.ts` helpers (or copy `buildLeadEmail`).
2. Add a route in `server/app.ts` (e.g. `POST /api/birthday-parties`).
3. Point a new form at that path the same way `src/lib/submitLead.ts` posts to `/api/leads`.
