# Placeholder Content Checklist

All placeholder content is intentionally labeled in the UI (`PLACEHOLDER` tags on
images, "pending confirmation" notes on stats/programs). Track replacements here.

## Must replace before launch
- [ ] All temporary stock photography & hero video with authentic UBBA media
      (see `IMAGE_SOURCES.md` — currently self-hosted Pexels / Wikimedia CC0 /
      Mixkit Free temporary package; no production hotlinks)
- [ ] Provide attribution for any CC BY / CC BY-SA images kept, or swap for owned media
- [x] Self-host hero MP4 + WebM under `public/media/` (temporary stock loop;
      replace with academy footage before launch)
- [ ] Owner portrait with a real photo of Sanghyun Lee
      (**OWNER PHOTO REQUIRED** — UI Placeholder; no stock face shipped)
- [ ] Testimonials with real, owner-approved reviews (no fabricated names/quotes)
- [ ] Stats: "Students Trained", "Years Serving", "Average Parent Rating"
- [ ] Midland Park phone & hours
- [ ] Social media profile URLs in `src/data/contact.ts` (`SOCIAL_PROFILES`) + recent
      posts on `/follow-us` / `/follow-us/:network` (Instagram & Facebook only; no YouTube)
- [ ] Privacy Policy and Terms copy

## Forms & email delivery
- [x] `LeadForm` (free class) posts to `/api/leads` (see `docs/BACKEND.md`)
- [x] Birthday + summer camp signups (`EventInquiryForm`) post to `/api/leads`
- [x] Honeypot spam field on the forms
- [ ] Set real `CONTACT.notifyEmails` / `INQUIRY_TYPES` + `SOCIAL_PROFILES` in `src/data/contact.ts`
      (step-by-step: [`OWNER_EMAIL_AND_ACCOUNTS_SETUP.md`](OWNER_EMAIL_AND_ACCOUNTS_SETUP.md))
- [ ] Configure Resend or SMTP in `.env` so requests leave log-only mode
      (same owner setup guide)
- [ ] Optional: privacy acknowledgement checkbox / CAPTCHA if spam becomes an issue

## Fonts
- [ ] The hero title uses the **Ocean Rush DEMO** font (free for personal use
      only). Purchase a commercial license before launch, or swap the
      `@font-face` in `src/index.css` for a licensed alternative.

## Optional
- [ ] Glen Rock is enabled (`SITE.showGlenRock = true`) with confirmed address &
      phone; add its hours when finalized (`GLEN_ROCK.hours`)
- [ ] Add structured data (LocalBusiness / SportsActivityLocation / FAQPage) once
      corresponding verified content exists
