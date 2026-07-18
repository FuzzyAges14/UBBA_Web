import { render } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import HeroMedia from './HeroMedia'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'
import { HERO_MEDIA } from '../data/site'

describe('shouldLoadHeroVideo', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns false when the user prefers reduced motion', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('prefers-reduced-motion'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    expect(shouldLoadHeroVideo()).toBe(false)
  })

  it('returns false on narrow viewports', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('max-width'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    expect(shouldLoadHeroVideo()).toBe(false)
  })

  it('returns false when Save-Data is enabled', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    vi.stubGlobal('navigator', {
      ...navigator,
      connection: { saveData: true, effectiveType: '4g' },
    })
    expect(shouldLoadHeroVideo()).toBe(false)
  })
})

describe('HeroMedia', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('always renders an eager poster for LCP', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: true,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    const { container } = render(<HeroMedia />)
    const poster = container.querySelector('img.hero__poster') as HTMLImageElement
    expect(poster).toBeTruthy()
    expect(poster).toHaveAttribute('src', HERO_MEDIA.poster)
    expect(poster).toHaveAttribute('loading', 'eager')
    expect(poster.getAttribute('fetchpriority')?.toLowerCase() || poster.fetchPriority).toMatch(
      /high/i,
    )
    expect(container.querySelector('video')).toBeNull()
  })

  it('mounts a muted playsInline video when loading is allowed', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    vi.stubGlobal('navigator', {
      ...navigator,
      connection: { saveData: false, effectiveType: '4g' },
    })

    const { container } = render(<HeroMedia />)
    await vi.waitFor(() => {
      expect(container.querySelector('video')).toBeTruthy()
    })
    const el = container.querySelector('video') as HTMLVideoElement
    expect(el.muted).toBe(true)
    expect(el.playsInline).toBe(true)
    expect(el.getAttribute('preload')).toBe('none')
    expect(el.querySelector('source[type="video/mp4"]')).toHaveAttribute(
      'src',
      HERO_MEDIA.mp4,
    )
  })
})
