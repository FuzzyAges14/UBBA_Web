import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LeadForm from './LeadForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <LeadForm />
    </MemoryRouter>,
  )
}

describe('LeadForm', () => {
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

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter a phone number/i)).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('rejects an invalid email', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('posts to the API and shows success on valid submission', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    await waitFor(() => {
      expect(screen.getByText(/you're all set/i)).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    const body = JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls[0][1].body as string)
    expect(body).toMatchObject({
      intent: 'free-class',
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '2015550123',
    })
  })

  it('shows an error when the API fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ ok: false, error: 'Could not send your request.' }),
      }),
    )
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/could not send/i)
    })
    expect(screen.queryByText(/you're all set/i)).not.toBeInTheDocument()
  })

  it('shows a loading state and prevents duplicate submits while sending', async () => {
    let resolveFetch: ((value: unknown) => void) | undefined
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve
          }),
      ),
    )
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    const sendingButton = screen.getByRole('button', { name: /sending/i })
    expect(sendingButton).toBeDisabled()
    expect(fetch).toHaveBeenCalledTimes(1)

    await user.click(sendingButton)
    expect(fetch).toHaveBeenCalledTimes(1)

    resolveFetch?.({
      ok: true,
      json: async () => ({ ok: true, delivered: true, mode: 'email' }),
    })

    await waitFor(() => {
      expect(screen.getByText(/you're all set/i)).toBeInTheDocument()
    })
  })

  it('submits via keyboard Enter from a text field', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123{Enter}')

    await waitFor(() => {
      expect(screen.getByText(/you're all set/i)).toBeInTheDocument()
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('shows a network error when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/could not reach the server/i)
    })
  })

  it('preselects program and location from the query string', () => {
    render(
      <MemoryRouter
        initialEntries={['/programs/children?program=tiny-tigers&location=glen-rock']}
      >
        <LeadForm />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/program/i)).toHaveValue('Tiny Tigers (Ages 3-5)')
    expect(screen.getByLabelText(/location/i)).toHaveValue('Glen Rock')
  })

  it('ignores invalid program query values without breaking the form', () => {
    render(
      <MemoryRouter initialEntries={['/contact?program=not-a-real-program']}>
        <LeadForm />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/program/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /try a class for free/i })).toBeEnabled()
  })

  it('accepts a defaultProgram prop over an empty query string', () => {
    render(
      <MemoryRouter initialEntries={['/programs/children']}>
        <LeadForm defaultProgram="junior-tigers" submitLabel="Schedule a Free Class" />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/program/i)).toHaveValue('Junior Tigers (Ages 6-10)')
    expect(
      screen.getByRole('button', { name: /schedule a free class/i }),
    ).toBeInTheDocument()
  })
})
