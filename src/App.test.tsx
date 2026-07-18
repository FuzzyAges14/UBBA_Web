import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders the home hero brand H1 and tagline', async () => {
    renderAt('/')
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /united\s+black\s+belt\s+academy/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /confidence building martial arts/i,
      }),
    ).toBeInTheDocument()
  })

  it("renders the Children's Programs page", async () => {
    renderAt('/programs/children')
    expect(
      await screen.findByRole('heading', {
        name: /children's martial arts programs/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/tiny tigers/i).length).toBeGreaterThan(0)
  })

  it('renders the Just 4 Kids page headline', async () => {
    renderAt('/just-4-kids')
    expect(
      await screen.findByRole('heading', { name: /the fun doesn't stop at the mat/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /pick your adventure/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /three steps to fun/i })).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /questions about just 4 kids/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /plan a party/i })).toHaveAttribute(
      'href',
      '/just-4-kids/birthday-parties',
    )
  })

  it('renders the birthday parties detail page with inquiry form', async () => {
    renderAt('/just-4-kids/birthday-parties')
    expect(
      await screen.findByRole('heading', { name: /most exciting birthday party ever/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /schedule my party/i })).toBeInTheDocument()
    expect(screen.getByText(/what we provide/i)).toBeInTheDocument()
  })

  it('renders the summer camp detail page with reserve form', async () => {
    renderAt('/just-4-kids/summer-camp')
    expect(
      await screen.findByRole('heading', {
        name: /most exciting summer ever/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reserve a spot/i })).toBeInTheDocument()
    expect(screen.getByText(/what to bring/i)).toBeInTheDocument()
  })

  it("renders the Parents' Night Out detail page with inquiry form", async () => {
    renderAt('/just-4-kids/parents-night-out')
    expect(
      await screen.findByRole('heading', { name: /fun for kids\. relaxation for you/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save a spot/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^spots fill fast$/i })).toBeInTheDocument()
  })

  it('keeps Just 4 Kids as its own nav item separate from Programs', async () => {
    renderAt('/')

    const primaryNav = await screen.findByRole('navigation', { name: /primary/i })
    expect(
      within(primaryNav).getByRole('link', { name: /follow us/i }),
    ).toHaveAttribute('href', '/follow-us')

    fireEvent.click(screen.getByRole('button', { name: /programs/i }))
    const programsPanel = primaryNav.querySelector('.mega:not(.mega--j4k)')
    expect(programsPanel).toBeTruthy()
    const programs = programsPanel as HTMLElement
    expect(within(programs).queryByRole('link', { name: /birthday parties/i })).toBeNull()
    expect(within(programs).queryByText(/just 4 kids/i)).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /just 4 kids/i }))
    const j4kPanel = primaryNav.querySelector('.mega--j4k')
    expect(j4kPanel).toBeTruthy()
    const panel = j4kPanel as HTMLElement
    expect(within(panel).getByRole('link', { name: /overview/i })).toHaveAttribute(
      'href',
      '/just-4-kids',
    )
    expect(within(panel).getByRole('link', { name: /birthday parties/i })).toHaveAttribute(
      'href',
      '/just-4-kids/birthday-parties',
    )
    expect(within(panel).getByRole('link', { name: /summer \/ day camp/i })).toHaveAttribute(
      'href',
      '/just-4-kids/summer-camp',
    )
    expect(within(panel).getByRole('link', { name: /parents' night out/i })).toHaveAttribute(
      'href',
      '/just-4-kids/parents-night-out',
    )
  })

  it('renders the Follow Us hub with Instagram and Facebook options', async () => {
    renderAt('/follow-us')
    expect(await screen.findByRole('heading', { name: /follow us/i, level: 1 })).toBeInTheDocument()
    const postLinks = screen.getAllByRole('link', { name: /see recent posts/i })
    expect(postLinks).toHaveLength(2)
    expect(postLinks[0]).toHaveAttribute('href', '/follow-us/instagram')
    expect(postLinks[1]).toHaveAttribute('href', '/follow-us/facebook')
    expect(screen.queryByText(/youtube/i)).not.toBeInTheDocument()
  })

  it('renders an Instagram feed page with post links', async () => {
    renderAt('/follow-us/instagram')
    expect(await screen.findByRole('heading', { name: /^instagram$/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/evening class energy on the mat/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit instagram profile/i })).toBeInTheDocument()
  })

  it('shows a 404 for an unknown social network', async () => {
    renderAt('/follow-us/youtube')
    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('renders a unique program detail page', async () => {
    renderAt('/programs/tiny-tigers')
    expect(
      await screen.findByRole('heading', { name: /tiny tigers/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(/who it's for/i)).toBeInTheDocument()
    expect(screen.getByText(/what you'll work on/i)).toBeInTheDocument()
  })

  it('renders the Allendale location landing page', async () => {
    renderAt('/locations/allendale')
    expect(
      await screen.findByRole('heading', {
        name: /allendale martial arts classes/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/240 W Crescent Ave/i).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('link', { name: /also see midland park/i }),
    ).toHaveAttribute('href', '/locations/midland-park')
  })

  it('renders the Midland Park location landing page with placeholders', async () => {
    renderAt('/locations/midland-park')
    expect(
      await screen.findByRole('heading', {
        name: /midland park martial arts classes/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/644 Godwin Ave/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/pending owner confirmation/i).length).toBeGreaterThan(0)
  })

  it('shows a 404 for an unknown location slug', async () => {
    renderAt('/locations/not-a-school')
    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('shows a 404 for an unknown program slug', async () => {
    renderAt('/programs/not-a-real-program')
    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('shows a 404 for unknown routes', async () => {
    renderAt('/does-not-exist')
    expect(
      await screen.findByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('loads privacy and terms via direct navigation', async () => {
    renderAt('/privacy')
    expect(
      await screen.findByRole('heading', { name: /privacy policy/i, level: 1 }),
    ).toBeInTheDocument()

    renderAt('/terms')
    expect(
      await screen.findByRole('heading', { name: /terms and conditions/i, level: 1 }),
    ).toBeInTheDocument()
  })
})
