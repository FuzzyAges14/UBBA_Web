import { describe, expect, it } from 'vitest'
import { buildLeadEmail } from './email.ts'

describe('buildLeadEmail', () => {
  it('formats a detailed plain-text and HTML message', () => {
    const { subject, text, html } = buildLeadEmail({
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

    expect(text).toContain('Name:       Jane Doe')
    expect(text).toContain('Email:      jane@example.com')
    expect(text).toContain('Phone:      (201) 555-0123')
    expect(text).toContain('Location:   Allendale')
    expect(text).toContain('Program:    Tiny Tigers (Ages 3-5)')
    expect(text).toContain('Looking for a weekday class.')
    expect(text).toContain('Source:     /contact')

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

  it('labels Just 4 Kids birthday inquiries distinctly', () => {
    const { subject, text, html } = buildLeadEmail({
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015559999',
      location: 'Midland Park',
      program: 'Birthday Parties',
      message: 'Preferred date: Sat 2pm\nGuests: 6-10',
      source: '/just-4-kids/birthday-parties',
    })

    expect(subject).toContain('Birthday Party Inquiry')
    expect(subject).not.toContain('Free Class Request')
    expect(text).toContain('BIRTHDAY PARTY INQUIRY')
    expect(html).toContain('Birthday Party Inquiry')
    expect(html).toContain('Preferred date: Sat 2pm')
  })
})
