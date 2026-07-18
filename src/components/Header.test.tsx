import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../App'
import Header from './Header'

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  )
}

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('Header navigation', () => {
  it('exposes mobile menu controls with correct ARIA', async () => {
    const user = userEvent.setup()
    renderHeader()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav')

    const drawer = document.getElementById('mobile-nav')
    expect(drawer).toHaveAttribute('aria-hidden', 'true')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAttribute('aria-label', 'Close menu')
    expect(drawer).toHaveAttribute('aria-hidden', 'false')
  })

  it('closes the mobile menu with Escape and restores focus', async () => {
    const user = userEvent.setup()
    renderHeader()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('closes the mobile menu after navigating to a route', async () => {
    const user = userEvent.setup()
    renderApp()

    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)

    const mobileNav = screen.getByRole('navigation', { name: /mobile/i })
    await user.click(within(mobileNav).getByRole('link', { name: /^contact$/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })
    expect(
      screen.getByRole('heading', { level: 1, name: /try a class for free/i }),
    ).toBeInTheDocument()
  })

  it('expands the mobile Programs accordion', async () => {
    const user = userEvent.setup()
    renderHeader()

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    const programsTrigger = screen.getByRole('button', { name: /^programs$/i })
    expect(programsTrigger).toHaveAttribute('aria-expanded', 'false')
    expect(programsTrigger).toHaveAttribute('aria-controls', 'mobile-programs')

    await user.click(programsTrigger)
    expect(programsTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: /tiny tigers/i })).toBeInTheDocument()
  })

  it('provides a skip link to main content', async () => {
    const user = userEvent.setup()
    renderApp()

    const skip = screen.getByRole('link', { name: /skip to main content/i })
    expect(skip).toHaveAttribute('href', '#main')

    skip.focus()
    expect(skip).toHaveFocus()
    await user.keyboard('{Enter}')

    const main = document.getElementById('main')
    expect(main).toBeTruthy()
  })
})
