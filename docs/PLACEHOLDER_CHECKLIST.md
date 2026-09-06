# Placeholder Content Checklist

All placeholder content is intentionally labeled in the UI (`PLACEHOLDER` tags on
images, "pending confirmation" notes on stats/programs). Track replacements here.

## Must replace before launch
- [x] Program / hero / owner / Just 4 Kids media from unitedbba.com (self-hosted;
      see `IMAGE_SOURCES.md`) — location exteriors still open
- [x] Self-host hero MP4 + WebM under `public/media/` (Ken Burns still montage;
      prefer continuous dojang footage before launch)
- [x] Owner portrait of Sanghyun Lee (Master Lee) from unitedbba.com
- [ ] Location exterior / interior photos (Allendale, Midland Park, Glen Rock)
- [ ] Testimonials with real, owner-approved reviews (no fabricated names/quotes)
- [ ] Stats: "Students Trained", "Years Serving", "Average Parent Rating"
- [ ] Midland Park phone & hours
- [x] Social media profile URLs in `src/data/contact.ts` (`SOCIAL_PROFILES`) + recent
      posts on `/follow-us` / `/follow-us/:network` (Instagram `@ubbatkd` & Facebook
      `ubbaad`). Optional live auto-refresh via Meta Graph tokens in `.env`
      (`META_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`, `INSTAGRAM_BUSINESS_ACCOUNT_ID`)
- [ ] Privacy Policy and Terms copy

## Forms & delivery
- [x] Free-class, birthday, and summer-camp CTAs open a location-picker lightbox,
      then the per-school NextKick form (`NEXTKICK_FORMS` in `src/data/contact.ts`)
- [x] Parents' Night Out uses call-to-reserve (no NextKick form, no Gmail/`/api/leads`)
- [ ] Confirm trial / birthday / summer-camp NextKick URLs match NextKick admin
- [x] Instagram / Facebook profile URLs in `SOCIAL_PROFILES` (confirm handles stay current)
- [ ] Optional legacy: configure Resend/SMTP only if you still use `/api/leads`
      ([`OWNER_EMAIL_AND_ACCOUNTS_SETUP.md`](OWNER_EMAIL_AND_ACCOUNTS_SETUP.md))
- [ ] Optional: privacy acknowledgement checkbox / CAPTCHA if spam becomes an issue

## Fonts
- [x] Hero display titles use **Anton** (Google Fonts, OFL) via `--font-impact` — Ocean Rush DEMO removed.

## Optional
- [ ] Glen Rock is enabled (`SITE.showGlenRock = true`) with confirmed address &
      phone; add its hours when finalized (`GLEN_ROCK.hours`)
- [ ] Add structured data (LocalBusiness / SportsActivityLocation / FAQPage) once
      corresponding verified content exists
