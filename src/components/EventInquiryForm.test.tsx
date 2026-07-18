import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import EventInquiryForm from './EventInquiryForm'

function renderForm(intent: 'birthday' | 'summer-camp' | 'parents-night-out') {
  return render(
    <MemoryRouter initialEntries={[`/just-4-kids/${intent === 'birthday' ? 'birthday-parties' : intent}`]}>
      <EventInquiryForm intent={intent} />
    </MemoryRouter>,
  )
}

describe('EventInquiryForm', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: true, delivered: true, mode: 'email' }),
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts a birthday inquiry with structured party fields', async () => {
    const user = userEvent.setup()
    renderForm('birthday')

    await user.type(screen.getByLabelText(/parent \/ guardian name/i), 'Sam Parent')
    await user.type(screen.getByLabelText(/email/i), 'sam@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015559999')
    await user.type(screen.getByLabelText(/birthday child’s name/i), 'Alex')
    await user.type(screen.getByLabelText(/child’s age/i), '7')
    await user.type(screen.getByLabelText(/preferred date/i), 'Sat 2pm')
    await user.selectOptions(screen.getByLabelText(/guests/i), '6-10')
    await user.click(screen.getByRole('button', { name: /schedule my party/i }))

    await waitFor(() => {
      expect(screen.getByText(/party request sent/i)).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({ method: 'POST' }),
    )
    const body = JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string)
    expect(body).toMatchObject({
      intent: 'birthday',
      name: 'Sam Parent',
      email: 'sam@example.com',
      phone: '2015559999',
      program: 'Birthday Parties',
      childName: 'Alex',
      childAge: '7',
      partyDate: 'Sat 2pm',
      guests: '6-10',
      source: '/just-4-kids/birthday-parties',
    })
  })

  it('posts a summer camp inquiry with child and week fields', async () => {
    const user = userEvent.setup()
    renderForm('summer-camp')

    await user.type(screen.getByLabelText(/parent \/ guardian name/i), 'Jordan Lee')
    await user.type(screen.getByLabelText(/email/i), 'jordan@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015551111')
    await user.type(screen.getByLabelText(/child’s name/i), 'Mia')
    await user.type(screen.getByLabelText(/child’s age/i), '8')
    await user.type(screen.getByLabelText(/preferred weeks/i), 'Week of July 7')
    await user.click(screen.getByRole('button', { name: /reserve a spot/i }))

    await waitFor(() => {
      expect(screen.getByText(/camp inquiry sent/i)).toBeInTheDocument()
    })

    const body = JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string)
    expect(body).toMatchObject({
      intent: 'summer-camp',
      name: 'Jordan Lee',
      program: 'Summer / Day Camp',
      childName: 'Mia',
      childAge: '8',
      preferredWeeks: 'Week of July 7',
      source: '/just-4-kids/summer-camp',
    })
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderForm('birthday')
    await user.click(screen.getByRole('button', { name: /schedule my party/i }))
    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })
})
