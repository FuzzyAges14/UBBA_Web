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
- [ ] Social media profile URLs (`SOCIAL`)
- [ ] Privacy Policy and Terms copy

## Forms (front-end only today)
- [ ] Connect `LeadForm` submissions to a backend/service
      (Formspree, HubSpot, Mailchimp, Zapier, or custom API). The form validates
      and shows a success state but does not send anything yet.
- [ ] Add spam prevention (honeypot/CAPTCHA) and privacy acknowledgement link

## Fonts
- [ ] The hero title uses the **Ocean Rush DEMO** font (free for personal use
      only). Purchase a commercial license before launch, or swap the
      `@font-face` in `src/index.css` for a licensed alternative.

## Optional
- [ ] Glen Rock is enabled (`SITE.showGlenRock = true`) with confirmed address &
      phone; add its hours when finalized (`GLEN_ROCK.hours`)
- [ ] Add structured data (LocalBusiness / SportsActivityLocation / FAQPage) once
      corresponding verified content exists
