/**
 * =============================================================================
 * CONTACT & SOCIAL — edit this file to wire up NextKick forms + Instagram / Facebook
 * =============================================================================
 *
 * Trial, birthday, summer-camp, and Parents' Night Out CTAs open a location-picker
 * lightbox, then the matching NextKick form (`NEXTKICK_FORMS`). Instagram / Facebook
 * profile links come from `SOCIAL_PROFILES`.
 *
 * After editing NextKick URLs or social links, save this file — `pnpm dev` hot-reloads.
 * The Express `/api/leads` mailer is unused by live marketing CTAs (legacy only).
 *
 * Tip: leave a profile `href` as '#' until you have the real URL, then paste it
 * in and set `placeholder: false`.
 */

export type SocialProfileSlug = 'instagram' | 'facebook'

export type SocialProfile = {
  slug: SocialProfileSlug
  label: 'Instagram' | 'Facebook'
  /** Full profile URL, e.g. https://www.instagram.com/yourhandle */
  href: string
  /** Display handle, e.g. @unitedblackbelt */
  handle: string
  blurb: string
  /** Self-hosted profile picture shown on Follow Us + feed pages */
  avatarSrc: string
  /** Keep true until the real URL is pasted in */
  placeholder?: boolean
}

/** Every form on the site posts with one of these intents. */
export type InquiryIntent =
  | 'free-class'
  | 'birthday'
  | 'summer-camp'
  | 'parents-night-out'

export type InquiryTypeConfig = {
  /** Shown as the email title / subject prefix */
  label: string
  /**
   * Optional extra inboxes for this request type only.
   * Leave empty to use CONTACT.notifyEmails.
   * Example: ['parties@unitedbba.com']
   */
  notifyEmails?: string[]
}

/* ---------------------------------------------------------------------------
 * NextKick hosted forms (trial + birthday + summer camp)
 * Flow: CTA → themed location picker → iframe for that school's form URL.
 * ------------------------------------------------------------------------- */

/** Portal kinds that use NextKick (not Parents' Night Out email). */
export type NextKickFormKind = 'trial' | 'birthday' | 'summer-camp' | 'parents-night-out'

/** Location keys matching school pages / SITE location ids. */
export type NextKickLocationId = 'allendale' | 'midland-park' | 'glen-rock'

export type NextKickLocationForm = {
  name: string
  href: string
  /** Short line under the school name in the picker */
  blurb: string
}

export type NextKickFormConfig = {
  kind: NextKickFormKind
  /** Small red eyebrow above the title */
  eyebrow: string
  /** Dialog H2 */
  title: string
  /** Short supporting copy on the location-picker step */
  pickerLede: string
  /** Supporting copy once a school form is open */
  formLede: string
  /** CSS modifier for themed chrome: trial | birthday | summer-camp | parents-night-out */
  theme: NextKickFormKind
  locations: Record<NextKickLocationId, NextKickLocationForm>
}

export const NEXTKICK_LOCATION_ORDER: NextKickLocationId[] = [
  'allendale',
  'midland-park',
  'glen-rock',
]

export const NEXTKICK_FORMS: Record<NextKickFormKind, NextKickFormConfig> = {
  trial: {
    kind: 'trial',
    eyebrow: 'Free Class Request',
    title: '1 Free Time Trial',
    pickerLede:
      'Choose your school, then finish the academy’s NextKick trial form — no experience required.',
    formLede:
      'Complete the NextKick trial form for this school without leaving the page. You can also open it in a new tab.',
    theme: 'trial',
    locations: {
      allendale: {
        name: 'Allendale',
        blurb: '240 W Crescent Ave',
        href: 'https://student.nextkick.ai/form/0318c4be-65de-4c00-b554-192c0e1d65eb',
      },
      'midland-park': {
        name: 'Midland Park',
        blurb: '644 Godwin Ave',
        href: 'https://student.nextkick.ai/form/9be0cbca-a014-4615-a52e-cd628d5858e1',
      },
      'glen-rock': {
        name: 'Glen Rock',
        blurb: 'New location',
        href: 'https://student.nextkick.ai/form/d1fc7971-e2da-4c7b-9292-c003db5e528c',
      },
    },
  },
  birthday: {
    kind: 'birthday',
    eyebrow: 'Birthday Parties',
    title: 'Schedule a Birthday Party',
    pickerLede:
      'Pick the school that fits your party plans, then complete the NextKick birthday form for that location.',
    formLede:
      'Finish the birthday party request for this school on NextKick. You can also open it in a new tab.',
    theme: 'birthday',
    locations: {
      allendale: {
        name: 'Allendale',
        blurb: '240 W Crescent Ave',
        href: 'https://student.nextkick.ai/form/8e4e23d6-da04-4d94-818e-06c71baf3de6',
      },
      'midland-park': {
        name: 'Midland Park',
        blurb: '644 Godwin Ave',
        href: 'https://student.nextkick.ai/form/0e481c10-573f-4ef7-9ac5-fc66ac7ce6ba',
      },
      'glen-rock': {
        name: 'Glen Rock',
        blurb: 'New location',
        href: 'https://student.nextkick.ai/form/47975a6b-a5e9-40c3-bb80-8e6456177303',
      },
    },
  },
  'summer-camp': {
    kind: 'summer-camp',
    eyebrow: 'Summer / Day Camp',
    title: 'Reserve a Camp Spot',
    pickerLede:
      'Choose a school, then complete the NextKick summer camp form for that location.',
    formLede:
      'Finish the summer camp request for this school on NextKick. You can also open it in a new tab.',
    theme: 'summer-camp',
    locations: {
      allendale: {
        name: 'Allendale',
        blurb: '240 W Crescent Ave',
        href: 'https://student.nextkick.ai/form/772f14dd-3ba1-4e28-8ba9-4fc86868840c',
      },
      'midland-park': {
        name: 'Midland Park',
        blurb: '644 Godwin Ave',
        href: 'https://student.nextkick.ai/form/97c21aa1-7764-40df-9cbe-ad0ac3fac9a1',
      },
      'glen-rock': {
        name: 'Glen Rock',
        blurb: 'New location',
        href: 'https://student.nextkick.ai/form/00a70372-829d-4883-9ed1-272a21ac10cf',
      },
    },
  },

  'parents-night-out': {
    kind: 'parents-night-out',
    eyebrow: "Parents' Night Out",
    title: 'Save a Spot',
    pickerLede:
      "Choose your school, then complete the NextKick Parents' Night Out form for that location.",
    formLede:
      "Finish the Parents' Night Out request for this school on NextKick. You can also open it in a new tab.",
    theme: 'parents-night-out',
    locations: {
      // TODO(owner): replace these three hrefs with the real NextKick form share
      // links for Parents' Night Out (NextKick admin → Forms → Share link).
      allendale: {
        name: 'Allendale',
        blurb: '240 W Crescent Ave',
        href: 'https://student.nextkick.ai/form/a0000001-1111-4111-8111-000000000001',
      },
      'midland-park': {
        name: 'Midland Park',
        blurb: '644 Godwin Ave',
        href: 'https://student.nextkick.ai/form/a0000001-2222-4222-8222-000000000002',
      },
      'glen-rock': {
        name: 'Glen Rock',
        blurb: 'New location',
        href: 'https://student.nextkick.ai/form/a0000001-3333-4333-8333-000000000003',
      },
    },
  },
}

