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
    vi.stubGlobal('navigator', {
      ...navigator,
      connection: { saveData: false, effectiveType: '4g' },
    })
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
})

describe('Accessibility: lead form', () => {
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

  it('associates errors with fields and shows an error summary', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <LeadForm />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /try a class for free/i }))

    const summary = screen.getByRole('alert')
    expect(summary).toHaveTextContent(/please fix the following/i)
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(/phone/i)).toHaveAttribute('aria-invalid', 'true')
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
