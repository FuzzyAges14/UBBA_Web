import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'jest-axe'
import App from '../App'
import Faq from './Faq'
import HeroMedia from './HeroMedia'
import LeadForm from './LeadForm'
import SkipLink from './SkipLink'

function mockMatchMedia(reduced: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: reduced && query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  })
}

describe('Accessibility: skip link', () => {
  it('renders a skip link targeting main content', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    const skip = screen.getByRole('link', { name: /skip to main content/i })
    expect(skip).toHaveAttribute('href', '#main')
    expect(document.getElementById('main')).toBeTruthy()
  })

  it('SkipLink component exposes the expected label', () => {
    render(<SkipLink />)
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument()
  })
})

describe('Accessibility: hero video', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
    HTMLMediaElement.prototype.pause = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    mockMatchMedia(false)
  })

  it('exposes a keyboard-operable pause/play control', async () => {
    const user = userEvent.setup()
    render(<HeroMedia />)

    const toggle = screen.getByRole('button', {
      name: /play background video|pause background video/i,
    })
    expect(toggle).toBeInTheDocument()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed')
  })

  it('does not autoplay when reduced motion is preferred', () => {
    mockMatchMedia(true)
    const play = vi.fn().mockResolvedValue(undefined)
    HTMLMediaElement.prototype.play = play

    render(<HeroMedia />)
    expect(screen.getByRole('button', { name: /play background video/i })).toBeInTheDocument()
    expect(play).not.toHaveBeenCalled()
  })
})

describe('Accessibility: mobile menu', () => {
  it('toggles aria-expanded and closes on Escape with focus restore', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    const menuBtn = screen.getByRole('button', { name: /open menu/i })
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    expect(menuBtn).toHaveAttribute('aria-controls', 'mobile-nav')

    await user.click(menuBtn)
    expect(menuBtn).toHaveAttribute('aria-expanded', 'true')
    expect(menuBtn).toHaveAttribute('aria-label', 'Close menu')

    const drawer = document.getElementById('mobile-nav')
    expect(drawer).toHaveAttribute('role', 'dialog')
    expect(drawer).toHaveAttribute('aria-hidden', 'false')

    await user.keyboard('{Escape}')
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')
    expect(menuBtn).toHaveFocus()
  })

  it('exposes correct aria-expanded on Programs mega menu', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    const primary = screen.getByRole('navigation', { name: /primary/i })
    const programs = within(primary).getByRole('button', { name: /programs/i })
    expect(programs).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(programs)
    expect(programs).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(programs).toHaveAttribute('aria-expanded', 'false')
  })

  it('restores focus to the Programs trigger after Escape closes the mega menu', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    const primary = screen.getByRole('navigation', { name: /primary/i })
    const programs = within(primary).getByRole('button', { name: /programs/i })
    // Desktop nav is CSS-hidden in jsdom; fireEvent still exercises the handler.
    fireEvent.click(programs)
    expect(programs).toHaveAttribute('aria-expanded', 'true')
    programs.focus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(programs).toHaveAttribute('aria-expanded', 'false')
    expect(programs).toHaveFocus()
  })
})

describe('Accessibility: lead form', () => {
  it('opens a labelled modal portal for the NextKick trial form', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )

    const opener = (await screen.findAllByRole('button', { name: /try a class for free/i }))[0]
    await user.click(opener)

    const dialog = screen.getByRole('dialog', { name: /1 free time trial/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    await user.click(within(dialog).getByText('Allendale'))
    expect(screen.getByTitle(/1 free time trial — allendale form/i)).toBeInTheDocument()
  })
})

describe('Accessibility: axe smoke checks', () => {
  it('has no serious/critical axe violations on LeadForm', async () => {
    const { container } = render(
      <MemoryRouter>
        <LeadForm />
      </MemoryRouter>,
    )
    const results = await axe(container, {
      rules: { 'color-contrast': { enabled: false } },
    })
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    )
    expect(serious.map((v) => `${v.id}:${v.help}`)).toEqual([])
  }, 15000)

  it('has no serious/critical axe violations on Faq accordion', async () => {
    const { container } = render(
      <Faq
        items={[
          { q: 'What age can children start?', a: 'Many children begin around age 3; ask us about readiness.' },
          { q: 'How does the free trial work?', a: 'Request a free class and we will help you schedule it.' },
        ]}
      />,
    )
    const results = await axe(container, {
      rules: { 'color-contrast': { enabled: false } },
    })
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    )
    expect(serious.map((v) => `${v.id}:${v.help}`)).toEqual([])
  }, 15000)
})
