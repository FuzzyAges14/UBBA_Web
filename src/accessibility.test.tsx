import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { runAxe } from './test/axe'
import { renderAppAt } from './test/render'

/**
 * Page-level axe smoke checks. Component-level a11y (skip link, hero video,
 * mobile menu, form error summary) lives in `Accessibility.test.tsx`.
 */
const A11Y_ROUTES = [
  '/',
  '/programs/children',
  '/programs/tiny-tigers',
  '/locations/allendale',
  '/just-4-kids/birthday-parties',
  '/contact',
  '/privacy',
] as const

afterEach(() => {
  cleanup()
})

describe('Page-level accessibility checks', () => {
  it.each(A11Y_ROUTES)(
    'has no serious axe violations on %s',
    async (path) => {
      renderAppAt(path)
      const main = await screen.findByRole('main')
      const results = await runAxe(main)
      expect(results).toHaveNoViolations()
    },
    15_000,
  )

  it('keeps a single H1 on the homepage', async () => {
    renderAppAt('/')
    expect(await screen.findAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('opens the NextKick trial portal from the contact page CTA', async () => {
    const user = userEvent.setup()
    renderAppAt('/contact')
    const submit = (await screen.findAllByRole('button', { name: /try a class for free/i }))[0]
    await user.click(submit)
    const dialog = await screen.findByRole('dialog', { name: /1 free time trial/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(within(dialog).getByTitle(/1 free time trial form/i)).toBeInTheDocument()
  })
})
