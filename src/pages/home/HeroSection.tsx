import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroMedia from '../../components/HeroMedia'
import { fadeUp } from '../../lib/motion'
import { SITE, getVisibleLocations } from '../../data/site'

export default function HeroSection() {
  const locationCount = getVisibleLocations().length

  return (
    <section className="hero" aria-labelledby="home-hero-title">
      <HeroMedia />
      <div className="hero__overlay" aria-hidden="true" />
      <div className="dojang dojang--fade" aria-hidden="true" />
      <div className="container hero__inner">
        <motion.span
          className="hero__badge"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <span aria-hidden="true">📍</span> Allendale &amp; Midland Park, NJ
        </motion.span>
        <motion.h1
          id="home-hero-title"
          initial="hidden"
          animate="show"
          custom={1}
          variants={fadeUp}
        >
          United <span className="accent accent--red">Black</span>{' '}
          <span className="accent">Belt</span> Academy
        </motion.h1>
        <motion.p
          className="hero__tagline"
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
        >
          Confidence Building Martial Arts Classes in Allendale &amp; Midland Park
        </motion.p>
        <motion.p
          className="hero__sub"
          initial="hidden"
          animate="show"
          custom={3}
          variants={fadeUp}
        >
          Taekwondo and martial arts for kids, teens, and adults — building
          confidence, discipline, focus, fitness, and practical self-defense at our
          Bergen County schools.
        </motion.p>
        <motion.div
          className="hero__actions"
          initial="hidden"
          animate="show"
          custom={4}
          variants={fadeUp}
        >
          <Link to="/contact" className="btn btn--lg">
            {SITE.primaryCta}{' '}
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
          <Link to="/programs/children" className="btn btn--ghost btn--lg">
            Children&apos;s Programs
          </Link>
          <Link to="/programs/adult" className="btn btn--ghost btn--lg">
            Adult Programs
          </Link>
        </motion.div>
        <motion.div
          className="hero__meta"
          initial="hidden"
          animate="show"
          custom={5}
          variants={fadeUp}
        >
          <span>
            <span className="dot" aria-hidden="true">
              ★★★★★
            </span>{' '}
            Loved by local families
          </span>
          <span>
            <span className="dot" aria-hidden="true">
              ●
            </span>{' '}
            Ages 3 through adult
          </span>
          <span>
            <span className="dot" aria-hidden="true">
              ●
            </span>{' '}
            {locationCount} convenient locations
          </span>
        </motion.div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </section>
  )
}
