import { useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCATIONS, PROGRAM_OPTIONS, GLEN_ROCK, SITE } from '../data/site'
import { submitLead } from '../lib/submitLead'

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'form', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const locationChoices = [
  ...LOCATIONS.map((l) => l.name),
  ...(SITE.showGlenRock ? [GLEN_ROCK.name] : []),
]

export default function LeadForm({ defaultLocation }: { defaultLocation?: string }) {
  const location = useLocation()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
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
        intent: 'free-class',
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        location: String(data.get('location') ?? '').trim() || undefined,
        program: String(data.get('program') ?? '').trim() || undefined,
        message: String(data.get('message') ?? '').trim() || undefined,
        website: String(data.get('website') ?? '').trim() || undefined,
        source: location.pathname || '/',
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
        {/* Honeypot — hidden from people, filled by many bots */}
        <div className="field field--full" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field field--full">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
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
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
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
          <label htmlFor="location">Location</label>
          <select
            id="location"
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

        <div className="field">
          <label htmlFor="program">Program</label>
          <select id="program" name="program" defaultValue="" disabled={sending}>
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
            disabled={sending}
          />
        </div>

        <div className="field field--full">
          {errors.form && (
            <span className="error" role="alert" style={{ display: 'block', marginBottom: '0.75rem' }}>
              {errors.form}
            </span>
          )}
          <button type="submit" className="btn btn--lg btn--block" disabled={sending}>
            {sending ? 'Sending…' : SITE.primaryCta}{' '}
            {!sending && <span className="btn__arrow">→</span>}
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
