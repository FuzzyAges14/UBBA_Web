import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { resolveSeo } from './data/seo'
import { PROGRAM_DETAILS } from './data/site'
import { renderAppAt } from './test/render'

afterEach(() => {
  cleanup()
})

const PUBLIC_ROUTES: Array<{ path: string; h1: RegExp }> = [
  { path: '/', h1: /united\s+black\s+belt\s+academy/i },
  { path: '/programs/children', h1: /children's martial arts programs/i },
  { path: '/programs/adult', h1: /adult & family martial arts/i },
  { path: '/just-4-kids', h1: /the fun doesn't stop at the mat/i },
  { path: '/just-4-kids/birthday-parties', h1: /most exciting birthday party ever/i },
  { path: '/just-4-kids/summer-camp', h1: /most exciting summer ever/i },
  { path: '/just-4-kids/parents-night-out', h1: /fun for kids\. relaxation for you/i },
  { path: '/follow-us', h1: /^follow us$/i },
  { path: '/follow-us/instagram', h1: /^instagram$/i },
  { path: '/follow-us/facebook', h1: /^facebook$/i },
  { path: '/locations/allendale', h1: /allendale martial arts classes/i },
  { path: '/locations/midland-park', h1: /midland park martial arts classes/i },
  { path: '/contact', h1: /try a class for free/i },
  { path: '/privacy', h1: /privacy policy/i },
  { path: '/terms', h1: /terms and conditions/i },
]

describe('Public routes', () => {
  it.each(PUBLIC_ROUTES)(
    'loads $path with a unique H1 and document title',
    async ({ path, h1 }) => {
      renderAppAt(path)

      const heading = await screen.findByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent(h1)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

      const expected = resolveSeo(path)
      await waitFor(() => {
        expect(document.title).toBe(expected.title)
      })
      const description = document.querySelector('meta[name="description"]')
      expect(description?.getAttribute('content')).toBe(expected.description)
    },
  )

  it.each(PROGRAM_DETAILS.map((p) => [p.slug, p.name] as const))(
    'loads program detail /programs/%s with H1 %s',
    async (slug, name) => {
      renderAppAt(`/programs/${slug}`)
      expect(await screen.findByRole('heading', { level: 1, name })).toBeInTheDocument()
      await waitFor(() => {
        expect(document.title).toContain(name)
      })
    },
  )

  it('handles unknown routes with a 404 H1', async () => {
    renderAppAt('/this-route-does-not-exist')
    expect(
      await screen.findByRole('heading', { level: 1, name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('navigates from primary nav Contact link to the contact page', async () => {
    const user = userEvent.setup()
    renderAppAt('/')

    const primaryNav = await screen.findByRole('navigation', { name: /primary/i })
    await user.click(within(primaryNav).getByRole('link', { name: /^contact$/i }))

    expect(
      await screen.findByRole('heading', { level: 1, name: /try a class for free/i }),
    ).toBeInTheDocument()
    await waitFor(() => {
      expect(document.title).toBe(resolveSeo('/contact').title)
    })
  })

  it('navigates from Programs mega menu to Tiny Tigers detail', async () => {
    renderAppAt('/')

    const primaryNav = await screen.findByRole('navigation', { name: /primary/i })
    fireEvent.click(within(primaryNav).getByRole('button', { name: /programs/i }))
    const programsPanel = primaryNav.querySelector('.mega:not(.mega--j4k)')
    expect(programsPanel).toBeTruthy()
    fireEvent.click(
      within(programsPanel as HTMLElement).getByRole('link', { name: /tiny tigers/i }),
    )

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /^tiny tigers$/i,
      }),
    ).toBeInTheDocument()
  })

  it('navigates from Just 4 Kids menu to birthday parties', async () => {
    renderAppAt('/')

    const primaryNav = await screen.findByRole('navigation', { name: /primary/i })
    fireEvent.click(within(primaryNav).getByRole('button', { name: /just 4 kids/i }))
    const j4kPanel = primaryNav.querySelector('.mega--j4k')
    expect(j4kPanel).toBeTruthy()
    fireEvent.click(
      within(j4kPanel as HTMLElement).getByRole('link', { name: /birthday parties/i }),
    )

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /most exciting birthday party ever/i,
      }),
    ).toBeInTheDocument()
  })
})
