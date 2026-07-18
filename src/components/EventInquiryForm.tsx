import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import {
  EVENT_GUEST_OPTIONS,
  GLEN_ROCK,
  LOCATIONS,
  SITE,
  type EventInquiryIntent,
} from '../data/site'
import { submitLead } from '../lib/submitLead'

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'form', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const locationChoices = [
  ...LOCATIONS.map((l) => l.name),
  ...(SITE.showGlenRock ? [GLEN_ROCK.name] : []),
]

const FIELD_ORDER = ['name', 'email', 'phone'] as const

const COPY: Record<
  EventInquiryIntent,
  {
    eyebrow: string
    submit: string
    successTitle: string
    successBody: string
    reassure: string
    programValue: string
  }
> = {
  birthday: {
    eyebrow: 'Schedule a Birthday Party',
    submit: 'Schedule My Party',
    successTitle: 'Party request sent!',
    successBody:
      'Thanks! A member of our team will call you shortly to lock in your date and walk through the package.',
    reassure: 'No experience needed · We handle the party flow · We’ll confirm availability by phone',
    programValue: 'Birthday Parties',
  },
  'summer-camp': {
    eyebrow: 'Reserve a Camp Spot',
    submit: 'Reserve a Spot',
    successTitle: 'Camp inquiry sent!',
    successBody:
      'Thanks! We’ll reach out with current dates, themes, and pricing so you can reserve your child’s spot.',
    reassure: 'Ages 3–12 · No martial arts experience required · Spots are limited',
    programValue: 'Summer / Day Camp',
  },
  'parents-night-out': {
    eyebrow: "Parents' Night Out",
    submit: 'Save a Spot',
    successTitle: 'You’re on the list!',
    successBody:
      'Thanks! We’ll share the next Parents’ Night Out date and confirm your child’s spot.',
    reassure: 'Monthly Friday · Open to non-students · Pizza & games included',
    programValue: "Parents' Night Out",
  },
}

