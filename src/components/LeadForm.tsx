import { useState, type FormEvent } from 'react'
import { LOCATIONS, PROGRAM_OPTIONS, GLEN_ROCK, SITE } from '../data/site'

type Errors = Partial<Record<'name' | 'email' | 'phone', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const locationChoices = [
  ...LOCATIONS.map((l) => l.name),
  ...(SITE.showGlenRock ? [GLEN_ROCK.name] : []),
]

export default function LeadForm({ defaultLocation }: { defaultLocation?: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

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
      // No backend yet: capture intent client-side and show confirmation.
      // Wire this up to a form service (e.g. Formspree) or CRM when ready.
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="leadform">
        <div className="form-success" role="status">
          <div className="form-success__icon">🥋</div>
          <h3>You're all set!</h3>
          <p>
            Thanks for reaching out. A member of our team will contact you shortly
            to schedule your free class.
          </p>
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
    <form className="leadform" onSubmit={handleSubmit} noValidate>
      <div className="leadform__head">
        <span className="eyebrow">Free Class Request</span>
      </div>
      <div className="leadform__steps" aria-hidden="true">
        <i className="on" />
        <i className="on" />
        <i className="on" />
      </div>
      <div className="form-grid">
        <div className="field field--full">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? 'true' : undefined}
            placeholder="Your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : undefined}
            placeholder="you@example.com"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={errors.phone ? 'true' : undefined}
            placeholder="(201) 555-0123"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <select id="location" name="location" defaultValue={defaultLocation ?? ''}>
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

        <div className="field">
          <label htmlFor="program">Program</label>
          <select id="program" name="program" defaultValue="">
            <option value="" disabled>
              Choose a program
            </option>
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="field field--full">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us a bit about what you're looking for..."
          />
        </div>

        <div className="field field--full">
          <button type="submit" className="btn btn--lg btn--block">
            {SITE.primaryCta} <span className="btn__arrow">→</span>
          </button>
          <p className="form-reassure">
            No experience required · Beginners welcome · No obligation — we'll
            contact you to schedule your first class.
          </p>
        </div>
      </div>
    </form>
  )
}
