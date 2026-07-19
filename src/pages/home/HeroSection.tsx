import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import HeroMedia from '../../components/HeroMedia'
import { fadeUp, staticFade } from '../../lib/motion'
import { SITE, formatVisibleLocationList } from '../../data/site'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()
  const heroMotion = reduceMotion ? staticFade : fadeUp
  const locationList = formatVisibleLocationList({ style: 'ampersand' })

  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <HeroMedia />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="dojang dojang--fade" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.h1
          id="home-hero-title"
          initial="hidden"
          animate="show"
          custom={0}
          variants={heroMotion}
        >
          United <span className="accent accent--red">Black</span>{' '}
          <span className="accent">Belt</span> Academy
        </motion.h1>
        <motion.h2
          className="hero__tagline"
          initial="hidden"
          animate="show"
          custom={1}
          variants={heroMotion}
        >
          Confidence Building Martial Arts Classes in {locationList}
        </motion.h2>
        <motion.p
          className="hero__sub"
          initial="hidden"
          animate="show"
          custom={2}
          variants={heroMotion}
        >
          Taekwondo and martial arts for kids, teens, and adults — building
          confidence, discipline, focus, fitness, and practical self-defense at our
          Bergen County schools.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial="hidden"
          animate="show"
          custom={3}
          variants={heroMotion}
        >
          <Link to="/contact" className="btn btn--lg">
            {SITE.primaryCta}{' '}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <a href="#programs" className="btn btn--ghost btn--lg">
            Explore Programs
          </a>
        </motion.div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}
