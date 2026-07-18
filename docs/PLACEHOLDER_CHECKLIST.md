# Placeholder Content Checklist

All placeholder content is intentionally labeled in the UI (`PLACEHOLDER` tags on
images, "pending confirmation" notes on stats/programs). Track replacements here.

## Must replace before launch
- [ ] All photography & the hero video (see `IMAGE_SOURCES.md`) — currently free/CC
      placeholder media hotlinked from Mixkit/Flickr/Wikimedia
- [ ] Provide attribution for any CC BY / CC BY-SA images kept, or swap for owned media
- [ ] Self-host the final hero video instead of hotlinking the Mixkit CDN
- [ ] Owner portrait with a real photo of Sanghyun Lee (currently a stand-in)
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
