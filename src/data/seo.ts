import { absoluteAssetUrl, absoluteUrl, DEFAULT_OG_IMAGE_PATH } from '../config/siteUrl'
import { getProgram, PROGRAM_DETAILS, SITE, type ProgramDetail } from './site'

export type OgType = 'website' | 'article'
export type TwitterCard = 'summary' | 'summary_large_image'

/**
 * Page-level SEO record. Optional Open Graph / Twitter fields fall back to
 * title, description, and the default share image when omitted.
 */
export type SeoMeta = {
  title: string
  description: string
  /** Canonical path (defaults to the current route path). */
  canonicalPath?: string
  ogTitle?: string
  ogDescription?: string
  /** Site-relative path or absolute URL. */
  ogImage?: string
  ogType?: OgType
  twitterCard?: TwitterCard
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  /** e.g. `noindex, nofollow` for error pages. */
  robots?: string
  /** When false, route is omitted from sitemap.xml. Default true. */
  indexable?: boolean
}

export type ResolvedSeo = {
  title: string
  description: string
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  ogType: OgType
  twitterCard: TwitterCard
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  robots?: string
}

const brand = SITE.name

function meta(
  title: string,
  description: string,
  extras: Partial<SeoMeta> = {},
): SeoMeta {
  return { title, description, ...extras }
}

function programSeo(program: ProgramDetail): SeoMeta {
  const ages = program.ages ? ` (${program.ages})` : ''
  const locale = 'Allendale & Midland Park, NJ'
  const snippet = program.description.length > 140
    ? `${program.description.slice(0, 137).trim()}…`
    : program.description
  return meta(
    `${program.name}${ages} in ${locale} | ${brand}`,
    `${program.tagline} ${snippet} Request a free class at ${brand}.`,
  )
}

/** Static route metadata (unique title + description per public page). */
export const SEO: Record<string, SeoMeta> = {
  '/': meta(
    `${brand} | Martial Arts & Taekwondo in Allendale & Midland Park, NJ`,
    'Confidence-building Taekwondo and martial arts for kids, teens, and adults in Allendale and Midland Park, NJ. Try a class for free at United Black Belt Academy.',
  ),
  '/programs/children': meta(
    `Kids Martial Arts Classes in Allendale & Midland Park, NJ | ${brand}`,
    'Children’s Taekwondo in Bergen County — Tiny Tigers, Junior Tigers, and Teen Martial Arts build confidence, focus, and respect. Book a free trial class.',
  ),
  '/programs/adult': meta(
    `Adult Martial Arts Classes in Allendale & Midland Park, NJ | ${brand}`,
    'Adult Taekwondo, family training, Olympic sparring, and self-defense in Allendale and Midland Park, NJ. Fitness, focus, and a welcoming community — try a free class.',
  ),
  '/just-4-kids': meta(
    `Kids Birthday Parties, Summer Camp & Parents’ Night Out | ${brand}`,
    'Martial arts birthday parties, summer camp, and Parents’ Night Out for families in Bergen County, NJ. Fun, supervised activities beyond regular classes.',
  ),
  '/just-4-kids/birthday-parties': meta(
    `Martial Arts Birthday Parties in Allendale & Midland Park, NJ | ${brand}`,
    'Host a martial arts birthday party with games, board breaking, and stress-free fun. Inquire about availability at United Black Belt Academy in Bergen County, NJ.',
  ),
  '/just-4-kids/summer-camp': meta(
    `Martial Arts Summer Camp in Bergen County, NJ | ${brand}`,
    'Action-packed martial arts summer camp for kids — themes, games, and confidence-building fun. Ask about dates and enrollment at United Black Belt Academy.',
  ),
  '/just-4-kids/parents-night-out': meta(
    `Parents’ Night Out in Allendale & Midland Park, NJ | ${brand}`,
    'Supervised Friday night fun for kids while parents enjoy a night out. Inquire about upcoming Parents’ Night Out dates at United Black Belt Academy.',
  ),
  '/follow-us': meta(
    `Follow Us on Instagram & Facebook | ${brand}`,
    'Stay connected with United Black Belt Academy on Instagram and Facebook for class moments, events, and community updates from our NJ schools.',
  ),
  '/follow-us/instagram': meta(
    `Instagram | ${brand}`,
    'See recent Instagram posts from United Black Belt Academy — life on the mat, promotions, and family moments from our Bergen County schools.',
  ),
  '/follow-us/facebook': meta(
    `Facebook | ${brand}`,
    'See recent Facebook updates from United Black Belt Academy — events, camp news, and community highlights from Allendale and Midland Park, NJ.',
  ),
  '/contact': meta(
    `Contact & Free Class Request | ${brand}`,
    'Contact United Black Belt Academy in Allendale or Midland Park, NJ. Request a free class, ask about programs, or get directions to a location near you.',
  ),
  '/locations/allendale': meta(
    `Taekwondo & Martial Arts in Allendale, NJ | ${brand}`,
    'Train at United Black Belt Academy in Allendale, NJ — kids, teen, and adult martial arts with a free trial class. Confirm hours and enrollment details on this page.',
  ),
  '/locations/midland-park': meta(
    `Taekwondo & Martial Arts in Midland Park, NJ | ${brand}`,
    'Train at United Black Belt Academy in Midland Park, NJ — family-friendly martial arts for kids, teens, and adults. Request a free class to get started.',
  ),
  '/privacy': meta(
    `Privacy Policy | ${brand}`,
    'Privacy policy for United Black Belt Academy — how we handle information submitted through our website forms and contact requests.',
  ),
  '/terms': meta(
    `Terms and Conditions | ${brand}`,
    'Terms and conditions for using the United Black Belt Academy website and participating in academy programs and events.',
  ),
}

