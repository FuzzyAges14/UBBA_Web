import { SOCIAL_PROFILES, type SocialProfileSlug } from './contact'
import { heroVideoMp4, heroVideoWebm } from '../lib/mediaEnv'

export const SITE = {
  name: 'United Black Belt Academy',
  shortName: 'United Black Belt Academy',
  tagline: 'Confidence Building Martial Arts',
  primaryCta: 'Try A Class For Free!',
  owner: 'Sanghyun Lee',
  // Glen Rock is a new location being added — visible by default.
  showGlenRock: true,
}

/* ---------------------------------------------------------------------------
 * Media (temporary commercially-licensed stock until authentic UBBA shoot).
 * Self-hosted under public/media/. Licenses: docs/IMAGE_SOURCES.md.
 * Performance: docs/PERFORMANCE.md. Agent 2 package: docs/MEDIA_CANDIDATES.md.
 * ------------------------------------------------------------------------- */

export const IMAGES = {
  /** Self-hosted hero loop (Pexels 7045155). Override via VITE_HERO_VIDEO_*. */
  heroVideo: heroVideoMp4('/media/hero.mp4'),
  heroPoster: '/media/hero-poster.jpg',
  /**
   * OWNER PHOTO REQUIRED — DO NOT SUBSTITUTE WITH MISLEADING STOCK.
   * UI uses Placeholder until an authentic Sanghyun Lee portrait is supplied.
   */
  instructorPortrait: '/media/owner-portrait.jpg',
  action: '/media/adult-action.jpg',
  kidsKicks: '/media/kids-kicks.jpg',
  kidsGroup: '/media/kids-group.jpg',
  teenSpar: '/media/teen-training.jpg',
  beltTest: '/media/respect-bow.jpg',
  ogDefault: '/media/og-default.jpg',
} as const

/** Structured hero sources for WebM + MP4 delivery and poster LCP. */
export const HERO_MEDIA = {
  poster: IMAGES.heroPoster,
  posterWebp: '/media/hero-poster.webp',
  posterMobile: '/media/hero-poster-mobile.jpg',
  posterMobileWebp: '/media/hero-poster-mobile.webp',
  mp4: IMAGES.heroVideo,
  webm: heroVideoWebm('/media/hero.webm'),
  productionMp4Path: '/media/hero.mp4',
  productionWebmPath: '/media/hero.webm',
} as const

/** Intrinsic sizes for CLS-safe <img> rendering (matches committed files). */
export const IMAGE_DIMENSIONS = {
  heroPoster: { width: 1920, height: 1080 },
  heroPosterMobile: { width: 960, height: 1200 },
  action: { width: 1920, height: 1080 },
  kidsKicks: { width: 1280, height: 720 },
  kidsGroup: { width: 1280, height: 720 },
  teenSpar: { width: 1280, height: 720 },
  beltTest: { width: 1920, height: 1080 },
  instructorPortrait: { width: 1080, height: 1920 },
  ogDefault: { width: 1200, height: 630 },
  logo: { width: 300, height: 282 },
} as const

/** Responsive JPEG srcsets (WebP counterparts share the same widths). */
export const IMAGE_SRCSETS = {
  kidsKicks:
    '/media/kids-kicks-640.jpg 640w, /media/kids-kicks-960.jpg 960w, /media/kids-kicks-1280.jpg 1280w',
  kidsGroup:
    '/media/kids-group-640.jpg 640w, /media/kids-group-960.jpg 960w, /media/kids-group-1280.jpg 1280w',
  teenSpar:
    '/media/teen-training-640.jpg 640w, /media/teen-training-960.jpg 960w, /media/teen-training-1280.jpg 1280w',
  action:
    '/media/adult-action-640.jpg 640w, /media/adult-action-960.jpg 960w, /media/adult-action-1280.jpg 1280w, /media/adult-action-1920.jpg 1920w',
  beltTest:
    '/media/respect-bow-640.jpg 640w, /media/respect-bow-960.jpg 960w, /media/respect-bow-1280.jpg 1280w, /media/respect-bow-1920.jpg 1920w',
  heroPoster:
    '/media/hero-poster-960.jpg 960w, /media/hero-poster-1280.jpg 1280w, /media/hero-poster.jpg 1920w',
} as const

export function imageDimensionsFor(src: string): { width: number; height: number } {
  switch (src) {
    case IMAGES.action:
      return IMAGE_DIMENSIONS.action
    case IMAGES.kidsKicks:
      return IMAGE_DIMENSIONS.kidsKicks
    case IMAGES.kidsGroup:
      return IMAGE_DIMENSIONS.kidsGroup
    case IMAGES.teenSpar:
      return IMAGE_DIMENSIONS.teenSpar
    case IMAGES.beltTest:
      return IMAGE_DIMENSIONS.beltTest
    case IMAGES.heroPoster:
      return IMAGE_DIMENSIONS.heroPoster
    case IMAGES.instructorPortrait:
      return IMAGE_DIMENSIONS.instructorPortrait
    case IMAGES.ogDefault:
      return IMAGE_DIMENSIONS.ogDefault
    default:
      return IMAGE_DIMENSIONS.heroPoster
  }
}

export function imageSrcSetFor(src: string): string | undefined {
  switch (src) {
    case IMAGES.action:
      return IMAGE_SRCSETS.action
    case IMAGES.kidsKicks:
      return IMAGE_SRCSETS.kidsKicks
    case IMAGES.kidsGroup:
      return IMAGE_SRCSETS.kidsGroup
    case IMAGES.teenSpar:
      return IMAGE_SRCSETS.teenSpar
    case IMAGES.beltTest:
      return IMAGE_SRCSETS.beltTest
    case IMAGES.heroPoster:
      return IMAGE_SRCSETS.heroPoster
    default:
      return undefined
  }
}

