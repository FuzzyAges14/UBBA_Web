# Architecture notes (homepage & styles)

This document describes the maintainability refactor led by the architecture agent.
Visual appearance and conversion behavior are intentionally unchanged.

## Homepage composition

`src/pages/Home.tsx` is a thin composition of section components under
`src/pages/home/`:

```
Home
├── HeroSection
├── Marquee (shared)
├── ProgramDiscoverySection
├── BenefitsSection
├── StatsSection
├── TrialSection
├── InstructorSection
├── BeltJourneySection
├── AudienceSection
├── TestimonialsSection
├── LocationsSection
├── FaqSection
└── FinalCtaSection
```

### Before

A single ~480-line `Home.tsx` owned hero markup, program rails, owner story,
testimonials, locations, FAQ, and the final CTA.

### After

Each section owns one responsibility. Shared presentation patterns live in
`src/components/` (`ProgramCard`, `SectionHeading`). Structured copy that is
reused or edited often lives in `src/data/site.ts`.

## Shared components extracted

| Component | Why |
| --- | --- |
| `ProgramCard` | Same `pcard` markup on Home, Children, Adult, Follow Us |
| `SectionHeading` | Repeated eyebrow / title / lead pattern |
| `fadeUp` (`src/lib/motion.ts`) | Hero motion variants |

## Areas intentionally not abstracted

- **Home final CTA vs `CtaBanner`** — Home uses a three-button banner (including
  a tel: link). `CtaBanner` is a two-link pattern used on inner pages. Merging
  them would add prop complexity without a clear win.
- **Event / Just 4 Kids page layouts** — Similar checklists and splits, but each
  page has distinct content blocks. Left as page-local markup for clarity.
- **Generic “Section” wrapper with many props** — Avoided; named sections are
  easier for a small team to scan than a configuration-driven section factory.

## Stylesheet organization

`src/index.css` is an import entry only. Rules live under `src/styles/`:

| File | Contents |
| --- | --- |
| `tokens.css` | Fonts + CSS custom properties |
| `base.css` | Reset, typography base, focus styles |
| `layout.css` | Container, sections, section headings |
| `buttons.css` | Button variants |
| `motifs.css` | Dojang grid, motion lines, belt bar |
| `header.css` | Header, nav, mega menu, mobile nav |
| `hero.css` | Home cinematic hero |
| `cards-media.css` | Photos, marquee, program cards, grids, placeholders |
| `sections.css` | Stats, forms, journey, owner, testimonials, locations, FAQ, CTA |
| `chrome.css` | Footer, inner page hero, mobile CTA bar |
| `motion.css` | Reveal animations + `prefers-reduced-motion` |
| `utilities.css` | Spacing, checklist, flex helpers |
| `just4kids.css` | Just 4 Kids playful layer |

Add new shared rules to the file that matches the concern. Prefer editing an
existing section file over growing `index.css` again.

## TypeScript content model

Primary content types live in `src/data/site.ts` (and `contact.ts` for emails /
social URLs). Notable unions/interfaces:

- `ProgramId`, `ProgramCard`, `ProgramDetail`, `ProgramCategory`
- `Location`, `LocationId`, `Testimonial`, `Faq`, `BeltStep`, `Stat`
- `NavLink`, `MegaGroup`
- `EventInquiryIntent`, `Just4KidsOffering`, `Just4KidsDetail`
- `AudienceFeature`, `OwnerProfile`
- `getVisibleLocations()` for the Glen Rock feature flag

SEO metadata types and route records live in `src/data/seo.ts` (canonical /
Open Graph / Twitter). Do not reintroduce a duplicate `SeoMeta` / `SEO` export
in `site.ts`.

`ProgramCard` accepts `titleAs` (`h2` | `h3`) so listing pages can keep the
SEO heading hierarchy (`h2` cards under a page H1) while homepage sections keep
`h3` under section H2s.

## Editing guide

1. **Copy / programs / locations** → `src/data/site.ts`
2. **Homepage section structure** → `src/pages/home/*`
3. **Shared UI chrome** → `src/components/*`
4. **Visual rules** → matching file under `src/styles/`
