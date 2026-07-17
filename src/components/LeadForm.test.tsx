import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import LeadForm from './LeadForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <LeadForm />
    </MemoryRouter>,
  )
}

describe('LeadForm', () => {
  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderForm()
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter a phone number/i)).toBeInTheDocument()
  })

  it('rejects an invalid email', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })

  it('shows a success message on valid submission', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.type(screen.getByLabelText(/phone/i), '2015550123')
    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByText(/you're all set/i)).toBeInTheDocument()
  })
})
