import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HERO_SLIDES, HERO_SLIDE_INTERVAL_MS } from '../data/authenticMedia'

/**
 * Full-bleed hero backdrop: landscape group-photo slideshow with fade
 * transitions. Vertical / portrait Facebook posts are intentionally excluded
 * so every slide can cover the hero with `object-fit: cover` on desktop and
 * narrow viewports. Stock WebsiteDojo / Vimeo video stays disabled.
 */
export default function HeroMedia() {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduceMotion || HERO_SLIDES.length < 2) return
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length)
    }, HERO_SLIDE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="hero__slides" aria-hidden="true">
      {HERO_SLIDES.map((slide, index) => {
        const isActive = reduceMotion ? index === 0 : index === active
        return (
          <picture
            key={slide.src}
            className={`hero__slide${isActive ? ' is-active' : ''}`}
          >
            <source type="image/webp" srcSet={slide.webpSrcSet} sizes="100vw" />
            <img
              src={slide.src}
              srcSet={slide.srcSet}
              sizes="100vw"
              alt=""
              width={slide.width}
              height={slide.height}
              decoding={index === 0 ? 'sync' : 'async'}
              loading={index === 0 ? 'eager' : 'lazy'}
              draggable={false}
            />
          </picture>
        )
      })}
      {/* Soft brand wash so text stays readable if a slide is slow to paint */}
      <div className="hero__slides-wash" />
    </div>
  )
}
