# Placeholder Content Checklist

All placeholder content is intentionally labeled in the UI (`PLACEHOLDER` tags on
images, "pending confirmation" notes on stats/programs). Track replacements here.

## Must replace before launch
- [ ] All photography (see `IMAGE_SOURCES.md`) — currently art-directed placeholders
- [ ] Owner portrait with a real photo of Sanghyun Lee
- [ ] Testimonials with real, owner-approved reviews (no fabricated names/quotes)
- [ ] Stats: "Students Trained", "Years Serving", "Average Parent Rating"
- [ ] Midland Park phone & hours
- [ ] Social media profile URLs (`SOCIAL`)
- [ ] Privacy Policy and Terms copy

## Forms (front-end only today)
- [ ] Connect `LeadForm` submissions to a backend/service
      (Formspree, HubSpot, Mailchimp, Zapier, or custom API). The form validates
      and shows a success state but does not send anything yet.
- [ ] Add spam prevention (honeypot/CAPTCHA) and privacy acknowledgement link

## Optional
- [ ] Enable Glen Rock (`SITE.showGlenRock = true`) if the owner keeps it
- [ ] Add structured data (LocalBusiness / SportsActivityLocation / FAQPage) once
      corresponding verified content exists
