/**
 * Caption-driven authentic Instagram media from @ubbatkd.
 *
 * Placement rule: use the Instagram caption (see public/media/authentic/MANIFEST.json)
 * to decide where an asset may appear. Do not put promo flyers or schedule graphics
 * into program / camp photo slots.
 */

export type AuthenticStill = {
  src: string
  /** Short, placement-safe alt text derived from the caption theme */
  alt: string
  shortcode: string
  permalink: string
  /** Where this asset is allowed */
  placement: readonly AuthenticPlacement[]
}

export type AuthenticPlacement =
  | 'summer-camp-page'
  | 'just-4-kids-camp-tile'
  | 'social-feed'
  | 'social-feed-only'

/** Back-to-school promo flyer — social / promo surfaces only. */
export const PROMO_BACK_TO_SCHOOL: AuthenticStill = {
  src: '/media/authentic/promo-back-to-school.jpg',
  alt: 'UBBA Back-to-School Special promotion graphic',
  shortcode: 'DcQ3NEmH08s',
  permalink: 'https://www.instagram.com/p/DcQ3NEmH08s/',
  placement: ['social-feed-only'],
}

/** Fall BBC special-training schedule announcement — social feed only. */
export const ANNOUNCEMENT_FALL_SCHEDULE: AuthenticStill = {
  src: '/media/authentic/announcement-fall-schedule.jpg',
  alt: 'UBBA fall schedule announcement graphic for special training',
  shortcode: 'Db84LxLnwZu',
  permalink: 'https://www.instagram.com/p/Db84LxLnwZu/',
  placement: ['social-feed-only'],
}

/**
 * Birthday caption (“Happy Birthday…”) with a kids board-break photo.
 * Keep on social feed only — do not treat as Birthday Parties package photography.
 */
export const KIDS_BOARD_BREAK_SOCIAL: AuthenticStill = {
  src: '/media/authentic/kids-board-break-dojang.jpg',
  alt: 'Young students board-breaking in the UBBA dojang',
  shortcode: 'DcE5gENlP5d',
  permalink: 'https://www.instagram.com/p/DcE5gENlP5d/',
  placement: ['social-feed-only'],
}

