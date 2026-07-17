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
 * Media (PLACEHOLDER assets sourced from free/CC libraries).
 * Replace with the academy's own photography/video before launch.
 * Licenses & attribution are tracked in docs/IMAGE_SOURCES.md.
 * ------------------------------------------------------------------------- */
export const IMAGES = {
  // Hero background video (Mixkit free license) + local poster fallback.
  heroVideo: 'https://assets.mixkit.co/videos/49706/49706-1080.mp4',
  heroPoster: '/media/hero-poster.jpg',
  instructorPortrait: '/media/instructor-portrait.jpg',
  // Clean, consistent studio/dojang photography (self-hosted; Mixkit free license).
  action: '/media/adult-action.jpg',
  kidsKicks: '/media/kids-stance.jpg',
  kidsGroup: '/media/kids-bow.jpg',
  teenSpar: '/media/kids-motion.jpg',
  beltTest: '/media/hero-poster.jpg',
} as const

export type NavLink = { label: string; to: string }

export const NAV: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: "Children's Programs", to: '/programs/children' },
  { label: 'Adult Programs', to: '/programs/adult' },
  { label: 'Just 4 Kids', to: '/just-4-kids' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LINKS: NavLink[] = [
  { label: 'About Us', to: '/#owner' },
  { label: 'Our Schools', to: '/#locations' },
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
  id: string
  title: string
  ages?: string
  blurb: string
  /** slug of the detail page this card links to */
  slug: string
  image?: string
}

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

export const JUST_4_KIDS = [
  {
    id: 'birthday-parties',
    title: 'Birthday Parties',
    tag: 'All ages',
    blurb:
      'Supervised martial arts parties packed with games and activities that teach courtesy and respect while everyone has a blast.',
  },
  {
    id: 'summer-camp',
    title: 'Summer / Day Camp',
    tag: 'Ages 3-12',
    blurb:
      'An action-packed camp focused on life skills, confidence, and an unforgettable summer of movement, games, and friendships.',
  },
  {
    id: 'parents-night-out',
    title: "Parents' Night Out",
    tag: 'Monthly Friday',
    blurb:
      'Games, laughter, and pizza once a month on a Friday. Open to non-students, so bring a friend and enjoy a night off.',
  },
]

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

export type Location = {
  id: string
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
  },
  {
    id: 'midland-park',
    name: 'Midland Park',
    address: '644 Godwin Ave',
    city: 'Midland Park, NJ 07432',
    mapQuery: '644 Godwin Ave, Midland Park, NJ 07432',
  },
]

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

export const PROGRAM_OPTIONS = [
  'Tiny Tigers (Ages 3-5)',
  'Junior Tigers (Ages 6-10)',
  'Teen Martial Arts',
  'Adult Martial Arts',
  'Family Programs',
  'Not sure yet',
]

/* ---------------------------------------------------------------------------
 * Trust signals & stats.
 * NOTE: Every number below is a PLACEHOLDER awaiting owner confirmation.
 * Do not present as fact until Sanghyun Lee verifies. See docs/OWNER_APPROVAL_CHECKLIST.md
 * ------------------------------------------------------------------------- */
export type Stat = { value: number; suffix?: string; label: string; placeholder?: boolean }

export const STATS: Stat[] = [
  { value: 2, label: 'NJ Locations' },
  { value: 500, suffix: '+', label: 'Students Trained', placeholder: true },
  { value: 15, suffix: '+', label: 'Years Serving Bergen County', placeholder: true },
  { value: 5, suffix: '★', label: 'Average Parent Rating', placeholder: true },
]

export const OWNER = {
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
    belt: 'Gold Belt',
    color: '#C9A227',
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

export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Do we need any experience to start?',
    a: 'Not at all. Every program is built for complete beginners, and our instructors meet each student exactly where they are.',
  },
  {
    q: 'What ages do you teach?',
    a: 'We welcome students from age 3 through adult, with age-specific programs so everyone trains at the right level.',
  },
  {
    q: 'What should we wear to the first class?',
    a: 'Comfortable athletic clothing is perfect for your free class. We will take care of the uniform details once you enroll.',
  },
  {
    q: 'How does the free class work?',
    a: 'Reach out through any form on this site and our team will contact you to schedule your complimentary introductory class.',
  },
]

// Social links are placeholders — replace with real profiles before launch.
export type SocialLink = { label: string; href: string; placeholder?: boolean }
export const SOCIAL: SocialLink[] = [
  { label: 'Instagram', href: '#', placeholder: true },
  { label: 'Facebook', href: '#', placeholder: true },
  { label: 'YouTube', href: '#', placeholder: true },
]

