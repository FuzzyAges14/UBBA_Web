import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HeroMedia from './HeroMedia'
import { shouldLoadHeroVideo } from '../lib/heroMediaPolicy'

describe('shouldLoadHeroVideo', () => {
  it('stays off until authentic academy footage is available', () => {
    expect(shouldLoadHeroVideo()).toBe(false)
  })
})

describe('HeroMedia', () => {
  it('renders a brand atmosphere panel without stock video or photography', () => {
    const { container } = render(<HeroMedia />)
    expect(container.querySelector('.hero__brand-media')).toBeTruthy()
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('img')).toBeNull()
  })
})
