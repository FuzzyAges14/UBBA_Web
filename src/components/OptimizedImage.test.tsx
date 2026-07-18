import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import OptimizedImage from './OptimizedImage'

describe('OptimizedImage', () => {
  it('sets dimensions and defaults to lazy loading', () => {
    const { container } = render(
      <OptimizedImage src="/media/kids-group.jpg" alt="Class bow" width={1280} height={720} />,
    )
    const img = container.querySelector('img') as HTMLImageElement
    expect(img).toHaveAttribute('width', '1280')
    expect(img).toHaveAttribute('height', '720')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
  })

  it('allows eager + high fetch priority for LCP assets', () => {
    const { container } = render(
      <OptimizedImage
        src="/media/hero-poster.jpg"
        alt=""
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
      />,
    )
    const img = container.querySelector('img') as HTMLImageElement
    expect(img).toHaveAttribute('loading', 'eager')
    expect(img.getAttribute('fetchpriority')?.toLowerCase() || img.fetchPriority).toMatch(/high/i)
  })
})
