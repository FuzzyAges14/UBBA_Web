import { describe, expect, it } from 'vitest'
import { buildLeadEmail, requestLabelForLead } from './email.ts'

describe('buildLeadEmail', () => {
  it('formats a detailed plain-text and HTML free-class message', () => {
    const { subject, text, html } = buildLeadEmail({
      intent: 'free-class',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '(201) 555-0123',
      location: 'Allendale',
      program: 'Tiny Tigers (Ages 3-5)',
      message: 'Looking for a weekday class.',
      source: '/contact',
    })

    expect(subject).toContain('Free Class Request')
    expect(subject).toContain('Jane Doe')
    expect(subject).toContain('Allendale')

    expect(text).toContain('Jane Doe')
    expect(text).toContain('jane@example.com')
    expect(text).toContain('(201) 555-0123')
    expect(text).toContain('Allendale')
    expect(text).toContain('Tiny Tigers (Ages 3-5)')
    expect(text).toContain('Looking for a weekday class.')
    expect(text).toContain('Source:        /contact')

    expect(html).toContain('Free Class Request')
    expect(html).toContain('Jane Doe')
    expect(html).toContain('mailto:jane@example.com')
    expect(html).toContain('Tiny Tigers (Ages 3-5)')
    expect(html).toContain('Looking for a weekday class.')
  })

  it('escapes HTML in visitor-provided fields', () => {
    const { html } = buildLeadEmail({
      name: '<script>alert(1)</script>',
      email: 'safe@example.com',
      phone: '2015550000',
      message: '<b>bold</b>',
    })
    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;b&gt;bold&lt;/b&gt;')
  })

  it('formats birthday inquiries with structured party fields', () => {
    const { subject, text, html } = buildLeadEmail({
      intent: 'birthday',
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015559999',
      location: 'Midland Park',
      program: 'Birthday Parties',
      childName: 'Alex',
      childAge: '7',
      partyDate: 'Sat July 26 at 2pm',
      guests: '6-10',
      message: 'Please have board breaking.',
      source: '/just-4-kids/birthday-parties',
    })

    expect(subject).toContain('Birthday Party Inquiry')
    expect(subject).not.toContain('Free Class Request')
    expect(text).toContain('BIRTHDAY PARTY INQUIRY')
    expect(text).toContain('Preferred date:')
    expect(text).toContain('Sat July 26 at 2pm')
    expect(text).toContain('Guests:')
    expect(text).toContain('6-10')
    expect(text).toContain('Alex')
    expect(html).toContain('Birthday Party Inquiry')
    expect(html).toContain('Preferred date')
    expect(html).toContain('Sat July 26 at 2pm')
    expect(html).toContain('Alex')
  })

  it('formats summer camp inquiries with child and week details', () => {
    const { subject, text, html } = buildLeadEmail({
      intent: 'summer-camp',
      name: 'Jordan Lee',
      email: 'jordan@example.com',
      phone: '2015551111',
      location: 'Allendale',
      program: 'Summer / Day Camp',
      childName: 'Mia',
      childAge: '8',
      preferredWeeks: 'Week of July 7',
      message: 'Needs early drop-off.',
      source: '/just-4-kids/summer-camp',
    })

    expect(requestLabelForLead({ intent: 'summer-camp' })).toBe('Summer Camp Inquiry')
    expect(subject).toContain('Summer Camp Inquiry')
    expect(text).toContain('SUMMER CAMP INQUIRY')
    expect(text).toContain('Mia')
    expect(text).toContain('Preferred weeks:')
    expect(text).toContain('Week of July 7')
    expect(html).toContain('Summer Camp Inquiry')
    expect(html).toContain('Preferred weeks')
    expect(html).toContain('Week of July 7')
  })
})