export type NavLink = { label: string; to: string }

/** Constrained program identifiers used across cards, glyphs, and detail pages. */
export type ProgramId =
  | 'tiny-tigers'
  | 'junior-tigers'
  | 'teen-martial-arts'
  | 'adult-martial-arts'
  | 'adult-program'
  | 'family-programs'
  | 'olympic-sparring'
  | 'swat-team'
  | 'self-defense'
  | 'weapons-class'

export type ProgramCategory = 'Children' | 'Adult & Family'

/** Decorative glyphs for program discovery cards (presentation, not SEO content). */
export const PROGRAM_GLYPHS: Partial<Record<ProgramId, string>> = {
  'tiny-tigers': '🐯',
  'junior-tigers': '🥋',
  'teen-martial-arts': '⚡',
  'adult-martial-arts': '💪',
  'adult-program': '💪',
  'family-programs': '👪',
  'olympic-sparring': '🥇',
  'swat-team': '🎯',
  'self-defense': '🛡️',
  'weapons-class': '🥋',
}

export const NAV: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: "Children's Programs", to: '/programs/children' },
  { label: 'Adult Programs', to: '/programs/adult' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS: NavLink[] = [
  { label: 'About Us', to: '/#owner' },
  { label: 'Allendale Location', to: '/locations/allendale' },
  { label: 'Midland Park Location', to: '/locations/midland-park' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Trial Offer', to: '/contact' },
  { label: "Children's Programs", to: '/programs/children' },
  { label: 'Adult Programs', to: '/programs/adult' },
  { label: 'Just 4 Kids', to: '/just-4-kids' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms and Conditions', to: '/terms' },
]

export type ProgramCard = {
  id: ProgramId
  title: string
  ages?: string
  blurb: string
  /** slug of the detail page this card links to */
  slug: string
  image?: string
}

/** Homepage “You Belong Here” discovery tiles. */
export type AudienceFeature = {
  title: string
  text: string
  to: string
  icon: string
  cta: string
}

export const HOME_AUDIENCE_FEATURES: AudienceFeature[] = [
  {
    title: "Children's Classes",
    text: 'Confidence, listening, discipline, respect, and friendships — the foundation for confident kids.',
    to: '/programs/children',
    icon: '🧒',
    cta: "Explore Children's Programs",
  },
  {
    title: 'Adult Classes',
    text: 'Fitness, self-defense, stress relief, and real community for every level.',
    to: '/programs/adult',
    icon: '💪',
    cta: 'Explore Adult Programs',
  },
  {
    title: 'Workshops & Special Events',
    text: 'Belt testing, tournaments, seminars, camps, and family events all year round.',
    to: '/just-4-kids',
    icon: '🎉',
    cta: 'See Just 4 Kids',
  },
]

/** Checklist bullets beside the homepage free-class form. */
export const TRIAL_HIGHLIGHTS = [
  'Kids, teens, and adult programs',
  'Allendale & Midland Park locations',
  'Beginners welcome — no experience required',
] as const

export const HOME_PROGRAM_CARDS: ProgramCard[] = [
  {
    id: 'tiny-tigers',
    slug: 'tiny-tigers',
    title: 'Tiny Tigers',
    ages: 'Ages 3-5',
    image: IMAGES.kidsKicks,
    blurb:
      'A playful first step into martial arts that builds focus, listening skills, and confidence through age-appropriate games and drills.',
  },
  {
    id: 'junior-tigers',
    slug: 'junior-tigers',
    title: 'Junior Tigers',
    ages: 'Ages 6-10',
    image: IMAGES.kidsGroup,
    blurb:
      'Structured classes where kids sharpen coordination, discipline, and self-control while making new friends and earning belts.',
  },
  {
    id: 'teen-martial-arts',
    slug: 'teen-martial-arts',
    title: 'Teen Martial Arts',
    ages: 'Ages 11-17',
    image: IMAGES.teenSpar,
    blurb:
      'A positive outlet that channels energy into fitness, resilience, and leadership as teens build real self-defense skills.',
  },
  {
    id: 'adult-martial-arts',
    slug: 'adult-program',
    title: 'Adult Martial Arts',
    ages: 'Ages 18+',
    image: IMAGES.action,
    blurb:
      'Get in the best shape of your life while learning practical self-defense in a welcoming, no-ego training environment.',
  },
]

export const CHILDREN_PROGRAMS: ProgramCard[] = [
  {
    id: 'tiny-tigers',
    slug: 'tiny-tigers',
    title: 'Tiny Tigers',
    ages: 'Ages 3-5',
    image: IMAGES.kidsKicks,
    blurb:
      'Our youngest students develop focus, balance, and confidence through fun, high-energy drills designed for little movers.',
  },
  {
    id: 'junior-tigers',
    slug: 'junior-tigers',
    title: 'Junior Tigers',
    ages: 'Ages 6-10',
    image: IMAGES.kidsGroup,
    blurb:
      'Kids build discipline, respect, and coordination while progressing through a clear belt curriculum that rewards effort.',
  },
  {
    id: 'teen-martial-arts',
    slug: 'teen-martial-arts',
    title: 'Teen Martial Arts',
    ages: 'Ages 11-17',
    image: IMAGES.teenSpar,
    blurb:
      'Teens grow stronger and more confident, learning practical self-defense and leadership that carries into everyday life.',
  },
]

export const ADULT_PROGRAMS: ProgramCard[] = [
  {
    id: 'adult-program',
    slug: 'adult-program',
    title: 'Adult Program',
    image: IMAGES.action,
    blurb:
      'A full-body workout and practical martial arts training for every fitness level, with zero intimidation and plenty of support.',
  },
  {
    id: 'family-programs',
    slug: 'family-programs',
    title: 'Family Programs',
    image: IMAGES.kidsGroup,
    blurb:
      'Train together and grow together. Parents and kids share the mat, build healthy habits, and cheer each other on.',
  },
  {
    id: 'olympic-sparring',
    slug: 'olympic-sparring',
    title: 'Olympic Sparring',
    image: IMAGES.teenSpar,
    blurb:
      'Sport-focused sparring that develops speed, timing, and strategy for students who want to compete and level up.',
  },
  {
    id: 'swat-team',
    slug: 'swat-team',
    title: 'SWAT Team',
    image: IMAGES.action,
    blurb:
      'Our elite training group for dedicated students ready to push their skills, conditioning, and technique to the next level.',
  },
  {
    id: 'self-defense',
    slug: 'self-defense',
    title: 'Self Defense',
    image: IMAGES.beltTest,
    blurb:
      'Real-world, practical techniques that help you stay aware, stay calm, and protect yourself and your loved ones.',
  },
  {
    id: 'weapons-class',
    slug: 'weapons-class',
    title: 'Weapons Class',
    image: IMAGES.beltTest,
    blurb:
      'Traditional weapons training that builds precision, discipline, and focus while adding an exciting new challenge.',
  },
]

export type EventInquiryIntent = 'birthday' | 'summer-camp' | 'parents-night-out'

export type Faq = { q: string; a: string }

export type Just4KidsOffering = {
  id: string
  title: string
  tag: string
  blurb: string
  to: string
  icon: string
  ctaLabel: string
}

/** Hub tiles for the Just 4 Kids overview page. */
export const JUST_4_KIDS: Just4KidsOffering[] = [
  {
    id: 'birthday-parties',
    title: 'Birthday Parties',
    tag: 'All ages',
    blurb:
      'Instructor-led martial arts birthday parties with games, board breaks, and cool moves — inquire for dates, capacity, and current package details.',
    to: '/just-4-kids/birthday-parties',
    icon: '🎂',
    ctaLabel: 'Plan a Party',
  },
  {
    id: 'summer-camp',
    title: 'Summer / Day Camp',
    tag: 'Ages 3-12',
    blurb:
      'Themes, crafts, games, and martial arts for ages 3–12 — ask about this season’s dates and openings at your preferred school.',
    to: '/just-4-kids/summer-camp',
    icon: '☀️',
    ctaLabel: 'Reserve a Spot',
  },
  {
    id: 'parents-night-out',
    title: "Parents' Night Out",
    tag: 'Monthly Friday',
    blurb:
      'Supervised games, laughter, and pizza on a monthly Friday. Open to non-students — inquire for the next date at your school.',
    to: '/just-4-kids/parents-night-out',
    icon: '🍕',
    ctaLabel: 'Save a Spot',
  },
]

export type Just4KidsDetail = {
  slug: string
  name: string
  tag: string
  heroTitle: string
  heroIntro: string
  kidsWill: { label: string; icon: string }[]
  activities: string[]
  includes: string[]
  parentsSupply?: string[]
  whatToBring?: string[]
  weekNotes?: string[]
  faqs: Faq[]
  formIntent: EventInquiryIntent
  ctaLabel: string
  mediaIcon: string
}

export const JUST_4_KIDS_DETAILS: Record<string, Just4KidsDetail> = {
  'birthday-parties': {
    slug: 'birthday-parties',
    name: 'Birthday Parties',
    tag: 'All ages',
    heroTitle: 'The most exciting birthday party ever',
    heroIntro:
      'Host a martial arts birthday party at United Black Belt Academy — instructor-led games, cool moves, and board-breaking fun while parents relax. Available for kids of all ages; no experience required.',
    kidsWill: [
      { label: 'Break boards', icon: '💥' },
      { label: 'Learn cool martial arts moves', icon: '🥋' },
      { label: 'Have a kicking good time', icon: '🎉' },
    ],
    activities: [
      'Martial arts themed games & mini lesson',
      'Movie-style moves under instructor supervision',
      'Board breaking for that big wow moment',
      'Cake-cutting ceremony (sword optional with staff)',
      'Opening of gifts & group photo',
    ],
    includes: [
      'Instructor-led martial arts games and activities',
      'Supervised party flow so parents can relax',
      'Board-breaking experience for guests',
      'Option to customize activities for your child',
      'Help choosing Allendale, Midland Park, or Glen Rock when you inquire',
    ],
    parentsSupply: [
      'Table covers, plates & utensils',
      'Pizza (or other party food)',
      'Birthday cake',
    ],
    faqs: [
      {
        q: 'Who are birthday parties for?',
        a: 'Families celebrating a child’s birthday who want an active, supervised party with martial arts games. Guests do not need to be UBBA students.',
      },
      {
        q: 'Do my child or guests need martial arts experience?',
        a: 'Absolutely not. No experience — and no uniform — is necessary. Comfortable clothes are perfect.',
      },
      {
        q: 'Will kids be fighting each other?',
        a: 'No. Everything is instructor-led and focused on fun games, pads, and boards — not sparring each other.',
      },
      {
        q: 'What is the inquiry form for?',
        a: 'The form tells us your preferred date, guest count range, location interest, and how to reach you. It is not a final booking — our team follows up to confirm availability, package details, and pricing.',
      },
      {
        q: 'What still needs to be confirmed?',
        a: 'Party length, guest capacity, exact inclusions, upgrades, and pricing vary and require owner confirmation. We share current details when we call you back.',
      },
      {
        q: 'Do guests need a waiver?',
        a: 'Yes — every child needs a waiver signed by a parent or guardian to participate.',
      },
    ],
    formIntent: 'birthday',
    ctaLabel: 'Schedule My Party',
    mediaIcon: '🎂',
  },
  'summer-camp': {
    slug: 'summer-camp',
    name: 'Summer / Day Camp',
    tag: 'Ages 3-12',
    heroTitle: "Make this your child's most exciting summer ever",
    heroIntro:
      'A day-camp experience for ages 3–12 that mixes martial arts, themes, crafts, games, and friendship — taught in a supervised, beginner-friendly setting. Perfect when you want an active summer plan with purpose.',
    kidsWill: [
      { label: 'Break boards', icon: '💥' },
      { label: 'Learn martial arts moves', icon: '🥋' },
      { label: 'Make new friends', icon: '🤝' },
    ],
    activities: [
      'Martial arts classes with Black Belt instructors',
      'Weekly themes that spark imagination',
      'Arts & crafts projects',
      'Games, free play, and social time',
      'Projects, outings, and unforgettable camp energy',
    ],
    includes: [
      'Action-packed days built around fun first',
      'Character & life-skills lessons woven into themes',
      'A supervised environment designed for ages 3–12',
      'No martial arts experience required',
    ],
    whatToBring: [
      'A healthy lunch packed daily',
      'Two snacks',
      'A water bottle',
      'Comfortable clothes that won’t restrict movement (t-shirt + shorts/sweatpants)',
    ],
    weekNotes: [
      'Each week focuses on a different theme with coordinating character lessons.',
      'Uniforms are NOT necessary — just comfy clothes ready to move.',
      'All campers need a waiver signed by a parent or guardian.',
    ],
    faqs: [
      {
        q: 'Who is summer camp for?',
        a: 'Kids ages 3–12 who enjoy active play, crafts, and trying martial arts in a friendly group. Students and non-students are welcome.',
      },
      {
        q: 'When are the camps and how much do they cost?',
        a: 'Dates, weekly themes, and pricing vary by season. Send an inquiry (or call us) and our team will share the current schedule and rates — we do not publish unverified prices here.',
      },
      {
        q: 'What is the inquiry form for?',
        a: 'Use the form to share your child’s age, preferred weeks or location, and contact info. It starts the conversation; we confirm camp dates, openings, and pricing before enrollment.',
      },
      {
        q: 'Does my child need previous martial arts experience?',
        a: 'Nope! All ability levels are welcome. Experienced kids help new ones, and everyone feels at home on day one.',
      },
      {
        q: 'Will my child be learning how to “fight”?',
        a: 'We practice self-defense and movement skills in a controlled, age-appropriate way. Kids are not fighting each other.',
      },
    ],
    formIntent: 'summer-camp',
    ctaLabel: 'Reserve a Spot',
    mediaIcon: '☀️',
  },
  'parents-night-out': {
    slug: 'parents-night-out',
    name: "Parents' Night Out",
    tag: 'Monthly Friday · All ages',
    heroTitle: 'Fun for kids. Relaxation for you.',
    heroIntro:
      'A monthly Friday evening drop-off event where kids enjoy supervised games, laughter, and pizza while parents get a real night off. Open to students and non-students — bring a friend.',
    kidsWill: [
      { label: 'Play games all night', icon: '🎮' },
      { label: 'Share pizza & laughs', icon: '🍕' },
      { label: 'Make Friday memories', icon: '✨' },
    ],
    activities: [
      'Supervised games and free play',
      'Pizza dinner with the group',
      'Laughs with friends — students and non-students welcome',
      'A structured evening so parents can actually go out',
    ],
    includes: [
      'Held once a month on a Friday',
      'Open to non-students — bring friends!',
      'Games, laughter, and pizza',
      'Staff supervision for the evening',
    ],
    faqs: [
      {
        q: 'Who can attend Parents’ Night Out?',
        a: 'It’s open to students and non-students. Friends are welcome — reserve a spot so we can plan pizza and activities.',
      },
      {
        q: 'Why would a parent choose this?',
        a: 'You get a planned, supervised Friday night for the kids — games and pizza included in the event concept — while you enjoy dinner, errands, or downtime. Exact timing and fees are confirmed when you inquire.',
      },
      {
        q: 'What is the inquiry form for?',
        a: 'Tell us how many kids are coming, which school you prefer, and how to reach you. We reply with the next available Friday, capacity, and current details — the form itself is not a final reservation until confirmed.',
      },
      {
        q: 'When is the next Parents’ Night Out?',
        a: 'We host it monthly on a Friday. Dates, drop-off times, and pricing need seasonal confirmation — send an inquiry or call and we’ll share what’s next for your preferred location.',
      },
      {
        q: 'What should kids bring?',
        a: 'Comfortable clothes and a good appetite. We’ll confirm anything location-specific when we lock in your spot.',
      },
    ],
    formIntent: 'parents-night-out',
    ctaLabel: 'Save a Spot',
    mediaIcon: '🍕',
  },
}

export function getJust4KidsDetail(slug: string): Just4KidsDetail | undefined {
  return JUST_4_KIDS_DETAILS[slug]
}

export const VALUES = [
  'Confidence',
  'Discipline',
  'Focus',
  'Respect',
  'Fitness',
  'Self-Defense',
  'Personal Development',
]

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "My son was shy and hesitant when he started. A few months in, he walks into class with his head high and it's carried over to school too.",
    name: 'Jennifer M.',
    role: 'Parent of a Junior Tiger',
  },
  {
    quote:
      'The instructors genuinely care. They push the kids to try their best while keeping every class fun and positive.',
    name: 'David R.',
    role: 'Parent of a Tiny Tiger',
  },
  {
    quote:
      'I joined the adult program to get in shape and stayed for the community. Best decision I have made for my health in years.',
    name: 'Samantha K.',
    role: 'Adult Program Member',
  },
]

export type LocationId = 'allendale' | 'midland-park' | 'glen-rock'

export type LocationPageContent = {
  /** Location-specific H1 support line (paired with school name) */
  headline: string
  intro: string
  /** Nearby towns referenced for local discovery — not a claim of exclusive coverage */
  communitiesServed: string[]
  /** High-level programs available; class-by-class schedules need owner confirmation */
  programsBlurb: string
  imageLabel: string
}

export type Location = {
  id: LocationId
  name: string
  address: string
  city: string
  phone?: string
  mapQuery: string
  hours?: { day: string; time: string }[]
  placeholder?: boolean
  /** Newly added / opening-soon location */
  isNew?: boolean
  note?: string
  /** When true, phone/hours should be treated as unverified placeholders in UI */
  detailsPending?: boolean
  /** Dedicated landing-page copy under /locations/:id */
  page?: LocationPageContent
}

export const LOCATIONS: Location[] = [
  {
    id: 'allendale',
    name: 'Allendale',
    address: '240 W Crescent Ave',
    city: 'Allendale, NJ 07401',
    phone: '201-962-2922',
    mapQuery: '240 W Crescent Ave, Allendale, NJ 07401',
    hours: [
      { day: 'Monday', time: '3:30pm - 8:00pm' },
      { day: 'Tuesday', time: '3:00pm - 8:15pm' },
      { day: 'Wednesday', time: '3:30pm - 8:00pm' },
      { day: 'Thursday', time: '3:30pm - 8:00pm' },
      { day: 'Friday', time: '3:30pm - 7:45pm' },
      { day: 'Saturday', time: '9:00am - 1:30pm' },
      { day: 'Sunday', time: 'Closed' },
    ],
    page: {
      headline: 'Taekwondo & martial arts classes in Allendale, NJ',
      intro:
        'United Black Belt Academy’s Allendale school welcomes children, teens, and adults who want confidence, discipline, focus, fitness, and practical self-defense in a family-friendly dojang. Stop by for a free introductory class and meet our instructors on the mat.',
      communitiesServed: [
        'Allendale',
        'Waldwick',
        'Saddle River',
        'Upper Saddle River',
        'Ramsey',
        'Ho-Ho-Kus',
      ],
      programsBlurb:
        'Age-specific children’s Taekwondo, teen training, adult martial arts, family options, and Just 4 Kids events (birthday parties, summer camp, and Parents’ Night Out) are offered through our Bergen County schools. Ask which sessions run at Allendale when you book your free class.',
      imageLabel: 'Allendale dojang photo — replace with school photography',
    },
  },
  {
    id: 'midland-park',
    name: 'Midland Park',
    address: '644 Godwin Ave',
    city: 'Midland Park, NJ 07432',
    mapQuery: '644 Godwin Ave, Midland Park, NJ 07432',
    detailsPending: true,
    note: 'Phone number and weekly hours — pending owner confirmation.',
    page: {
      headline: 'Family martial arts training in Midland Park, NJ',
      intro:
        'Our Midland Park location gives nearby families another convenient place to train with United Black Belt Academy. Classes support kids building confidence and focus, teens developing fitness and self-defense skills, and adults looking for a welcoming workout with purpose.',
      communitiesServed: [
        'Midland Park',
        'Wyckoff',
        'Ridgewood',
        'Glen Rock',
        'Franklin Lakes',
        'Fair Lawn',
      ],
      programsBlurb:
        'Students can explore Tiny Tigers, Junior Tigers, teen and adult martial arts, plus family-friendly training and Just 4 Kids offerings. Availability can vary by school — tell us your preferred Midland Park schedule when you request a free trial.',
      imageLabel: 'Midland Park dojang photo — replace with school photography',
    },
  },
]

/** Locations that have a dedicated /locations/:id landing page. */
export function getLocation(id: string): Location | undefined {
  return LOCATIONS.find((loc) => loc.id === id && loc.page)
}

export function getLocationPageIds(): string[] {
  return LOCATIONS.filter((loc) => loc.page).map((loc) => loc.id)
}

export const GLEN_ROCK: Location = {
  id: 'glen-rock',
  name: 'Glen Rock',
  address: '201 Rock Rd, Suite 116',
  city: 'Glen Rock, NJ 07452',
  phone: '201-551-8557',
  mapQuery: '201 Rock Rd Suite 116, Glen Rock, NJ 07452',
  isNew: true,
  // Class schedule for the new location is being finalized — confirm with owner.
  note: 'Now enrolling — class schedule coming soon. Call us to reserve your spot.',
}

/** Locations shown in the UI, respecting the Glen Rock feature flag. */
export function getVisibleLocations(): Location[] {
  return SITE.showGlenRock ? [...LOCATIONS, GLEN_ROCK] : LOCATIONS
}

export const PROGRAM_OPTIONS = [
  'Tiny Tigers (Ages 3-5)',
  'Junior Tigers (Ages 6-10)',
  'Teen Martial Arts',
  'Adult Martial Arts',
  'Family Programs',
  'Birthday Parties',
  'Summer / Day Camp',
  "Parents' Night Out",
  'Not sure yet',
]

export const EVENT_GUEST_OPTIONS = ['1-5', '6-10', '10+'] as const

/* ---------------------------------------------------------------------------
 * Trust signals & stats.
 * NOTE: Every number below is a PLACEHOLDER awaiting owner confirmation.
 * Do not present as fact until Sanghyun Lee verifies. See docs/OWNER_APPROVAL_CHECKLIST.md
 * ------------------------------------------------------------------------- */
export type Stat = { value: number; suffix?: string; label: string; placeholder?: boolean }

export const STATS: Stat[] = [
  { value: getVisibleLocations().length, label: 'NJ Locations' },
  { value: 500, suffix: '+', label: 'Students Trained', placeholder: true },
  { value: 15, suffix: '+', label: 'Years Serving Bergen County', placeholder: true },
  { value: 5, suffix: '★', label: 'Average Parent Rating', placeholder: true },
]

export type OwnerProfile = {
  name: string
  title: string
  intro: string
  story: string[]
  quote: string
  credentials: string[]
}

export const OWNER: OwnerProfile = {
  name: 'Sanghyun Lee',
  title: 'Head Instructor & Owner',
  // Placeholder biography — confirm details with the owner before launch.
  intro:
    'Martial arts changed the course of my life, and I have spent my career sharing that same growth with our community.',
  story: [
    'I opened United Black Belt Academy to build more than a training floor — I wanted a place where kids find their voice, teens discover their strength, and adults rediscover what their bodies can do.',
    'Every class is designed to be challenging, welcoming, and genuinely fun. Progress is personal here. We celebrate the quiet wins as loudly as the black belts.',
    'When you step onto our mat, you are not a membership number. You are part of a family that shows up for one another, on the good days and the hard ones.',
  ],
  quote: 'Confidence is a skill. We teach it one class at a time.',
  // Do not fabricate ranks/awards — leave as placeholders for owner confirmation.
  credentials: [
    'Rank & certifications — pending owner confirmation',
    'Years of experience — pending owner confirmation',
  ],
}

export type BeltStep = {
  belt: string
  color: string
  title: string
  text: string
}

export const GETTING_STARTED: BeltStep[] = [
  {
    belt: 'White Belt',
    color: '#f4f4f4',
    title: 'Redeem A Web Offer',
    text: 'Claim one of our exclusive online offers to lock in your free introductory class — no obligation.',
  },
  {
    belt: 'Blue Belt',
    color: '#2563eb',
    title: 'Schedule Your First Lesson',
    text: 'We reach out to book a semi-private first lesson at a time that fits your family.',
  },
  {
    belt: 'Red Belt',
    color: '#C41230',
    title: 'Begin The Journey',
    text: 'Step onto the mat and start building confidence, discipline, and lifelong skills.',
  },
  {
    belt: 'Black Belt',
    color: '#0A0A0A',
    title: 'Grow For Life',
    text: 'Progress through the ranks with a team that believes in you every step of the way.',
  },
]

export const FAQS: Faq[] = [
  {
    q: 'What age can children start martial arts?',
    a: 'Children can start as early as age 3 in our Tiny Tigers program. We also offer Junior Tigers for ages 6–10, teen classes for ages 11–17, and adult training for ages 18+.',
  },
  {
    q: 'What should students wear to their first class?',
    a: 'Comfortable athletic clothing is perfect for your free class. Uniform details are handled after you enroll — no special gear is required for the trial.',
  },
  {
    q: 'Do beginners need previous experience?',
    a: 'No. Every program is built for complete beginners, and instructors meet each student where they are. You do not need prior martial arts training to feel welcome on day one.',
  },
  {
    q: 'Can adults begin with no martial arts background?',
    a: 'Absolutely. Our adult classes welcome first-timers looking for fitness, focus, and practical self-defense in a supportive, no-ego environment.',
  },
  {
    q: 'How does the free trial work?',
    a: 'Submit a free-class request on this site (or call the school). Our team will follow up to learn your goals, suggest a program, and schedule a complimentary introductory class — with no obligation to enroll.',
  },
  {
    q: 'Which UBBA location should I choose?',
    a: 'Choose the school that is easiest for your family: Allendale or Midland Park (and Glen Rock when you prefer that campus). Program options are similar across our Bergen County schools; we can help match class times when you inquire.',
  },
]

// Social profiles: edit URLs/handles in `src/data/contact.ts` (SOCIAL_PROFILES).
// Recent-post placeholders below can be swapped for live embeds/API later.
// YouTube is intentionally omitted (no channel yet).
export type SocialSlug = SocialProfileSlug

export type SocialPost = {
  id: string
  caption: string
  dateLabel: string
  href: string
  placeholder?: boolean
}

export type SocialLink = {
  slug: SocialSlug
  label: 'Instagram' | 'Facebook'
  href: string
  handle: string
  blurb: string
  placeholder?: boolean
  recentPosts: SocialPost[]
}

const SOCIAL_RECENT_POSTS: Record<SocialSlug, SocialPost[]> = {
  instagram: [
    {
      id: 'ig-1',
      caption: 'Evening class energy on the mat',
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
    {
      id: 'ig-2',
      caption: 'Tiny Tigers belt promotion day',
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
    {
      id: 'ig-3',
      caption: 'Junior Tigers sparring drills',
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
  ],
  facebook: [
    {
      id: 'fb-1',
      caption: "Parents' Night Out this Friday",
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
    {
      id: 'fb-2',
      caption: 'Summer camp registration is open',
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
    {
      id: 'fb-3',
      caption: 'Birthday party booking spots filling up',
      dateLabel: 'Recent',
      href: '#',
      placeholder: true,
    },
  ],
}

/** Profile links come from SOCIAL_PROFILES in contact.ts — edit URLs there. */
export const SOCIAL: SocialLink[] = SOCIAL_PROFILES.map((profile) => ({
  ...profile,
  recentPosts: SOCIAL_RECENT_POSTS[profile.slug],
}))

export function getSocial(slug: string | undefined): SocialLink | undefined {
  return SOCIAL.find((s) => s.slug === slug)
}

export type MegaGroup = { heading: string; links: { label: string; to: string; meta?: string }[] }

export const MEGA_MENU: MegaGroup[] = [
  {
    heading: "Children's Programs",
    links: [
      { label: 'Overview', to: '/programs/children' },
      { label: 'Tiny Tigers', to: '/programs/tiny-tigers', meta: 'Ages 3-5' },
      { label: 'Junior Tigers', to: '/programs/junior-tigers', meta: 'Ages 6-10' },
      { label: 'Teen Martial Arts', to: '/programs/teen-martial-arts', meta: 'Ages 11-17' },
    ],
  },
  {
    heading: 'Adult & Family',
    links: [
      { label: 'Overview', to: '/programs/adult' },
      { label: 'Adult Program', to: '/programs/adult-program', meta: 'Ages 18+' },
      { label: 'Family Programs', to: '/programs/family-programs' },
      { label: 'Olympic Sparring', to: '/programs/olympic-sparring' },
      { label: 'SWAT Team', to: '/programs/swat-team' },
      { label: 'Self Defense', to: '/programs/self-defense' },
      { label: 'Weapons Class', to: '/programs/weapons-class' },
    ],
  },
]

/** Top-level Just 4 Kids nav dropdown (separate from Programs). */
export const JUST_4_KIDS_MENU: MegaGroup = {
  heading: 'Just 4 Kids',
  links: [
    { label: 'Overview', to: '/just-4-kids' },
    { label: 'Birthday Parties', to: '/just-4-kids/birthday-parties' },
    { label: 'Summer / Day Camp', to: '/just-4-kids/summer-camp' },
    { label: "Parents' Night Out", to: '/just-4-kids/parents-night-out' },
  ],
}

/* ---------------------------------------------------------------------------
 * Per-program detail pages. Keep copy short so it's easy to edit later.
 * ------------------------------------------------------------------------- */
export type ProgramDetail = {
  slug: string
  name: string
  category: ProgramCategory
  ages?: string
  /** Who the program is designed for */
  audience: string
  image: string
  tagline: string
  description: string
  /** Core benefits students work toward (not outcome guarantees) */
  learn: string[]
  /** What a typical class experience feels like */
  classLooksLike: string
  /** Related program slugs for internal linking */
  relatedSlugs: string[]
}

export const PROGRAM_DETAILS: ProgramDetail[] = [
  {
    slug: 'tiny-tigers',
    name: 'Tiny Tigers',
    category: 'Children',
    ages: 'Ages 3-5',
    audience:
      'Preschoolers and early elementary kids who are ready for a playful, structured first class — perfect for families in Allendale, Midland Park, and nearby Bergen County towns.',
    image: IMAGES.kidsKicks,
    tagline: 'A playful, confidence-first introduction to Taekwondo.',
    description:
      'Tiny Tigers gives our youngest students a joyful first taste of martial arts. Short, high-energy classes build listening skills, balance, and the confidence to try new things — without pressure or intimidation.',
    learn: [
      'Listening and following directions',
      'Balance, coordination, and body control',
      'Taking turns and showing respect',
      'Confidence through small, achievable wins',
    ],
    classLooksLike:
      'Fast-moving games and drills in short bursts to match young attention spans, always with lots of encouragement from instructors.',
    relatedSlugs: ['junior-tigers', 'family-programs'],
  },
  {
    slug: 'junior-tigers',
    name: 'Junior Tigers',
    category: 'Children',
    ages: 'Ages 6-10',
    audience:
      'School-age kids who thrive with clear goals, active friends, and a positive place to grow focus and self-control.',
    image: IMAGES.kidsGroup,
    tagline: 'Discipline, focus, and leadership through the belt journey.',
    description:
      'Junior Tigers helps kids channel energy into discipline and focus. Students progress through a clear belt curriculum that rewards effort and consistency while building friendships on the mat.',
    learn: [
      'Self-control and discipline',
      'Goal setting through belt ranks',
      'Coordination and Taekwondo fundamentals',
      'Respect for instructors and teammates',
    ],
    classLooksLike:
      'Structured warm-ups, technique work, and partner drills, finishing with a fun challenge that reinforces the day’s lesson.',
    relatedSlugs: ['tiny-tigers', 'teen-martial-arts', 'family-programs'],
  },
  {
    slug: 'teen-martial-arts',
    name: 'Teen Martial Arts',
    category: 'Children',
    ages: 'Ages 11-17',
    audience:
      'Tweens and teens who want fitness, resilience, and practical self-defense in a supportive peer group — beginners welcome.',
    image: IMAGES.teenSpar,
    tagline: 'Strength, resilience, and real self-defense for teens.',
    description:
      'A positive, high-energy outlet where teens build fitness, resilience, and leadership while learning practical self-defense. Classes challenge students without ego or judgment.',
    learn: [
      'Practical self-defense skills',
      'Athletic conditioning and flexibility',
      'Confidence and healthy stress outlets',
      'Leadership and mentoring younger students',
    ],
    classLooksLike:
      'Dynamic conditioning, technique training, and age-appropriate drills that keep teens engaged and challenged.',
    relatedSlugs: ['junior-tigers', 'adult-program', 'olympic-sparring'],
  },
  {
    slug: 'adult-program',
    name: 'Adult Program',
    category: 'Adult & Family',
    ages: 'Ages 18+',
    audience:
      'Adults of any fitness level — from complete beginners to returning athletes — who want a purposeful workout and practical martial arts skills.',
    image: IMAGES.action,
    tagline: 'Get fit and learn to protect yourself — no experience needed.',
    description:
      'A full-body workout and practical martial arts training for every fitness level. Zero intimidation, plenty of support, and a welcoming community at our New Jersey schools.',
    learn: [
      'Practical self-defense',
      'Cardio, strength, and flexibility',
      'Stress relief and mental focus',
      'A supportive, no-ego community',
    ],
    classLooksLike:
      'A warm-up, technique and pad work, and optional light sparring — scaled to your level so you can progress at a comfortable pace.',
    relatedSlugs: ['family-programs', 'self-defense', 'olympic-sparring'],
  },
  {
    slug: 'family-programs',
    name: 'Family Programs',
    category: 'Adult & Family',
    audience:
      'Parents and kids who want to train together and share a healthy habit as a family.',
    image: IMAGES.kidsGroup,
    tagline: 'Train together, grow together.',
    description:
      'Parents and kids share the mat, build healthy habits, and cheer each other on. A meaningful activity the whole family can enjoy at United Black Belt Academy.',
    learn: [
      'Shared goals across all ages',
      'Quality active time together',
      'Mutual encouragement and accountability',
      'Fundamental Taekwondo skills',
    ],
    classLooksLike:
      'Mixed-age classes with drills that let families train side by side at their own pace.',
    relatedSlugs: ['tiny-tigers', 'junior-tigers', 'adult-program'],
  },
  {
    slug: 'olympic-sparring',
    name: 'Olympic Sparring',
    category: 'Adult & Family',
    audience:
      'Students ready for sport-focused Taekwondo who want to sharpen speed, timing, and strategy. Availability and requirements — confirm with the school.',
    image: IMAGES.teenSpar,
    tagline: 'Sport Taekwondo: speed, timing, and strategy.',
    description:
      'Sport-focused sparring that develops speed, timing, and strategy for students who want to compete or level up their game in a coached setting.',
    learn: [
      'Footwork and distance control',
      'Scoring techniques and strategy',
      'Reaction speed and timing',
      'Competition-minded training habits',
    ],
    classLooksLike:
      'Focused footwork drills, controlled sparring rounds, and strategy coaching with protective gear when appropriate.',
    relatedSlugs: ['teen-martial-arts', 'adult-program', 'swat-team'],
  },
  {
    slug: 'swat-team',
    name: 'SWAT Team',
    category: 'Adult & Family',
    audience:
      'Dedicated students invited or approved by instructors for higher-intensity, advanced training. Ask the school about readiness and openings.',
    image: IMAGES.action,
    tagline: 'Our elite training group for dedicated students.',
    description:
      'An advanced training group for committed students ready to push their skills, conditioning, and technique. This is a step up from regular class — not a beginner track.',
    learn: [
      'Advanced technique refinement',
      'Higher-intensity conditioning',
      'Demonstration and performance skills',
      'Leadership within the academy',
    ],
    classLooksLike:
      'Invitation or instructor approval is typical — expect demanding, high-focus sessions.',
    relatedSlugs: ['olympic-sparring', 'adult-program', 'weapons-class'],
  },
  {
    slug: 'self-defense',
    name: 'Self Defense',
    category: 'Adult & Family',
    audience:
      'Teens and adults who want practical awareness and defense skills without a sport-competition focus.',
    image: IMAGES.beltTest,
    tagline: 'Practical skills for awareness and personal safety.',
    description:
      'Practical techniques that help you stay aware, stay calm, and respond thoughtfully under pressure. Training emphasizes habits and skills — not guarantees about real-world outcomes.',
    learn: [
      'Situational awareness',
      'Escapes and practical strikes',
      'De-escalation and safety habits',
      'Composure under pressure',
    ],
    classLooksLike:
      'Scenario-based drills and repetition of high-percentage techniques in a supportive setting.',
    relatedSlugs: ['adult-program', 'teen-martial-arts', 'family-programs'],
  },
  {
    slug: 'weapons-class',
    name: 'Weapons Class',
    category: 'Adult & Family',
    audience:
      'Students looking for an advanced traditional challenge. Equipment needs and eligibility are confirmed at enrollment.',
    image: IMAGES.beltTest,
    tagline: 'Precision, discipline, and focus through traditional weapons.',
    description:
      'Traditional weapons training that builds precision, discipline, and focus while adding a new challenge to your practice. Safety and proper handling come first.',
    learn: [
      'Weapon handling and safety',
      'Precision and control',
      'Forms and coordination',
      'Focus and discipline',
    ],
    classLooksLike:
      'Guided forms and controlled drills; equipment details are confirmed at enrollment.',
    relatedSlugs: ['adult-program', 'swat-team', 'olympic-sparring'],
  },
]

export function getProgram(slug: string): ProgramDetail | undefined {
  return PROGRAM_DETAILS.find((p) => p.slug === slug)
}