export function getNextKickForm(kind: NextKickFormKind): NextKickFormConfig {
  return NEXTKICK_FORMS[kind]
}

export function getNextKickFormHref(
  kind: NextKickFormKind,
  locationId: NextKickLocationId,
): string {
  return NEXTKICK_FORMS[kind].locations[locationId].href
}

/** @deprecated Prefer NEXTKICK_FORMS.trial — kept for transitional imports. */
export const NEXTKICK_TRIAL_FORM = {
  title: NEXTKICK_FORMS.trial.title,
  href: NEXTKICK_FORMS.trial.locations.allendale.href,
  club: 'UBBA Allendale',
} as const

/* ---------------------------------------------------------------------------
 * Optional notify emails (legacy /api/leads only — live CTAs use NextKick)
 * ------------------------------------------------------------------------- */
export const CONTACT = {
  /**
   * Inbox(es) that receive form submissions by default.
   * Add as many as you like — each gets the same detailed email.
   */
  notifyEmails: [
    // ← Replace with the academy inbox (and optional extra staff addresses)
    'info@unitedbba.com',
  ] as string[],

  /** Public email shown on the site (mailto links). Often same as notifyEmails[0]. */
  publicEmail: 'info@unitedbba.com',

  /** From-name shown in the academy's inbox (not the visitor's name). */
  fromName: 'UBBA Website',

  /**
   * When true, the visitor's email is set as Reply-To so staff can hit
   * "Reply" and email the lead directly.
   */
  replyToVisitor: true,
} as const

/* ---------------------------------------------------------------------------
 * Per-form email labels (+ optional separate inboxes)
 * Edit labels anytime. Add notifyEmails only if that form should go elsewhere.
 * ------------------------------------------------------------------------- */
export const INQUIRY_TYPES: Record<InquiryIntent, InquiryTypeConfig> = {
  'free-class': {
    label: 'Free Class Request',
    // notifyEmails: ['trials@unitedbba.com'],
  },
  birthday: {
    label: 'Birthday Party Inquiry',
    // notifyEmails: ['parties@unitedbba.com'],
  },
  'summer-camp': {
    label: 'Summer Camp Inquiry',
    // notifyEmails: ['camp@unitedbba.com'],
  },
  'parents-night-out': {
    label: "Parents' Night Out Inquiry",
  },
}

/* ---------------------------------------------------------------------------
 * Instagram & Facebook profile links
 * Paste real profile URLs here — used by Follow Us pages, footer, and emails.
 * ------------------------------------------------------------------------- */
export const SOCIAL_PROFILES: SocialProfile[] = [
  {
    slug: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/ubbatkd/',
    handle: '@ubbatkd',
    blurb:
      'Class moments, belt promotions, summer camp, and academy life — follow United Black Belt Academy on the mat.',
    avatarSrc: '/media/social/instagram-profile.jpg',
    placeholder: false,
  },
  {
    slug: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/ubbaad/',
    handle: 'United Black Belt Academy',
    blurb:
      'Events, camp updates, and community news for families across Allendale, Midland Park, and Glen Rock.',
    avatarSrc: '/media/social/facebook-profile.jpg',
    placeholder: false,
  },
]

export function getSocialProfile(
  slug: string | undefined,
): SocialProfile | undefined {
  return SOCIAL_PROFILES.find((s) => s.slug === slug)
}

export function getInquiryType(intent: InquiryIntent | undefined): InquiryTypeConfig {
  return INQUIRY_TYPES[intent ?? 'free-class'] ?? INQUIRY_TYPES['free-class']
}
