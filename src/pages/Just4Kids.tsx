import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import { JUST_4_KIDS, PARENTS_NIGHT_OUT, SITE } from '../data/site'

const STEPS = [
  { t: 'Select Program', d: 'Pick a birthday bash, summer camp, or parents’ night out.' },
  { t: 'Enroll Your Child', d: 'Send a quick inquiry — we’ll help you lock in the details.' },
  { t: 'Let The Fun Begin!', d: 'Drop off and relax while our team delivers the laughs.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Just4Kids() {
  return (
    <>
      <section className="j4k-hero">
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
            variants={fadeUp}
          >
            {SITE.shortName}
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="show" variants={fadeUp}>
            The fun doesn&apos;t stop at the mat!
          </motion.h1>
          <motion.p
            className="j4k-hero__lead"
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            Birthday bashes, summer adventures, and pizza-powered parents&apos; nights out — packed
            with awesome activities kids love.
          </motion.p>
          <motion.div
            className="flex-actions"
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            <Link to="/just-4-kids/birthday-parties" className="btn btn--gold btn--lg">
              Book a Birthday <span className="btn__arrow">→</span>
            </Link>
            <Link to="/just-4-kids/summer-camp" className="btn btn--outline btn--lg">
              Explore Camp
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">Three steps to fun</h2>
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
                    src={prog.image}
                    alt={prog.title}
                    sticker={prog.sticker}
                    stickerTone={i === 1 ? 'blue' : i === 2 ? 'cream' : 'gold'}
                    stickerRotate={i % 2 === 0 ? -10 : 9}
                  />
                  <div className="j4k-tile__body">
                    <span className="card__ages">{prog.tag}</span>
                    <h3>
                      <span aria-hidden="true">{prog.icon} </span>
                      {prog.title}
                    </h3>
                    <p>{prog.blurb}</p>
                    <Link to={prog.to} className="btn btn--gold mt-sm">
                      {prog.ctaLabel} <span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="parents-night-out">
        <div className="container j4k-form-layout">
          <Reveal>
            <span className="card__ages">{PARENTS_NIGHT_OUT.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              {PARENTS_NIGHT_OUT.headline}
            </h2>
            <p className="section-lead">{PARENTS_NIGHT_OUT.blurb}</p>
            <MediaFrame
              src={PARENTS_NIGHT_OUT.image}
              alt="Kids having fun at Parents' Night Out"
              sticker={PARENTS_NIGHT_OUT.sticker}
              stickerTone="cream"
              stickerRotate={-8}
              className="mt"
            />
            <ul className="checklist mt">
              {PARENTS_NIGHT_OUT.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="mt">
              <Faq items={[...PARENTS_NIGHT_OUT.faqs]} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <EventInquiryForm intent="parents-night-out" />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Plan something unforgettable"
        text="Book a party, reserve a camp spot, or join the next parents' night out — kids have a blast, and you get the easy version of planning."
        primaryTo="/just-4-kids/birthday-parties#birthday-inquiry"
        primaryLabel="Schedule a Party"
        secondaryTo="/just-4-kids/summer-camp#camp-inquiry"
        secondaryLabel="Reserve Camp"
      />
    </>
  )
}
