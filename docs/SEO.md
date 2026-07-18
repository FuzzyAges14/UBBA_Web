# On-page SEO & metadata

This project is a client-rendered React SPA. Route metadata is applied by
`src/components/Seo.tsx` from records in `src/data/seo.ts`.

## Site URL

Canonical, Open Graph, Twitter, sitemap, and robots URLs all use one origin:

| Source | Notes |
| --- | --- |
| `VITE_SITE_URL` | Preferred. Set in `.env` or the host (Netlify/Vercel) env UI. No trailing slash. |
| Fallback | `https://www.unitedbba.com` in `src/config/siteUrl.ts` |

Confirm the live domain with the owner before launch and set `VITE_SITE_URL`
accordingly (include `www` only if that is the canonical host).

## Editing page metadata

1. Open `src/data/seo.ts`.
2. Update the `SEO` map entry for the path (title + description required).
3. Optional overrides: `ogTitle`, `ogDescription`, `ogImage`, `ogType`,
   `twitterCard`, `twitterTitle`, `twitterDescription`, `twitterImage`, `robots`.
4. Program detail pages (`/programs/:slug`) inherit titles/descriptions from
   `PROGRAM_DETAILS` when no static override exists.
5. Location landing pages (`/locations/allendale`, `/locations/midland-park`)
   are included in `SEO` / `LOCATION_SEO` and the sitemap.

## Social share image

Default image: `/media/hero-poster.jpg` (`DEFAULT_OG_IMAGE_PATH`).

Before launch, replace with a dedicated **1200×630** share image (for example
`/media/og-share.jpg`) and update `DEFAULT_OG_IMAGE_PATH` or per-route
`ogImage` fields. Do not invent a final brand photo here — use academy-owned
assets.

## Sitemap & robots

```bash
pnpm sitemap   # writes public/sitemap.xml + public/robots.txt
pnpm build     # runs sitemap generation first
```

`scripts/generate-sitemap.ts` reads `getIndexablePaths()` so new `SEO` entries
and program slugs are included automatically. Unknown / 404 paths are excluded.
`/api/` is disallowed in `robots.txt`.

After adding a page:

1. Add the React route.
2. Add SEO metadata (or a program detail entry).
3. Run `pnpm sitemap` (or build).

## SPA sharing caveat

Some social crawlers do not execute JavaScript. Deep-link previews may fall back
to the defaults in `index.html` until the host adds prerendering or static
meta injection. Google Search generally executes JS for indexing.

## Owner inputs before launch

- Confirm canonical production domain (`VITE_SITE_URL`)
- Provide a final Open Graph / social share image
- Approve privacy & terms copy (still marked placeholder in the UI)
- When location landing pages ship, verify addresses/hours before indexing