export default function EventInquiryForm({
  intent,
  defaultLocation,
}: {
  intent: EventInquiryIntent
  defaultLocation?: string
}) {
  const route = useLocation()
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const copy = COPY[intent]
  const showPartyFields = intent === 'birthday'
  const showCampFields = intent === 'summer-camp'
  const showChildFields = intent === 'summer-camp' || intent === 'parents-night-out'
  const successRef = useRef<HTMLHeadingElement | null>(null)
  const summaryRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (submitted) successRef.current?.focus()
  }, [submitted])

  useEffect(() => {
    if (Object.keys(errors).length > 0) summaryRef.current?.focus()
  }, [errors])

  function validate(data: FormData): Errors {
    const next: Errors = {}
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    if (!name) next.name = 'Please enter your full name.'
    if (!email) next.email = 'Please enter your email.'
    else if (!emailRe.test(email)) next.email = 'Enter a valid email address.'
    if (!phone) next.phone = 'Please enter a phone number.'
    return next
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    setSending(true)
    try {
      const result = await submitLead({
        intent,
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        location: String(data.get('location') ?? '').trim() || undefined,
        program: copy.programValue,
        partyDate: String(data.get('party_date') ?? '').trim() || undefined,
        guests: String(data.get('guests') ?? '').trim() || undefined,
        childName: String(data.get('child_name') ?? '').trim() || undefined,
        childAge: String(data.get('child_age') ?? '').trim() || undefined,
        preferredWeeks: String(data.get('preferred_weeks') ?? '').trim() || undefined,
        message: String(data.get('message') ?? '').trim() || undefined,
        website: String(data.get('website') ?? '').trim() || undefined,
        source: route.pathname || '/just-4-kids',
      })
      if (!result.ok) {
        setErrors({ form: result.error || 'Could not send your request.' })
        return
      }
      setSubmitted(true)
      form.reset()
    } catch {
      setErrors({
        form: 'Could not reach the server. Please try again or call us.',
      })
    } finally {
      setSending(false)
    }
  }

  const ids = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    phone: `${formId}-phone`,
    location: `${formId}-location`,
    child: `${formId}-child`,
    age: `${formId}-age`,
    childBday: `${formId}-child-bday`,
    ageBday: `${formId}-age-bday`,
    date: `${formId}-date`,
    guests: `${formId}-guests`,
    weeks: `${formId}-weeks`,
    message: `${formId}-message`,
    website: `${formId}-website`,
    summary: `${formId}-summary`,
  }

  const fieldErrors = FIELD_ORDER.filter((key) => errors[key])
  const fieldLabels = {
    name: 'Parent / Guardian Name',
    email: 'Email',
    phone: 'Phone',
  } as const

  if (submitted) {
    return (
      <div className="leadform leadform--event">
        <div className="form-success" role="status" aria-live="polite">
          <div className="form-success__icon" aria-hidden="true">
            {intent === 'birthday' ? '🎂' : intent === 'summer-camp' ? '☀️' : '🍕'}
          </div>
          <h3 ref={successRef} tabIndex={-1}>
            {copy.successTitle}
          </h3>
          <p>{copy.successBody}</p>
          <button
            type="button"
            className="btn btn--outline mt"
            onClick={() => setSubmitted(false)}
          >
            Send another request
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="leadform leadform--event"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending || undefined}
    >
      <div className="leadform__head">
        <span className="eyebrow">{copy.eyebrow}</span>
      </div>
      <p className="form-instructions">
        Fields marked with an asterisk (*) are required. We&apos;ll follow up to confirm
        availability — dates and packages are not final until we contact you.
      </p>
      <div className="leadform__steps" aria-hidden="true">
        <i className="on" />
        <i className="on" />
        <i className="on" />
      </div>

      {(fieldErrors.length > 0 || errors.form) && (
        <div
          ref={summaryRef}
          id={ids.summary}
          className="form-error-summary"
          role="alert"
          tabIndex={-1}
        >
          <p className="form-error-summary__title">
            {errors.form
              ? errors.form
              : 'Please fix the following before sending your request:'}
          </p>
          {fieldErrors.length > 0 && (
            <ul>
              {fieldErrors.map((key) => (
                <li key={key}>
                  <a href={`#${ids[key]}`}>{fieldLabels[key]}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="form-grid">
        <div className="field field--full hp-field" aria-hidden="true">
          <label htmlFor={ids.website}>Website</label>
          <input
            id={ids.website}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="field field--full">
          <label htmlFor={ids.name}>
            Parent / Guardian Name <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            placeholder="Your name"
            disabled={sending}
          />
          {errors.name && (
            <span className="error" id={`${ids.name}-error`}>
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={ids.email}>
            Email <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            placeholder="you@example.com"
            disabled={sending}
          />
          {errors.email && (
            <span className="error" id={`${ids.email}-error`}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={ids.phone}>
            Phone <span className="req" aria-hidden="true">*</span>
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={errors.phone ? 'true' : undefined}
            aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
            placeholder="(201) 555-0123"
            disabled={sending}
          />
          {errors.phone && (
            <span className="error" id={`${ids.phone}-error`}>
              {errors.phone}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={ids.location}>Location</label>
          <select
            id={ids.location}
            name="location"
            defaultValue={defaultLocation ?? ''}
            disabled={sending}
            autoComplete="address-level2"
          >
            <option value="" disabled>
              Choose a location
            </option>
            {locationChoices.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {showChildFields && (
          <>
            <div className="field">
              <label htmlFor={ids.child}>Child’s Name</label>
              <input
                id={ids.child}
                name="child_name"
                type="text"
                autoComplete="off"
                placeholder="Child’s first name"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={ids.age}>Child’s Age</label>
              <input
                id={ids.age}
                name="child_age"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder={intent === 'summer-camp' ? 'Ages 3–12' : 'Age'}
                disabled={sending}
              />
            </div>
          </>
        )}

        {showPartyFields && (
          <>
            <div className="field">
              <label htmlFor={ids.childBday}>Birthday Child’s Name</label>
              <input
                id={ids.childBday}
                name="child_name"
                type="text"
                autoComplete="off"
                placeholder="Birthday child’s name"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={ids.ageBday}>Child’s Age</label>
              <input
                id={ids.ageBday}
                name="child_age"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Turning…"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={ids.date}>Preferred Date</label>
              <input
                id={ids.date}
                name="party_date"
                type="text"
                autoComplete="off"
                placeholder="Date & time"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={ids.guests}>Guests</label>
              <select
                id={ids.guests}
                name="guests"
                defaultValue=""
                disabled={sending}
              >
                <option value="" disabled>
                  How many guests?
                </option>
                {EVENT_GUEST_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {showCampFields && (
          <div className="field field--full">
            <label htmlFor={ids.weeks}>Preferred Weeks / Sessions</label>
            <input
              id={ids.weeks}
              name="preferred_weeks"
              type="text"
              autoComplete="off"
              placeholder="e.g. Week of July 7, or any available week"
              disabled={sending}
            />
          </div>
        )}

        <div className="field field--full">
          <label htmlFor={ids.message}>Message</label>
          <textarea
            id={ids.message}
            name="message"
            autoComplete="off"
            placeholder={
              intent === 'birthday'
                ? 'Anything else we should know about the party…'
                : intent === 'summer-camp'
                  ? 'Questions about themes, drop-off, or siblings…'
                  : 'How many kids, preferred Friday, or questions…'
            }
            disabled={sending}
          />
        </div>

        <div className="field field--full">
          <button type="submit" className="btn btn--lg btn--block btn--gold" disabled={sending}>
            {sending ? 'Sending…' : copy.submit}{' '}
            {!sending && <span className="btn__arrow" aria-hidden="true">→</span>}
          </button>
          <p className="form-reassure">{copy.reassure}</p>
        </div>
      </div>
    </form>
  )
}
