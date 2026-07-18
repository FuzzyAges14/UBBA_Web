# Interior page families (Agent 6)

Shared visual logic for service, program, event, location, campaign, and legal
pages — without cloning the homepage composition.

## Families

| Family | Routes | Hero | Media rule | Signature rhythm |
| --- | --- | --- | --- | --- |
| **Program** | `/programs/children`, `/programs/adult`, `/programs/:slug` | Dark `PageHero` + `family="program"` + brand mark + red/blue accent | Atmospheric Mixkit frames from `IMAGES` allowed when clearly labeled temporary stock; never as real UBBA students | Card grid → editorial split → FAQ → `CtaBanner` |
| **Event (Just 4 Kids)** | `/just-4-kids`, birthday, summer camp, parents’ night out | Playful `j4k-hero` / `PageHero variant="playful"` | Authentic event photos required; `MediaFrame` + `ownerRequired` until owner assets arrive | Will-list (non-card) → media split → pack/includes → FAQ → inquiry form |
| **Location** | `/locations/allendale`, `/locations/midland-park` | Dark `PageHero` + `family="location"` | School interior/exterior: `OwnerMediaSlot` only — no stock substitute | Welcome + owner slot → map/hours → community list → program cards → CTA |
| **Contact** | `/contact` | Dark `PageHero` + `family="contact"` (centered) | Maps only; no fabricated school photography | Location blocks → dark LeadForm panel |
| **Legal** | `/privacy`, `/terms` | Quiet `PageHero` + `family="legal"` (no brand shout) | None | Narrow `.legal-prose` |

Glen Rock continues to appear on Contact when `SITE.showGlenRock` is enabled; it
does not yet have a dedicated location page.

## Shared building blocks

- `PageHero` — brand wordmark, heritage accent bar, family background variants
- `SectionSeam` — tone transitions between dark / off-white / j4k surfaces
- `OwnerMediaSlot` — reserved authentic photography frame
- `MediaFrame` — Just 4 Kids placeholders with optional owner-required note
- `ProgramCard` / `CtaBanner` / forms — unchanged conversion behavior

## CSS ownership

| File | Role |
| --- | --- |
| `src/styles/interior.css` | Page-family rules (program/location/contact/legal media + lists) |
| `src/styles/just4kids.css` | Playful event layer |
| `src/styles/chrome.css` | Base `.page-hero` chrome |

Homepage-only `src/styles/hero.css` and `src/pages/home/*` are out of scope for
this family system.

## Media honesty

- Temporary stock used on program overview splits is credited in-figure.
- Location school frames and Just 4 Kids event frames remain
  `OWNER PHOTO REQUIRED — DO NOT SUBSTITUTE WITH MISLEADING STOCK`.
- Owner portrait, academy interiors/exteriors, and testimonials stay
  owner-supplied requirements.
