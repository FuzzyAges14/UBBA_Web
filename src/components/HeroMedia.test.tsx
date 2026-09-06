import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HeroMedia from './HeroMedia'
import { HERO_SLIDES } from '../data/authenticMedia'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'

describe('shouldLoadHeroVideo', () => {
  it('stays off until authentic academy footage is available', () => {
    expect(shouldLoadHeroVideo()).toBe(false)
  })
})

describe('HeroMedia', () => {
  it('renders a landscape group-photo slideshow without stock video', () => {
    const { container } = render(<HeroMedia />)
    expect(container.querySelector('.hero__slides')).toBeTruthy()
    expect(container.querySelector('video')).toBeNull()
    const imgs = container.querySelectorAll('.hero__slide img')
    expect(imgs.length).toBe(HERO_SLIDES.length)
    expect(imgs.length).toBeGreaterThanOrEqual(5)
    expect(imgs.length).toBeLessThanOrEqual(7)
    imgs.forEach((img) => {
      const w = Number(img.getAttribute('width'))
      const h = Number(img.getAttribute('height'))
      expect(w).toBeGreaterThan(h)
    })
    expect(container.querySelector('.hero__slide.is-active')).toBeTruthy()
  })
})
