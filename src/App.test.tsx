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

  it('keeps Just 4 Kids in Programs and shows Follow Us social placeholders', () => {
    renderAt('/')

    const primaryNav = screen.getByRole('navigation', { name: /primary/i })
    expect(
      within(primaryNav).queryByRole('link', { name: /just 4 kids/i }),
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /programs/i }))
    const programsPanel = primaryNav.querySelector('.mega:not(.mega--social)')
    expect(programsPanel).toBeTruthy()
    expect(within(programsPanel as HTMLElement).getByText(/birthday parties/i)).toBeInTheDocument()
    expect(within(programsPanel as HTMLElement).getByText(/summer \/ day camp/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /follow us/i }))
    const socialPanel = primaryNav.querySelector('.mega--social')
    expect(socialPanel).toBeTruthy()
    expect(within(socialPanel as HTMLElement).getByText(/@unitedblackbelt/i)).toBeInTheDocument()
    expect(
      within(socialPanel as HTMLElement).getByText(/evening class energy on the mat/i),
    ).toBeInTheDocument()
    expect(
      within(socialPanel as HTMLElement).getByText(/parents' night out this friday/i),
    ).toBeInTheDocument()
    expect(within(socialPanel as HTMLElement).queryByText(/youtube/i)).not.toBeInTheDocument()
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
