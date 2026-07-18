import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import MediaFrame from '../components/MediaFrame'
import SectionSeam from '../components/SectionSeam'
import { IMAGES, JUST_4_KIDS, SITE } from '../data/site'

const TILE_IMAGES: Record<string, string> = {
  'birthday-parties': IMAGES.birthday,
  'summer-camp': IMAGES.summerCamp,
  'parents-night-out': IMAGES.parentsNightOut,
}
import type { FunStickerKind } from '../components/FunSticker'

const STEPS = [
  { t: 'Select Program', d: 'Pick a birthday bash, summer camp, or parents’ night out.' },
  { t: 'Enroll Your Child', d: 'Send a quick inquiry — we’ll help you lock in the details.' },
  { t: 'Let The Fun Begin!', d: 'Drop off and relax while our team delivers the laughs.' },
]

const TILE_STICKERS: Record<
  string,
  { kind: FunStickerKind; spot?: 'tl' | 'tr' | 'bl' | 'br'; rotate?: number; delay?: number }[]
> = {
  'birthday-parties': [
    { kind: 'cake', spot: 'tr', rotate: -12, delay: 0 },
    { kind: 'balloon', spot: 'bl', rotate: 8, delay: 0.4 },
  ],
  'summer-camp': [
    { kind: 'wave', spot: 'tr', rotate: 4, delay: 0 },
    { kind: 'sun', spot: 'bl', rotate: -10, delay: 0.3 },
  ],
  'parents-night-out': [
    { kind: 'pizza', spot: 'tr', rotate: -8, delay: 0 },
    { kind: 'glasses', spot: 'bl', rotate: 10, delay: 0.35 },
  ],
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export default function Just4Kids() {
  const reduceMotion = useReducedMotion()
  const heroMotion = reduceMotion ? staticFade : fadeUp

  return (
    <>
      <section className="j4k-hero j4k-hero--splash">
        <div className="j4k-hero__bg" aria-hidden="true" />
        <div className="j4k-confetti j4k-confetti--hero" aria-hidden="true" />
        <div className="container j4k-hero__inner">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            {' / '}
            <span>Just 4 Kids</span>
          </div>
          <motion.p
            className="j4k-hero__brand"
            custom={0}
            initial="hidden"
            animate="show"
            variants={heroMotion}
          >
            {SITE.shortName}
          </motion.p>
          <motion.div
            className="j4k-hero__accent"
            aria-hidden="true"
            custom={0}
            initial="hidden"
            animate="show"
            variants={heroMotion}
          >
            <span className="j4k-hero__accent-bar j4k-hero__accent-bar--red" />
            <span className="j4k-hero__accent-dot" />
            <span className="j4k-hero__accent-bar j4k-hero__accent-bar--blue" />
          </motion.div>
          <motion.h1 custom={1} initial="hidden" animate="show" variants={heroMotion}>
            The fun doesn&apos;t stop at the mat!
          </motion.h1>
          <motion.p
            className="j4k-hero__lead"
            custom={2}
            initial="hidden"
            animate="show"
            variants={heroMotion}
          >
            Birthday bashes, summer adventures, and pizza-powered parents&apos; nights out — packed
            with awesome activities kids love.
          </motion.p>
          <motion.div
            className="flex-actions"
            custom={3}
            initial="hidden"
            animate="show"
            variants={heroMotion}
          >
            <Link to="/just-4-kids/birthday-parties" className="btn btn--blue btn--lg">
              Book a Birthday <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link to="/just-4-kids/summer-camp" className="btn btn--outline btn--lg">
              Explore Camp
            </Link>
            <Link to="/just-4-kids/parents-night-out" className="btn btn--outline btn--lg">
              Parents&apos; Night Out
            </Link>
          </motion.div>
        </div>
      </section>

      <SectionSeam from="j4k-hero" to="off-white" />

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">Three steps to fun</h2>
            <p className="section-lead">
              From inquiry to drop-off, each Just 4 Kids experience is built for busy parents and
              high-energy kids.
            </p>
          </Reveal>
          <div className="grid grid--3 mt" style={{ rowGap: '2.6rem' }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="step">
                  <div className="step__num">{i + 1}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="off-white" to="j4k" />

      <section className="section j4k-surface">
        <div className="j4k-confetti" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <span className="eyebrow">Just 4 Kids</span>
            <h2 className="section-title">Pick your adventure</h2>
            <p className="section-lead">
              Three ways to keep kids moving, laughing, and learning — outside regular class time.
            </p>
          </Reveal>
          <div className="j4k-tiles mt">
            {JUST_4_KIDS.map((prog, i) => (
              <Reveal key={prog.id} delay={i * 80}>
                <article className="j4k-tile">
                  <MediaFrame
                    label={prog.title}
                    icon={prog.icon}
                    src={TILE_IMAGES[prog.id]}
                    alt={`${prog.title} at United Black Belt Academy`}
                    stickers={TILE_STICKERS[prog.id] ?? []}
                  />
                  <div className="j4k-tile__body">
                    <span className="card__ages">{prog.tag}</span>
                    <h3>
                      <span aria-hidden="true">{prog.icon} </span>
                      {prog.title}
                    </h3>
                    <p>{prog.blurb}</p>
                    <Link to={prog.to} className="btn btn--blue mt-sm">
                      {prog.ctaLabel} <span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="j4k" to="off-white" />

      <section className="section j4k-close">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ready When You Are</span>
            <h2 className="section-title">Questions about Just 4 Kids?</h2>
            <p className="section-lead">
              Tell us which experience you want and which school works best — Allendale or Midland
              Park. We&apos;ll confirm details before anything is booked.
            </p>
            <div className="flex-actions mt">
              <Link to="/contact" className="btn btn--blue btn--lg">
                {SITE.primaryCta} <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/just-4-kids/birthday-parties" className="btn btn--outline btn--lg">
                Schedule a Party
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