/** Summer camp stills whose captions clearly describe camp activities. */
export const SUMMER_CAMP_STILLS: AuthenticStill[] = [
  {
    src: '/media/authentic/summer-camp-group-dojang.jpg',
    alt: 'UBBA summer campers training together in the dojang',
    shortcode: 'Db7Cyeug7Sq',
    permalink: 'https://www.instagram.com/p/Db7Cyeug7Sq/',
    placement: ['summer-camp-page', 'just-4-kids-camp-tile', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-smiles.jpg',
    alt: 'Campers smiling as another week of UBBA Summer Camp kicks off',
    shortcode: 'Db3bLEPzP5z',
    permalink: 'https://www.instagram.com/p/Db3bLEPzP5z/',
    placement: ['summer-camp-page', 'just-4-kids-camp-tile', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-zoo-trip.jpg',
    alt: 'UBBA Summer Camp zoo field trip with animals and playground fun',
    shortcode: 'DcPpMxqACgX',
    permalink: 'https://www.instagram.com/p/DcPpMxqACgX/',
    placement: ['summer-camp-page', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-crafts-water.jpg',
    alt: 'Campers enjoying water games and crafts at UBBA Summer Camp',
    shortcode: 'DcNH2aGAVOr',
    permalink: 'https://www.instagram.com/p/DcNH2aGAVOr/',
    placement: ['summer-camp-page', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-animals.jpg',
    alt: 'Hands-on animal experience day at UBBA Summer Camp',
    shortcode: 'DcKJt4MgCst',
    permalink: 'https://www.instagram.com/p/DcKJt4MgCst/',
    placement: ['summer-camp-page', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-fitness.jpg',
    alt: 'Campers building strength and teamwork with fitness challenges',
    shortcode: 'DcBlRJJgAfB',
    permalink: 'https://www.instagram.com/p/DcBlRJJgAfB/',
    placement: ['summer-camp-page', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-playground.jpg',
    alt: 'UBBA Summer Camp playground day with active outdoor play',
    shortcode: 'DcAAOqcgJL6',
    permalink: 'https://www.instagram.com/p/DcAAOqcgJL6/',
    placement: ['summer-camp-page', 'social-feed'],
  },
  {
    src: '/media/authentic/summer-camp-field-trip.jpg',
    alt: 'Summer Camp field trip to Swingsets & Playgrounds',
    shortcode: 'Db9rn7oADMA',
    permalink: 'https://www.instagram.com/p/Db9rn7oADMA/',
    placement: ['summer-camp-page', 'social-feed'],
  },
]

/** Primary feature still for the Summer Camp page (training + camp energy). */
export const SUMMER_CAMP_FEATURE = SUMMER_CAMP_STILLS[0]

/** Hub tile for Just 4 Kids → Summer Camp only. */
export const SUMMER_CAMP_TILE = SUMMER_CAMP_STILLS[1]

export type AuthenticVideo = {
  src: string
  poster: string
  title: string
  shortcode: string
  permalink: string
}

/** Short web encodes from @ubbatkd camp reels (captions mention Summer Camp). */
export const SUMMER_CAMP_VIDEOS: AuthenticVideo[] = [
  {
    src: '/media/authentic/videos/web/summer-camp-kickoff.mp4',
    poster: '/media/authentic/summer-camp-smiles.jpg',
    title: 'Week kickoff — big energy and smiles at UBBA Summer Camp',
    shortcode: 'Db3bLEPzP5z',
    permalink: 'https://www.instagram.com/p/Db3bLEPzP5z/',
  },
  {
    src: '/media/authentic/videos/web/camp-training-water-master-lee.mp4',
    poster: '/media/authentic/summer-camp-group-dojang.jpg',
    title: 'Training hard, then water-gun fun with Master Lee',
    shortcode: 'Db7Cyeug7Sq',
    permalink: 'https://www.instagram.com/p/Db7Cyeug7Sq/',
  },
  {
    src: '/media/authentic/videos/web/summer-camp-zoo.mp4',
    poster: '/media/authentic/summer-camp-zoo-trip.jpg',
    title: 'Zoo day field trip at UBBA Summer Camp',
    shortcode: 'DcPpMxqACgX',
    permalink: 'https://www.instagram.com/p/DcPpMxqACgX/',
  },
]

/** Intrinsic sizes for CLS (matches committed JPEGs). */
export const AUTHENTIC_DIMENSIONS: Record<string, { width: number; height: number }> = {
  '/media/authentic/promo-back-to-school.jpg': { width: 1080, height: 1080 },
  '/media/authentic/promo-back-to-school-alt.jpg': { width: 1080, height: 1080 },
  '/media/authentic/announcement-fall-schedule.jpg': { width: 507, height: 666 },
  '/media/authentic/kids-board-break-dojang.jpg': { width: 1080, height: 810 },
  '/media/authentic/summer-camp-group-dojang.jpg': { width: 1080, height: 1921 },
  '/media/authentic/summer-camp-smiles.jpg': { width: 720, height: 1280 },
  '/media/authentic/summer-camp-zoo-trip.jpg': { width: 1080, height: 1921 },
  '/media/authentic/summer-camp-crafts-water.jpg': { width: 1080, height: 1921 },
  '/media/authentic/summer-camp-animals.jpg': { width: 720, height: 1280 },
  '/media/authentic/summer-camp-fitness.jpg': { width: 1080, height: 1921 },
  '/media/authentic/summer-camp-playground.jpg': { width: 1080, height: 1921 },
  '/media/authentic/summer-camp-field-trip.jpg': { width: 1080, height: 1921 },
}

export function authenticSrcSetFor(src: string): string | undefined {
  if (!src.startsWith('/media/authentic/') || !src.endsWith('.jpg')) return undefined
  const stem = src.slice(0, -4)
  const dims = AUTHENTIC_DIMENSIONS[src]
  const fullW = dims?.width ?? 1080
  return `${stem}-640.jpg 640w, ${stem}-960.jpg 960w, ${src} ${fullW}w`
}

/**
 * Landscape group photos for the home hero fade slideshow.
 * Recent (2024–2026) United Black Belt Academy photos from facebook.com/ubbaad
 * and facebook.com/ubbamp under current ownership (Sanghyun Lee). Pre-2024
 * Holmgren-era albums are excluded. Vertical / portrait posts are excluded.
 */
export type HeroSlide = {
  src: string
  webp: string
  srcSet: string
  webpSrcSet: string
  width: number
  height: number
  alt: string
}

export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    src: '/media/authentic/hero-slides/01-group-leadership.jpg',
    webp: '/media/authentic/hero-slides/01-group-leadership.webp',
    srcSet:
      '/media/authentic/hero-slides/01-group-leadership-1280.jpg 1280w, /media/authentic/hero-slides/01-group-leadership.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/01-group-leadership-1280.webp 1280w, /media/authentic/hero-slides/01-group-leadership.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Leadership students and instructors posing at United Black Belt Academy',
  },
  {
    src: '/media/authentic/hero-slides/02-group-fathers-day.jpg',
    webp: '/media/authentic/hero-slides/02-group-fathers-day.webp',
    srcSet:
      '/media/authentic/hero-slides/02-group-fathers-day-1280.jpg 1280w, /media/authentic/hero-slides/02-group-fathers-day.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/02-group-fathers-day-1280.webp 1280w, /media/authentic/hero-slides/02-group-fathers-day.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Families and students gathered for Father’s Day at United Black Belt Academy, 2025',
  },
  {
    src: '/media/authentic/hero-slides/03-group-class-partners.jpg',
    webp: '/media/authentic/hero-slides/03-group-class-partners.webp',
    srcSet:
      '/media/authentic/hero-slides/03-group-class-partners-1280.jpg 1280w, /media/authentic/hero-slides/03-group-class-partners.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/03-group-class-partners-1280.webp 1280w, /media/authentic/hero-slides/03-group-class-partners.webp 1920w',
    width: 1920,
    height: 1441,
    alt: 'Students and parents training together in a partner exercise at UBBA, 2025',
  },
  {
    src: '/media/authentic/hero-slides/04-group-winter-camp.jpg',
    webp: '/media/authentic/hero-slides/04-group-winter-camp.webp',
    srcSet:
      '/media/authentic/hero-slides/04-group-winter-camp-1280.jpg 1280w, /media/authentic/hero-slides/04-group-winter-camp.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/04-group-winter-camp-1280.webp 1280w, /media/authentic/hero-slides/04-group-winter-camp.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Winter Camp students posing together in the UBBA dojang, 2025',
  },
  {
    src: '/media/authentic/hero-slides/05-group-camp-line.jpg',
    webp: '/media/authentic/hero-slides/05-group-camp-line.webp',
    srcSet:
      '/media/authentic/hero-slides/05-group-camp-line-1280.jpg 1280w, /media/authentic/hero-slides/05-group-camp-line.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/05-group-camp-line-1280.webp 1280w, /media/authentic/hero-slides/05-group-camp-line.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Winter Camp kids lined up under the United Black Belt Academy logo, 2025',
  },
  {
    src: '/media/authentic/hero-slides/06-group-camp-friends.jpg',
    webp: '/media/authentic/hero-slides/06-group-camp-friends.webp',
    srcSet:
      '/media/authentic/hero-slides/06-group-camp-friends-1280.jpg 1280w, /media/authentic/hero-slides/06-group-camp-friends.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/06-group-camp-friends-1280.webp 1280w, /media/authentic/hero-slides/06-group-camp-friends.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Winter Camp students posing as a group in the dojang, 2025',
  },
  {
    src: '/media/authentic/hero-slides/07-group-class-action.jpg',
    webp: '/media/authentic/hero-slides/07-group-class-action.webp',
    srcSet:
      '/media/authentic/hero-slides/07-group-class-action-1280.jpg 1280w, /media/authentic/hero-slides/07-group-class-action.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/07-group-class-action-1280.webp 1280w, /media/authentic/hero-slides/07-group-class-action.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Kids class running drills together on the mats at United Black Belt Academy, 2025',
  },
]

/** Hero slideshow interval (ms) between fade transitions. */
export const HERO_SLIDE_INTERVAL_MS = 5500
