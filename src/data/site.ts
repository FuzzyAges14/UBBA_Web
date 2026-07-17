export const SITE = {
  name: 'United Black Belt Academy',
  shortName: 'United Black Belt Academy',
  tagline: 'Confidence Building Martial Arts',
  primaryCta: 'Try A Class For Free!',
  owner: 'Sanghyun Lee',
  // Toggle to true only if the owner wants the Glen Rock location visible.
  showGlenRock: false,
}

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
}

export const HOME_PROGRAM_CARDS: ProgramCard[] = [
  {
    id: 'tiny-tigers',
    title: 'Tiny Tigers',
    ages: 'Ages 3-5',
    blurb:
      'A playful first step into martial arts that builds focus, listening skills, and confidence through age-appropriate games and drills.',
  },
  {
    id: 'junior-tigers',
    title: 'Junior Tigers',
    ages: 'Ages 6-10',
    blurb:
      'Structured classes where kids sharpen coordination, discipline, and self-control while making new friends and earning belts.',
  },
  {
    id: 'teen-martial-arts',
    title: 'Teen Martial Arts',
    ages: 'Ages 11-17',
    blurb:
      'A positive outlet that channels energy into fitness, resilience, and leadership as teens build real self-defense skills.',
  },
  {
    id: 'adult-martial-arts',
    title: 'Adult Martial Arts',
    ages: 'Ages 18+',
    blurb:
      'Get in the best shape of your life while learning practical self-defense in a welcoming, no-ego training environment.',
  },
]

export const CHILDREN_PROGRAMS: ProgramCard[] = [
  {
    id: 'tiny-tigers',
    title: 'Tiny Tigers',
    ages: 'Ages 3-5',
    blurb:
      'Our youngest students develop focus, balance, and confidence through fun, high-energy drills designed for little movers.',
  },
  {
    id: 'junior-tigers',
    title: 'Junior Tigers',
    ages: 'Ages 6-10',
    blurb:
      'Kids build discipline, respect, and coordination while progressing through a clear belt curriculum that rewards effort.',
  },
  {
    id: 'teen-martial-arts',
    title: 'Teen Martial Arts',
    ages: 'Ages 11-17',
    blurb:
      'Teens grow stronger and more confident, learning practical self-defense and leadership that carries into everyday life.',
  },
]

export const ADULT_PROGRAMS: ProgramCard[] = [
  {
    id: 'adult-program',
    title: 'Adult Program',
    blurb:
      'A full-body workout and practical martial arts training for every fitness level, with zero intimidation and plenty of support.',
  },
  {
    id: 'family-programs',
    title: 'Family Programs',
    blurb:
      'Train together and grow together. Parents and kids share the mat, build healthy habits, and cheer each other on.',
  },
  {
    id: 'olympic-sparring',
    title: 'Olympic Sparring',
    blurb:
      'Sport-focused sparring that develops speed, timing, and strategy for students who want to compete and level up.',
  },
  {
    id: 'swat-team',
    title: 'SWAT Team',
    blurb:
      'Our elite training group for dedicated students ready to push their skills, conditioning, and technique to the next level.',
  },
  {
    id: 'self-defense',
    title: 'Self Defense',
    blurb:
      'Real-world, practical techniques that help you stay aware, stay calm, and protect yourself and your loved ones.',
  },
  {
    id: 'weapons-class',
    title: 'Weapons Class',
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
  address: 'Location details coming soon',
  city: 'Glen Rock, NJ',
  mapQuery: 'Glen Rock, NJ',
  placeholder: true,
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
