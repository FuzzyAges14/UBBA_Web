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
 * Sourced from facebook.com/ubbaad (United Black Belt Academy / former
 * Holmgren's Black Belt Academy at the Allendale dojang — Midland Park was
 * listed as Black Belt America). Vertical / portrait posts are excluded.
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
    alt: 'Leadership students and instructors posing in the United Black Belt Academy dojang',
  },
  {
    src: '/media/authentic/hero-slides/02-group-testing-class.jpg',
    webp: '/media/authentic/hero-slides/02-group-testing-class.webp',
    srcSet:
      '/media/authentic/hero-slides/02-group-testing-class-1280.jpg 1280w, /media/authentic/hero-slides/02-group-testing-class.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/02-group-testing-class-1280.webp 1280w, /media/authentic/hero-slides/02-group-testing-class.webp 1920w',
    width: 1920,
    height: 1441,
    alt: 'Students and instructor posing together after class in the dojang',
  },
  {
    src: '/media/authentic/hero-slides/03-group-fighting-stance.jpg',
    webp: '/media/authentic/hero-slides/03-group-fighting-stance.webp',
    srcSet:
      '/media/authentic/hero-slides/03-group-fighting-stance-1280.jpg 1280w, /media/authentic/hero-slides/03-group-fighting-stance.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/03-group-fighting-stance-1280.webp 1280w, /media/authentic/hero-slides/03-group-fighting-stance.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Kids class lined up in fighting stance with their instructor',
  },
  {
    src: '/media/authentic/hero-slides/04-group-crossed-arms.jpg',
    webp: '/media/authentic/hero-slides/04-group-crossed-arms.webp',
    srcSet:
      '/media/authentic/hero-slides/04-group-crossed-arms-1280.jpg 1280w, /media/authentic/hero-slides/04-group-crossed-arms.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/04-group-crossed-arms-1280.webp 1280w, /media/authentic/hero-slides/04-group-crossed-arms.webp 1920w',
    width: 1920,
    height: 1439,
    alt: 'Students and instructor posing with arms crossed on the mats',
  },
  {
    src: '/media/authentic/hero-slides/05-group-belt-line.jpg',
    webp: '/media/authentic/hero-slides/05-group-belt-line.webp',
    srcSet:
      '/media/authentic/hero-slides/05-group-belt-line-1280.jpg 1280w, /media/authentic/hero-slides/05-group-belt-line.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/05-group-belt-line-1280.webp 1280w, /media/authentic/hero-slides/05-group-belt-line.webp 1920w',
    width: 1920,
    height: 1439,
    alt: 'Group of students posing in a line after belt testing',
  },
  {
    src: '/media/authentic/hero-slides/06-group-junior-black-belts.jpg',
    webp: '/media/authentic/hero-slides/06-group-junior-black-belts.webp',
    srcSet:
      '/media/authentic/hero-slides/06-group-junior-black-belts-1280.jpg 1280w, /media/authentic/hero-slides/06-group-junior-black-belts.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/06-group-junior-black-belts-1280.webp 1280w, /media/authentic/hero-slides/06-group-junior-black-belts.webp 1920w',
    width: 1920,
    height: 1440,
    alt: 'Junior black belt candidates posing together in the dojang',
  },
  {
    src: '/media/authentic/hero-slides/07-group-instructor-students.jpg',
    webp: '/media/authentic/hero-slides/07-group-instructor-students.webp',
    srcSet:
      '/media/authentic/hero-slides/07-group-instructor-students-1280.jpg 1280w, /media/authentic/hero-slides/07-group-instructor-students.jpg 1920w',
    webpSrcSet:
      '/media/authentic/hero-slides/07-group-instructor-students-1280.webp 1280w, /media/authentic/hero-slides/07-group-instructor-students.webp 1920w',
    width: 1920,
    height: 1438,
    alt: 'Instructor with students posing after junior black belt testing',
  },
]

/** Hero slideshow interval (ms) between fade transitions. */
export const HERO_SLIDE_INTERVAL_MS = 5500
