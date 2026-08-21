/**
 * =============================================================================
 * CONTACT & SOCIAL — edit this file to wire up email + Instagram / Facebook
 * =============================================================================
 *
 * Free-class CTAs open the NextKick trial form in a lightbox portal
 * (`NEXTKICK_TRIAL_FORM`). Birthday / camp / Parents' Night Out still email
 * `CONTACT.notifyEmails` via `/api/leads`. Instagram / Facebook profile links
 * come from `SOCIAL_PROFILES`.
 *
 * After editing:
 *   1. Save this file
 *   2. Restart the API server if it is already running (`pnpm dev:api`)
 *   3. Set SMTP (or Resend) secrets in `.env` — see `.env.example`
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
 * NextKick trial form (free-class CTAs)
 * ------------------------------------------------------------------------- */
/**
 * Public NextKick student form for free-class / trial signups.
 * The live academy site opens conversion surfaces in a lightbox; we reuse
 * that pattern and load this hosted form in the overlay iframe.
 *
 * This UUID belongs to the "1 Free Time Trial" form on the UBBA Allendale
 * NextKick account. Swap `href` if the school publishes a new form.
 */
export const NEXTKICK_TRIAL_FORM = {
  title: '1 Free Time Trial',
  href: 'https://student.nextkick.ai/form/6fbe8b2c-2e75-45ab-9d92-994135c06e17',
  club: 'UBBA Allendale',
} as const

/* ---------------------------------------------------------------------------
 * Where event-inquiry emails are delivered (birthday, camp, PNO)
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
    href: '#', // e.g. 'https://www.instagram.com/unitedblackbelt'
    handle: '@unitedblackbelt',
    blurb:
      'Class moments, belt promotions, and academy life — see what is happening on the mat.',
    placeholder: true,
  },
  {
    slug: 'facebook',
    label: 'Facebook',
    href: '#', // e.g. 'https://www.facebook.com/unitedblackbelt'
    handle: 'United Black Belt Academy',
    blurb:
      'Events, camp updates, and community news for families across Bergen County.',
    placeholder: true,
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