export type MegaGroup = { heading: string; links: { label: string; to: string; meta?: string }[] }

export const MEGA_MENU: MegaGroup[] = [
  {
    heading: "Children's Programs",
    links: [
      { label: 'Tiny Tigers', to: '/programs/children', meta: 'Ages 3-5' },
      { label: 'Junior Tigers', to: '/programs/children', meta: 'Ages 6-10' },
      { label: 'Teen Martial Arts', to: '/programs/children', meta: 'Ages 11-17' },
    ],
  },
  {
    heading: 'Adult & Family',
    links: [
      { label: 'Adult Program', to: '/programs/adult', meta: 'Ages 18+' },
      { label: 'Family Programs', to: '/programs/adult' },
      { label: 'Olympic Sparring', to: '/programs/adult' },
      { label: 'SWAT Team', to: '/programs/adult' },
      { label: 'Self Defense', to: '/programs/adult' },
      { label: 'Weapons Class', to: '/programs/adult' },
    ],
  },
  {
    heading: 'Just 4 Kids',
    links: [
      { label: 'Birthday Parties', to: '/just-4-kids' },
      { label: 'Summer / Day Camp', to: '/just-4-kids' },
      { label: "Parents' Night Out", to: '/just-4-kids' },
    ],
  },
]

export type SeoMeta = { title: string; description: string }

/* ---------------------------------------------------------------------------
 * Per-program detail pages. Keep copy short so it's easy to edit later.
 * ------------------------------------------------------------------------- */
export type ProgramDetail = {
  slug: string
  name: string
  category: 'Children' | 'Adult & Family'
  ages?: string
  image: string
  tagline: string
  description: string
  learn: string[]
  classLooksLike: string
}

export const PROGRAM_DETAILS: ProgramDetail[] = [
  {
    slug: 'tiny-tigers',
    name: 'Tiny Tigers',
    category: 'Children',
    ages: 'Ages 3-5',
    image: IMAGES.kidsKicks,
    tagline: 'A playful, confidence-first introduction to Taekwondo.',
    description:
      'Tiny Tigers gives our youngest students a joyful first taste of martial arts. Short, high-energy classes build focus, balance, and the confidence to try new things.',
    learn: [
      'Listening and following directions',
      'Balance, coordination, and body control',
      'Taking turns and showing respect',
      'Confidence through small, achievable wins',
    ],
    classLooksLike:
      'Fast-moving games and drills in short bursts to match young attention spans, always with lots of encouragement.',
  },
  {
    slug: 'junior-tigers',
    name: 'Junior Tigers',
    category: 'Children',
    ages: 'Ages 6-10',
    image: IMAGES.kidsGroup,
    tagline: 'Discipline, focus, and leadership through the belt journey.',
    description:
      'Junior Tigers helps kids channel their energy into discipline and focus. Students progress through a clear belt curriculum that rewards effort and consistency.',
    learn: [
      'Self-control and discipline',
      'Goal setting through belt ranks',
      'Coordination and Taekwondo fundamentals',
      'Respect for instructors and teammates',
    ],
    classLooksLike:
      'Structured warm-ups, technique work, and partner drills, finishing with a fun challenge that reinforces the day’s lesson.',
  },
  {
    slug: 'teen-martial-arts',
    name: 'Teen Martial Arts',
    category: 'Children',
    ages: 'Ages 11-17',
    image: IMAGES.teenSpar,
    tagline: 'Strength, resilience, and real self-defense for teens.',
    description:
      'A positive, high-energy outlet where teens build fitness, resilience, and leadership while learning practical self-defense in a supportive group.',
    learn: [
      'Practical self-defense skills',
      'Athletic conditioning and flexibility',
      'Confidence and stress management',
      'Leadership and mentoring younger students',
    ],
    classLooksLike:
      'Dynamic conditioning, sparring drills, and technique training that keep teens engaged and challenged.',
  },
  {
    slug: 'adult-program',
    name: 'Adult Program',
    category: 'Adult & Family',
    ages: 'Ages 18+',
    image: IMAGES.action,
    tagline: 'Get fit and learn to protect yourself — no experience needed.',
    description:
      'A full-body workout and practical martial arts training for every fitness level. Zero intimidation, plenty of support, and a welcoming community.',
    learn: [
      'Practical self-defense',
      'Cardio, strength, and flexibility',
      'Stress relief and mental focus',
      'A supportive, no-ego community',
    ],
    classLooksLike:
      'A warm-up, technique and pad work, and optional light sparring — scaled to your level.',
  },
  {
    slug: 'family-programs',
    name: 'Family Programs',
    category: 'Adult & Family',
    image: IMAGES.kidsGroup,
    tagline: 'Train together, grow together.',
    description:
      'Parents and kids share the mat, build healthy habits, and cheer each other on. A meaningful activity the whole family can enjoy.',
    learn: [
      'Shared goals across all ages',
      'Quality active time together',
      'Mutual encouragement and accountability',
      'Fundamental Taekwondo skills',
    ],
    classLooksLike:
      'Mixed-age classes with drills that let families train side by side at their own pace.',
  },
  {
    slug: 'olympic-sparring',
    name: 'Olympic Sparring',
    category: 'Adult & Family',
    image: IMAGES.teenSpar,
    tagline: 'Sport Taekwondo: speed, timing, and strategy.',
    description:
      'Sport-focused sparring that develops speed, timing, and strategy for students who want to compete and level up their game.',
    learn: [
      'Footwork and distance control',
      'Scoring techniques and strategy',
      'Reaction speed and timing',
      'Competition readiness',
    ],
    classLooksLike:
      'Focused footwork drills, controlled sparring rounds, and strategy coaching with protective gear.',
  },
  {
    slug: 'swat-team',
    name: 'SWAT Team',
    category: 'Adult & Family',
    image: IMAGES.action,
    tagline: 'Our elite training group for dedicated students.',
    description:
      'An advanced training group for committed students ready to push their skills, conditioning, and technique to the next level.',
    learn: [
      'Advanced technique refinement',
      'Higher-intensity conditioning',
      'Demonstration and performance skills',
      'Leadership within the academy',
    ],
    classLooksLike:
      'Invitation or instructor approval is typical — expect demanding, high-focus sessions.',
  },
  {
    slug: 'self-defense',
    name: 'Self Defense',
    category: 'Adult & Family',
    image: IMAGES.beltTest,
    tagline: 'Stay aware, stay calm, stay safe.',
    description:
      'Real-world, practical techniques that help you stay aware, stay calm, and protect yourself and your loved ones with confidence.',
    learn: [
      'Situational awareness',
      'Escapes and practical strikes',
      'De-escalation and safety habits',
      'Confidence under pressure',
    ],
    classLooksLike:
      'Scenario-based drills and repetition of high-percentage techniques in a supportive setting.',
  },
  {
    slug: 'weapons-class',
    name: 'Weapons Class',
    category: 'Adult & Family',
    image: IMAGES.beltTest,
    tagline: 'Precision, discipline, and focus through traditional weapons.',
    description:
      'Traditional weapons training that builds precision, discipline, and focus while adding an exciting new challenge to your practice.',
    learn: [
      'Weapon handling and safety',
      'Precision and control',
      'Forms and coordination',
      'Focus and discipline',
    ],
    classLooksLike:
      'Guided forms and controlled drills; equipment details are confirmed at enrollment.',
  },
]

