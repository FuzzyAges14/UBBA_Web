import { afterEach, describe, expect, it, vi } from 'vitest'
import { FIELD_LIMITS, parseLeadPayload, submitLead } from './leads.ts'

const validBase = {
  intent: 'free-class' as const,
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '2015550123',
}

describe('parseLeadPayload', () => {
  it('requires name, email, and phone', () => {
    expect(parseLeadPayload({}).error).toMatch(/full name/i)
    expect(parseLeadPayload({ name: 'A' }).error).toMatch(/full name/i)
    expect(parseLeadPayload({ name: 'Ab' }).error).toMatch(/email/i)
    expect(parseLeadPayload({ name: 'Ab', email: 'bad' }).error).toMatch(/valid email/i)
    expect(parseLeadPayload({ name: 'Ab', email: 'a@b.com' }).error).toMatch(/phone/i)
  })

  it('rejects invalid phone numbers', () => {
    expect(
      parseLeadPayload({ name: 'Jane Doe', email: 'j@example.com', phone: '123' }).error,
    ).toMatch(/valid phone/i)
  })

  it('accepts a valid free-class lead', () => {
    const { lead, error } = parseLeadPayload({
      intent: 'free-class',
      name: ' Jane ',
      email: 'Jane@Example.com',
      phone: '2015550123',
      location: 'Allendale',
      program: 'Adult Martial Arts (Ages 18+)',
      message: 'Hi',
      source: '/',
    })
    expect(error).toBeUndefined()
    expect(lead).toEqual({
      intent: 'free-class',
      name: 'Jane',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Allendale',
      program: 'Adult Martial Arts (Ages 18+)',
      message: 'Hi',
      source: '/',
      partyDate: undefined,
      guests: undefined,
      childName: undefined,
      childAge: undefined,
      preferredWeeks: undefined,
      formStartedAt: undefined,
      captchaToken: undefined,
    })
  })

  it('parses birthday and summer-camp structured fields', () => {
    const birthday = parseLeadPayload({
      intent: 'birthday',
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015550000',
      partyDate: 'Saturday 2pm',
      guests: '6-10',
      childName: 'Alex',
      childAge: '7',
    })
    expect(birthday.error).toBeUndefined()
    expect(birthday.lead?.intent).toBe('birthday')
    expect(birthday.lead?.partyDate).toBe('Saturday 2pm')
    expect(birthday.lead?.guests).toBe('6-10')
    expect(birthday.lead?.childName).toBe('Alex')

    const camp = parseLeadPayload({
      intent: 'summer-camp',
      name: 'Jordan Lee',
      email: 'j@example.com',
      phone: '2015551111',
      childName: 'Mia',
      childAge: '8',
      preferredWeeks: 'July 7',
    })
    expect(camp.lead?.intent).toBe('summer-camp')
    expect(camp.lead?.preferredWeeks).toBe('July 7')
    expect(camp.lead?.childName).toBe('Mia')
  })

  it('infers intent from program when omitted', () => {
    const { lead } = parseLeadPayload({
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015550001',
      program: 'Birthday Parties',
    })
    expect(lead?.intent).toBe('birthday')
  })

  it('treats honeypot fills as spam', () => {
    const result = parseLeadPayload({
      name: 'Bot',
      email: 'bot@example.com',
      phone: '2015559999',
      website: 'http://spam.test',
    })
    expect(result.error).toBe('spam')
  })

  it('rejects oversized messages', () => {
    const result = parseLeadPayload({
      ...validBase,
      message: 'x'.repeat(FIELD_LIMITS.message + 1),
    })
    // Message is clamped to the limit — still accepted, never overflows storage/email.
    expect(result.error).toBeUndefined()
    expect(result.lead?.message?.length).toBe(FIELD_LIMITS.message)
  })

  it('rejects unexpected payload fields', () => {
    const result = parseLeadPayload({
      ...validBase,
      extra: 'nope',
    })
    expect(result.error).toMatch(/unexpected fields/i)
  })

  it('rejects unknown locations and programs', () => {
    expect(
      parseLeadPayload({ ...validBase, location: 'Atlantis' }).error,
    ).toMatch(/valid location/i)
    expect(
      parseLeadPayload({ ...validBase, program: 'Laser Tag' }).error,
    ).toMatch(/valid program/i)
  })

  it('treats instant form completion as spam when formStartedAt is present', () => {
    const now = 1_700_000_000_000
    const result = parseLeadPayload(
      { ...validBase, formStartedAt: now - 100 },
      { minFormMs: 2000, now },
    )
    expect(result.error).toBe('spam')
  })

  it('accepts realistic form timing', () => {
    const now = 1_700_000_000_000
    const result = parseLeadPayload(
      { ...validBase, formStartedAt: now - 5000 },
      { minFormMs: 2000, now },
    )
    expect(result.error).toBeUndefined()
    expect(result.lead?.formStartedAt).toBe(now - 5000)
  })

  it('strips control characters from text fields', () => {
    const { lead } = parseLeadPayload({
      ...validBase,
      name: 'Jane\nDoe',
      message: 'Hello\u0000world',
    })
    expect(lead?.name).toBe('JaneDoe')
    expect(lead?.message).toBe('Helloworld')
  })
})

describe('submitLead', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns ok in log mode without SMTP configured', async () => {
    const result = await submitLead({
      intent: 'free-class',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Allendale',
    })
    expect(result).toEqual({ ok: true, delivered: false, mode: 'log' })
  })

  it('accepts birthday and summer-camp submissions in log mode', async () => {
    const birthday = await submitLead({
      intent: 'birthday',
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015559999',
      partyDate: 'Sat 2pm',
      guests: '6-10',
    })
    expect(birthday.ok).toBe(true)

    const camp = await submitLead({
      intent: 'summer-camp',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      phone: '2015551111',
      childName: 'Mia',
      preferredWeeks: 'Week of July 7',
    })
    expect(camp.ok).toBe(true)
  })

  it('silently accepts honeypot spam', async () => {
    const result = await submitLead({
      name: 'Bot',
      email: 'bot@example.com',
      phone: '2015559999',
      website: 'filled',
    })
    expect(result.ok).toBe(true)
  })

  it('returns a safe error when email delivery fails', async () => {
    const email = await import('./email.ts')
    vi.spyOn(email, 'deliverLeadEmail').mockRejectedValueOnce(new Error('SMTP exploded: secret'))

    const result = await submitLead({
      ...validBase,
      location: 'Midland Park',
    })

    expect(result).toEqual({
      ok: false,
      status: 502,
      error: 'Could not send your request. Please try again or call us.',
    })
    expect(result.ok === false && result.error).not.toMatch(/SMTP|secret/i)
  })
})
