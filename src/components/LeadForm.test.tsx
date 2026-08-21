import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { TrialPortalProvider } from '../context/TrialPortalContext'
import { NEXTKICK_TRIAL_FORM } from '../data/contact'
import LeadForm from './LeadForm'

function renderForm() {
  return render(
    <MemoryRouter>
      <TrialPortalProvider>
        <LeadForm />
      </TrialPortalProvider>
    </MemoryRouter>,
  )
}

describe('LeadForm', () => {
  it('opens the NextKick trial portal with the hosted form iframe', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    expect(screen.getByRole('dialog', { name: /1 free time trial/i })).toBeInTheDocument()
    expect(screen.getByTitle(/1 free time trial form/i)).toHaveAttribute(
      'src',
      NEXTKICK_TRIAL_FORM.href,
    )
  })

  it('closes the portal on Escape and restores focus to the opener', async () => {
    const user = userEvent.setup()
    renderForm()

    const opener = screen.getByRole('button', { name: /try a class for free/i })
    await user.click(opener)
    expect(screen.getByRole('dialog', { name: /1 free time trial/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /1 free time trial/i })).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('closes the portal from the close button', async () => {
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /try a class for free/i }))
    const closeButtons = screen.getAllByRole('button', { name: /close trial form/i })
    await user.click(closeButtons[closeButtons.length - 1])

    expect(screen.queryByRole('dialog', { name: /1 free time trial/i })).not.toBeInTheDocument()
  })

  it('exposes a new-tab fallback to the NextKick form', () => {
    renderForm()
    const fallback = screen.getByRole('link', { name: /open the trial form in a new tab/i })
    expect(fallback).toHaveAttribute('href', NEXTKICK_TRIAL_FORM.href)
    expect(fallback).toHaveAttribute('target', '_blank')
  })
})
