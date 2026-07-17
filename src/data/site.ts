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
