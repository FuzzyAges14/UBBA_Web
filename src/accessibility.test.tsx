import { cleanup, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { runAxe } from './test/axe'
import { renderAppAt } from './test/render'

const A11Y_ROUTES = [
  '/',
  '/programs/children',
  '/programs/adult',
  '/programs/tiny-tigers',
  '/just-4-kids',
  '/just-4-kids/birthday-parties',
  '/locations/allendale',
  '/contact',
  '/privacy',
] as const

describe('Automated accessibility checks', () => {
  afterEach(() => {
    cleanup()
  })

  it.each(A11Y_ROUTES)(
    'has no serious axe violations on %s',
    async (path) => {
      renderAppAt(path)
      // Wait for lazy route content before scanning.
      await screen.findByRole('heading', { level: 1 })
      const main = document.getElementById('main')
      expect(main).toBeTruthy()
      const results = await runAxe(main as HTMLElement)
      expect(results).toHaveNoViolations()
    },
    15_000,
  )

  it('keeps a single H1 on the homepage', async () => {
    renderAppAt('/')
    expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('associates free-class form fields with visible labels', async () => {
    renderAppAt('/contact')
    const submit = await screen.findByRole('button', { name: /try a class for free/i })
    const form = submit.closest('form')
    expect(form).toBeTruthy()
    const scoped = within(form as HTMLElement)
    // Required asterisks are aria-hidden; labels may include a trailing space before *.
    expect(scoped.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(scoped.getByLabelText(/^email/i)).toBeInTheDocument()
    expect(scoped.getByLabelText(/^phone/i)).toBeInTheDocument()
    expect(scoped.getByLabelText(/^location/i)).toBeInTheDocument()
    expect(scoped.getByLabelText(/^program/i)).toBeInTheDocument()
  })

  it('exposes a skip link to main content', async () => {
    renderAppAt('/')
    const skip = await screen.findByRole('link', { name: /skip to main content/i })
    expect(skip).toHaveAttribute('href', '#main')
    expect(document.getElementById('main')).toBeTruthy()
  })
})