export function getProgram(slug: string): ProgramDetail | undefined {
  return PROGRAM_DETAILS.find((p) => p.slug === slug)
}

export const SEO: Record<string, SeoMeta> = {
  '/': {
    title:
      'United Black Belt Academy | Taekwondo & Martial Arts in Allendale & Midland Park, NJ',
    description:
      'Confidence-building Taekwondo classes for kids, teens, and adults in Allendale & Midland Park, NJ. Try a class for free at United Black Belt Academy.',
  },
  '/programs/children': {
    title: "Children's Martial Arts Programs | United Black Belt Academy",
    description:
      'Kids Taekwondo in Bergen County — Tiny Tigers, Junior Tigers, and Teen Martial Arts build confidence, focus, and respect. Try a class for free.',
  },
  '/programs/adult': {
    title: 'Adult & Family Martial Arts | United Black Belt Academy',
    description:
      'Adult Taekwondo, family programs, Olympic sparring, and self-defense in Allendale & Midland Park, NJ. Fitness, confidence, and community.',
  },
  '/just-4-kids': {
    title: 'Just 4 Kids — Parties, Camp & Nights Out | United Black Belt Academy',
    description:
      'Martial arts birthday parties, summer camp, and Parents’ Night Out in Bergen County, NJ. The fun doesn’t stop at the mat.',
  },
  '/contact': {
    title: 'Contact & Locations | United Black Belt Academy',
    description:
      'Visit United Black Belt Academy in Allendale or Midland Park, NJ. Hours, directions, phone, and a free-class request form.',
  },
  '/privacy': {
    title: 'Privacy Policy | United Black Belt Academy',
    description: 'Privacy policy for United Black Belt Academy.',
  },
  '/terms': {
    title: 'Terms and Conditions | United Black Belt Academy',
    description: 'Terms and conditions for United Black Belt Academy.',
  },
}
