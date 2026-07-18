import { describe, expect, it } from 'vitest'
import { parseLeadPayload, submitLead } from './leads.ts'

describe('parseLeadPayload', () => {
  it('requires name, email, and phone', () => {
    expect(parseLeadPayload({}).error).toMatch(/full name/i)
    expect(parseLeadPayload({ name: 'A' }).error).toMatch(/email/i)
    expect(parseLeadPayload({ name: 'A', email: 'bad' }).error).toMatch(/valid email/i)
    expect(parseLeadPayload({ name: 'A', email: 'a@b.com' }).error).toMatch(/phone/i)
  })

  it('accepts a valid free-class lead', () => {
    const { lead, error } = parseLeadPayload({
      intent: 'free-class',
      name: ' Jane ',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Allendale',
      program: 'Adult Martial Arts',
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
      program: 'Adult Martial Arts',
      message: 'Hi',
      source: '/',
      partyDate: undefined,
      guests: undefined,
      childName: undefined,
      childAge: undefined,
      preferredWeeks: undefined,
    })
  })

  it('parses birthday and summer-camp structured fields', () => {
    const birthday = parseLeadPayload({
      intent: 'birthday',
      name: 'Sam',
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
      name: 'Jordan',
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
      name: 'Sam',
      email: 'sam@example.com',
      phone: '1',
      program: 'Birthday Parties',
    })
    expect(lead?.intent).toBe('birthday')
  })

  it('treats honeypot fills as spam', () => {
    const result = parseLeadPayload({
      name: 'Bot',
      email: 'bot@example.com',
      phone: '1',
      website: 'http://spam.test',
    })
    expect(result.error).toBe('spam')
  })

  it('rejects non-object bodies', () => {
    expect(parseLeadPayload(null).error).toMatch(/invalid json/i)
    expect(parseLeadPayload('string').error).toMatch(/invalid json/i)
  })

  it('trims and keeps optional fields undefined when blank', () => {
    const { lead, error } = parseLeadPayload({
      name: '  Pat  ',
      email: 'pat@example.com',
      phone: '2015550000',
      location: '   ',
      message: '',
    })
    expect(error).toBeUndefined()
    expect(lead?.name).toBe('Pat')
    expect(lead?.location).toBeUndefined()
    expect(lead?.message).toBeUndefined()
  })
})

describe('submitLead', () => {
  it('returns ok in log mode without SMTP configured', async () => {
    const result = await submitLead({
      intent: 'free-class',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Glen Rock',
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
      phone: '1',
      website: 'filled',
    })
    expect(result.ok).toBe(true)
  })
})
