import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCATIONS, PROGRAM_OPTIONS, GLEN_ROCK, SITE } from '../data/site'
import { submitLead } from '../lib/submitLead'

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'form', string>>

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const locationChoices = [
  ...LOCATIONS.map((l) => l.name),
  ...(SITE.showGlenRock ? [GLEN_ROCK.name] : []),
]

const FIELD_ORDER = ['name', 'email', 'phone'] as const

export default function LeadForm({ defaultLocation }: { defaultLocation?: string }) {
  const location = useLocation()
  const formId = useId()
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
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

  const ids = {
    name: `${formId}-name`,
    email: `${formId}-email`,
    phone: `${formId}-phone`,
    location: `${formId}-location`,
    program: `${formId}-program`,
    message: `${formId}-message`,
    website: `${formId}-website`,
    summary: `${formId}-summary`,
  }

  const fieldErrors = FIELD_ORDER.filter((key) => errors[key])
  const fieldLabels = { name: 'Full Name', email: 'Email', phone: 'Phone' } as const

  if (submitted) {
    return (
      <div className="leadform">
        <div className="form-success" role="status" aria-live="polite">
          <div className="form-success__icon" aria-hidden="true">
            🥋
          </div>
          <h3 ref={successRef} tabIndex={-1}>
            You&apos;re all set!
          </h3>
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
    <form
      className="leadform"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={sending || undefined}
    >
      <div className="leadform__head">
        <span className="eyebrow">Free Class Request</span>
      </div>
      <p className="form-instructions" id={`${formId}-instructions`}>
        Fields marked with an asterisk (*) are required. We&apos;ll use your contact
        details only to schedule your free class.
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
        {/* Honeypot — hidden from people, filled by many bots */}
        <div
          className="field field--full hp-field"
          aria-hidden="true"
        >
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
            Full Name <span className="req" aria-hidden="true">*</span>
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

        <div className="field">
          <label htmlFor={ids.program}>Program</label>
          <select id={ids.program} name="program" defaultValue="" disabled={sending}>
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
          <label htmlFor={ids.message}>Message</label>
          <textarea
            id={ids.message}
            name="message"
            placeholder="Tell us a bit about what you're looking for..."
            disabled={sending}
            autoComplete="off"
          />
        </div>

        <div className="field field--full">
          <button type="submit" className="btn btn--lg btn--block" disabled={sending}>
            {sending ? 'Sending…' : SITE.primaryCta}{' '}
            {!sending && <span className="btn__arrow" aria-hidden="true">→</span>}
          </button>
          <p className="form-reassure">
            No experience required · Beginners welcome · No obligation — we&apos;ll
            contact you to schedule your first class.
          </p>
        </div>
      </div>
    </form>
  )
}
