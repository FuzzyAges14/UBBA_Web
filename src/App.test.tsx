import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders the home hero brand H1 and tagline', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', {
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

  it('renders the Children\'s Programs page', () => {
    renderAt('/programs/children')
    expect(
      screen.getByRole('heading', { name: /children's programs/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/tiny tigers/i).length).toBeGreaterThan(0)
  })

  it('renders the Just 4 Kids page headline', () => {
    renderAt('/just-4-kids')
    expect(
      screen.getByRole('heading', { name: /the fun doesn't stop at the mat/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book a birthday/i })).toHaveAttribute(
      'href',
      '/just-4-kids/birthday-parties',
    )
    expect(screen.getByRole('link', { name: /explore camp/i })).toHaveAttribute(
      'href',
      '/just-4-kids/summer-camp',
    )
  })

  it('renders the birthday parties detail page with inquiry form', () => {
    renderAt('/just-4-kids/birthday-parties')
    expect(
      screen.getByRole('heading', { name: /most exciting birthday party ever/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /schedule my party/i })).toBeInTheDocument()
    expect(screen.getByText(/what we provide/i)).toBeInTheDocument()
  })

  it('renders the summer camp detail page with reserve form', () => {
    renderAt('/just-4-kids/summer-camp')
    expect(
      screen.getByRole('heading', {
        name: /most exciting summer ever/i,
        level: 1,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reserve a spot/i })).toBeInTheDocument()
    expect(screen.getByText(/what to bring/i)).toBeInTheDocument()
  })

  it("renders the Parents' Night Out detail page with inquiry form", () => {
    renderAt('/just-4-kids/parents-night-out')
    expect(
      screen.getByRole('heading', { name: /fun for kids\. relaxation for you/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save a spot/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^spots fill fast$/i })).toBeInTheDocument()
  })

  it('keeps Just 4 Kids as its own nav item separate from Programs', () => {
    renderAt('/')

    const primaryNav = screen.getByRole('navigation', { name: /primary/i })
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

  it('renders the Follow Us hub with Instagram and Facebook options', () => {
    renderAt('/follow-us')
    expect(screen.getByRole('heading', { name: /follow us/i, level: 1 })).toBeInTheDocument()
    const postLinks = screen.getAllByRole('link', { name: /see recent posts/i })
    expect(postLinks).toHaveLength(2)
    expect(postLinks[0]).toHaveAttribute('href', '/follow-us/instagram')
    expect(postLinks[1]).toHaveAttribute('href', '/follow-us/facebook')
    expect(screen.queryByText(/youtube/i)).not.toBeInTheDocument()
  })

  it('renders an Instagram feed page with post links', () => {
    renderAt('/follow-us/instagram')
    expect(screen.getByRole('heading', { name: /^instagram$/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/evening class energy on the mat/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /visit instagram profile/i })).toBeInTheDocument()
  })

  it('shows a 404 for an unknown social network', () => {
    renderAt('/follow-us/youtube')
    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('renders a unique program detail page', () => {
    renderAt('/programs/tiny-tigers')
    expect(
      screen.getByRole('heading', { name: /tiny tigers/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getByText(/what you'll learn/i)).toBeInTheDocument()
  })

  it('shows a 404 for an unknown program slug', () => {
    renderAt('/programs/not-a-real-program')
    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })

  it('shows a 404 for unknown routes', () => {
    renderAt('/does-not-exist')
    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })
})
