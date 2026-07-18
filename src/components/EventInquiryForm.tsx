import { useState, type FormEvent } from 'react'
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
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const copy = COPY[intent]
  const showPartyFields = intent === 'birthday'
  const showCampFields = intent === 'summer-camp'
  const showChildFields = intent === 'summer-camp' || intent === 'parents-night-out'

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

  if (submitted) {
    return (
      <div className="leadform leadform--event">
        <div className="form-success" role="status">
          <div className="form-success__icon">
            {intent === 'birthday' ? '🎂' : intent === 'summer-camp' ? '☀️' : '🍕'}
          </div>
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
      <div className="form-grid">
        <div
          className="field field--full"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}
        >
          <label htmlFor={`event-website-${intent}`}>Website</label>
          <input
            id={`event-website-${intent}`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="field field--full">
          <label htmlFor={`event-name-${intent}`}>Parent / Guardian Name</label>
          <input
            id={`event-name-${intent}`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            placeholder="Your name"
            disabled={sending}
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
            disabled={sending}
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
            disabled={sending}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor={`event-location-${intent}`}>Location</label>
          <select
            id={`event-location-${intent}`}
            name="location"
            defaultValue={defaultLocation ?? ''}
            disabled={sending}
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
              <label htmlFor={`event-child-${intent}`}>Child’s Name</label>
              <input
                id={`event-child-${intent}`}
                name="child_name"
                type="text"
                placeholder="Child’s first name"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={`event-age-${intent}`}>Child’s Age</label>
              <input
                id={`event-age-${intent}`}
                name="child_age"
                type="text"
                inputMode="numeric"
                placeholder={intent === 'summer-camp' ? 'Ages 3–12' : 'Age'}
                disabled={sending}
              />
            </div>
          </>
        )}

        {showPartyFields && (
          <>
            <div className="field">
              <label htmlFor={`event-child-bday-${intent}`}>Birthday Child’s Name</label>
              <input
                id={`event-child-bday-${intent}`}
                name="child_name"
                type="text"
                placeholder="Birthday child’s name"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={`event-age-bday-${intent}`}>Child’s Age</label>
              <input
                id={`event-age-bday-${intent}`}
                name="child_age"
                type="text"
                inputMode="numeric"
                placeholder="Turning…"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={`event-date-${intent}`}>Preferred Date</label>
              <input
                id={`event-date-${intent}`}
                name="party_date"
                type="text"
                placeholder="Date & time"
                disabled={sending}
              />
            </div>
            <div className="field">
              <label htmlFor={`event-guests-${intent}`}>Guests</label>
              <select
                id={`event-guests-${intent}`}
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
            <label htmlFor={`event-weeks-${intent}`}>Preferred Weeks / Sessions</label>
            <input
              id={`event-weeks-${intent}`}
              name="preferred_weeks"
              type="text"
              placeholder="e.g. Week of July 7, or any available week"
              disabled={sending}
            />
          </div>
        )}

        <div className="field field--full">
          <label htmlFor={`event-message-${intent}`}>Message</label>
          <textarea
            id={`event-message-${intent}`}
            name="message"
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
          {errors.form && (
            <span className="error" role="alert" style={{ display: 'block', marginBottom: '0.75rem' }}>
              {errors.form}
            </span>
          )}
          <button type="submit" className="btn btn--lg btn--block btn--gold" disabled={sending}>
            {sending ? 'Sending…' : copy.submit}{' '}
            {!sending && <span className="btn__arrow">→</span>}
          </button>
          <p className="form-reassure">{copy.reassure}</p>
        </div>
      </div>
    </form>
  )
}
