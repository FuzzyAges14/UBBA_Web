import { useState, type FormEvent } from 'react'
import {
  EVENT_GUEST_OPTIONS,
  GLEN_ROCK,
  LOCATIONS,
  SITE,
  type EventInquiryIntent,
} from '../data/site'

type Errors = Partial<Record<'name' | 'email' | 'phone', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const locationChoices = [
  ...LOCATIONS.map((l) => l.name),
  ...(SITE.showGlenRock ? [GLEN_ROCK.name] : []),
]

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
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const copy = COPY[intent]
  const showPartyFields = intent === 'birthday'

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      // No backend yet — same pattern as LeadForm.
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="leadform leadform--event">
        <div className="form-success" role="status">
          <div className="form-success__icon">{intent === 'birthday' ? '🎂' : intent === 'summer-camp' ? '☀️' : '🍕'}</div>
          <h3>{copy.successTitle}</h3>
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
    <form className="leadform leadform--event" onSubmit={handleSubmit} noValidate>
      <div className="leadform__head">
        <span className="eyebrow">{copy.eyebrow}</span>
      </div>
      <div className="leadform__steps" aria-hidden="true">
        <i className="on" />
        <i className="on" />
        <i className="on" />
      </div>
      <input type="hidden" name="program" value={copy.programValue} />
      <input type="hidden" name="intent" value={intent} />
      <div className="form-grid">
        <div className="field field--full">
          <label htmlFor={`event-name-${intent}`}>Full Name</label>
          <input
            id={`event-name-${intent}`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            placeholder="Your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor={`event-email-${intent}`}>Email</label>
          <input
            id={`event-email-${intent}`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor={`event-phone-${intent}`}>Phone</label>
          <input
            id={`event-phone-${intent}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? 'true' : undefined}
            placeholder="(201) 555-0123"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor={`event-location-${intent}`}>Location</label>
          <select
            id={`event-location-${intent}`}
            name="location"
            defaultValue={defaultLocation ?? ''}
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

        {showPartyFields && (
          <>
            <div className="field">
              <label htmlFor={`event-date-${intent}`}>Preferred Date</label>
              <input
                id={`event-date-${intent}`}
                name="party_date"
                type="text"
                placeholder="Date & time"
              />
            </div>
            <div className="field">
              <label htmlFor={`event-guests-${intent}`}>Guests</label>
              <select id={`event-guests-${intent}`} name="guests" defaultValue="">
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

        <div className="field field--full">
          <label htmlFor={`event-message-${intent}`}>Message</label>
          <textarea
            id={`event-message-${intent}`}
            name="message"
            placeholder={
              intent === 'birthday'
                ? 'Birthday child’s name, age, or anything we should know…'
                : intent === 'summer-camp'
                  ? 'Child’s age, preferred weeks, or questions…'
                  : 'How many kids, preferred Friday, or questions…'
            }
          />
        </div>

        <div className="field field--full">
          <button type="submit" className="btn btn--lg btn--block btn--gold">
            {copy.submit} <span className="btn__arrow">→</span>
          </button>
          <p className="form-reassure">{copy.reassure}</p>
        </div>
      </div>
    </form>
  )
}
