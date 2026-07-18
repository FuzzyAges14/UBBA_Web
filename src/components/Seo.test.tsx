import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SEO } from '../data/site'
import Seo from './Seo'

function SeoHarness({ initialPath }: { initialPath: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Seo />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/privacy" element={<h1>Privacy</h1>} />
        <Route path="/programs/:slug" element={<h1>Program</h1>} />
        <Route path="*" element={<h1>Other</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Seo', () => {
  it('sets title and description from the SEO map', async () => {
    render(<SeoHarness initialPath="/contact" />)

    await waitFor(() => {
      expect(document.title).toBe(SEO['/contact'].title)
    })
    const description = document.querySelector('meta[name="description"]')
    expect(description?.getAttribute('content')).toBe(SEO['/contact'].description)
  })

  it('updates metadata on client-side navigation without duplicating tags', async () => {
    const user = userEvent.setup()
    render(<SeoHarness initialPath="/" />)

    await waitFor(() => {
      expect(document.title).toBe(SEO['/'].title)
    })

    await user.click(screen.getByRole('link', { name: /^privacy$/i }))

    await waitFor(() => {
      expect(document.title).toBe(SEO['/privacy'].title)
    })

    const descriptions = document.querySelectorAll('meta[name="description"]')
    expect(descriptions).toHaveLength(1)
    expect(descriptions[0].getAttribute('content')).toBe(SEO['/privacy'].description)
  })

  it('derives program metadata from program data', async () => {
    render(<SeoHarness initialPath="/programs/tiny-tigers" />)

    await waitFor(() => {
      expect(document.title).toMatch(/tiny tigers/i)
    })
    const description = document.querySelector('meta[name="description"]')
    expect(description?.getAttribute('content')).toMatch(/confidence/i)
  })

  it('falls back to homepage metadata for unknown paths', async () => {
    render(<SeoHarness initialPath="/totally-unknown" />)

    await waitFor(() => {
      expect(document.title).toBe(SEO['/'].title)
    })
  })
})
