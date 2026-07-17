import { render, screen } from '@testing-library/react'
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

  it('shows a 404 for unknown routes', () => {
    renderAt('/does-not-exist')
    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()
  })
})
