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
  it('renders the home hero headline', () => {
    renderAt('/')
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
  })

  it('keeps Just 4 Kids in Programs and links Follow Us to its own page', () => {
    renderAt('/')

    const primaryNav = screen.getByRole('navigation', { name: /primary/i })
    expect(
      within(primaryNav).queryByRole('link', { name: /just 4 kids/i }),
    ).not.toBeInTheDocument()
    expect(
      within(primaryNav).getByRole('link', { name: /follow us/i }),
    ).toHaveAttribute('href', '/follow-us')

    fireEvent.click(screen.getByRole('button', { name: /programs/i }))
    const programsPanel = primaryNav.querySelector('.mega')
    expect(programsPanel).toBeTruthy()
    expect(within(programsPanel as HTMLElement).getByText(/birthday parties/i)).toBeInTheDocument()
    expect(within(programsPanel as HTMLElement).getByText(/summer \/ day camp/i)).toBeInTheDocument()
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