/** @deprecated Prefer entries on `SEO` — kept as an alias for tests/docs. */
export const LOCATION_SEO: Record<string, SeoMeta> = {
  '/locations/allendale': SEO['/locations/allendale'],
  '/locations/midland-park': SEO['/locations/midland-park'],
}

const NOT_FOUND_SEO: SeoMeta = meta(
  `Page Not Found | ${brand}`,
  'The page you requested is not available. Visit United Black Belt Academy online to explore programs, locations, and free-class options.',
  { robots: 'noindex, nofollow', indexable: false },
)

/** Program detail paths derived from PROGRAM_DETAILS. */
export function programSeoPath(slug: string): string {
  return `/programs/${slug}`
}

export function getStaticSeo(pathname: string): SeoMeta | undefined {
  return SEO[pathname]
}

export function resolveSeoMeta(pathname: string): SeoMeta {
  const staticMeta = SEO[pathname]
  if (staticMeta) return { ...staticMeta, canonicalPath: staticMeta.canonicalPath ?? pathname }

  if (pathname.startsWith('/programs/')) {
    const slug = pathname.replace('/programs/', '')
    // Category overview routes are in SEO; only unmatched slugs hit getProgram.
    const program = getProgram(slug)
    if (program) {
      const generated = programSeo(program)
      return { ...generated, canonicalPath: pathname }
    }
  }

  return { ...NOT_FOUND_SEO, canonicalPath: pathname }
}

export function resolveSeo(pathname: string): ResolvedSeo {
  const meta = resolveSeoMeta(pathname)
  const canonicalPath = meta.canonicalPath ?? pathname
  const title = meta.title
  const description = meta.description
  const ogTitle = meta.ogTitle ?? title
  const ogDescription = meta.ogDescription ?? description
  const ogImage = absoluteAssetUrl(meta.ogImage ?? DEFAULT_OG_IMAGE_PATH)
  const ogUrl = absoluteUrl(canonicalPath === '/' ? '/' : canonicalPath)
  const twitterTitle = meta.twitterTitle ?? ogTitle
  const twitterDescription = meta.twitterDescription ?? ogDescription
  const twitterImage = absoluteAssetUrl(meta.twitterImage ?? meta.ogImage ?? DEFAULT_OG_IMAGE_PATH)

  return {
    title,
    description,
    canonical: ogUrl,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType: meta.ogType ?? 'website',
    twitterCard: meta.twitterCard ?? 'summary_large_image',
    twitterTitle,
    twitterDescription,
    twitterImage,
    robots: meta.robots,
  }
}

/**
 * Indexable paths for sitemap generation (static pages + program details).
 * Location landings are included via `SEO` once those routes ship.
 */
export function getIndexablePaths(): string[] {
  const staticPaths = Object.entries(SEO)
    .filter(([, value]) => value.indexable !== false)
    .map(([path]) => path)

  const programPaths = PROGRAM_DETAILS.map((p) => programSeoPath(p.slug))

  return Array.from(new Set([...staticPaths, ...programPaths])).sort((a, b) => {
    if (a === '/') return -1
    if (b === '/') return 1
    return a.localeCompare(b)
  })
}
