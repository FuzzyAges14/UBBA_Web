import { describe, expect, it } from 'vitest'
import { parseLeadPayload, submitLead } from './leads.ts'

describe('parseLeadPayload', () => {
  it('requires name, email, and phone', () => {
    expect(parseLeadPayload({}).error).toMatch(/full name/i)
    expect(parseLeadPayload({ name: 'A' }).error).toMatch(/email/i)
    expect(parseLeadPayload({ name: 'A', email: 'bad' }).error).toMatch(/valid email/i)
    expect(parseLeadPayload({ name: 'A', email: 'a@b.com' }).error).toMatch(/phone/i)
  })

  it('accepts a valid lead', () => {
    const { lead, error } = parseLeadPayload({
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
      name: 'Jane',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Allendale',
      program: 'Adult Martial Arts',
      message: 'Hi',
      source: '/',
    })
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
})

describe('submitLead', () => {
  it('returns ok in log mode without SMTP configured', async () => {
    const result = await submitLead({
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2015550123',
      location: 'Glen Rock',
    })
    expect(result).toEqual({ ok: true, delivered: false, mode: 'log' })
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
