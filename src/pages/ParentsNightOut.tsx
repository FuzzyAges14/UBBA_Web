import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import TrialCta from '../components/TrialCta'
import SectionSeam from '../components/SectionSeam'
import { getNextKickForm, getNextKickFormHref } from '../data/contact'
import { getJust4KidsDetail } from '../data/site'
import { PARENTS_NIGHT_OUT_FEATURE } from '../data/authenticMedia'

export default function ParentsNightOut() {
  const detail = getJust4KidsDetail('parents-night-out')!
  const formId = 'pno-inquiry'
  const nextKick = getNextKickForm('parents-night-out')
  const fallbackHref = getNextKickFormHref('parents-night-out', 'allendale')

  return (
    <>
      <PageHero
        variant="playful"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: "Parents' Night Out" },
        ]}
        title={detail.heroTitle}
        intro={detail.heroIntro}
      >
        <div className="flex-actions" style={{ justifyContent: 'flex-start' }}>
          <a href={`#${formId}`} className="btn btn--blue btn--lg">
            {detail.ctaLabel} <span className="btn__arrow">→</span>
          </a>
          <Link to="/just-4-kids" className="btn btn--outline btn--lg">
            All Just 4 Kids
          </Link>
        </div>
      </PageHero>

      <SectionSeam from="j4k-hero" to="j4k" variant="angle" />

      <section className="section j4k-surface">
        <div className="j4k-confetti" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Kids Will</span>
            <h2 className="section-title">Friday night energy, zero parent stress</h2>
          </Reveal>
          <div className="j4k-will mt">
            {detail.kidsWill.map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <div className="j4k-will__item">
                  <span className="j4k-will__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3>{item.label}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="j4k" to="off-white" variant="line" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              src={PARENTS_NIGHT_OUT_FEATURE.src}
              alt={PARENTS_NIGHT_OUT_FEATURE.alt}
              ownerRequired
              label="Parents' Night Out at United Black Belt Academy"
              icon={detail.mediaIcon}
              stickers={[
                { kind: 'pizza', spot: 'tr', rotate: -10, delay: 0 },
                { kind: 'glasses', spot: 'bl', rotate: 8, delay: 0.3 },
                { kind: 'sparkle', spot: 'br', rotate: -6, delay: 0.6 },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="card__ages">{detail.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Drop them off. Enjoy your night.
            </h2>
            <p className="section-lead">
              Once a month on a Friday, kids get supervised games, laughter, and pizza while
              you get a real night off — dinner, errands, or downtime without planning
              childcare. Open to non-students — bring friends!
            </p>
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>What the evening looks like</h3>
            <ul className="checklist">
              {detail.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">The Night Includes</span>
            <h2 className="section-title">Easy for parents</h2>
            <ul className="checklist">
              {detail.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="ph-note mt-sm">
              Next date &amp; pricing — pending owner confirmation. Reserve through
              NextKick to get the upcoming Friday details.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Parents&apos; Night Out questions</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={detail.faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite" id={formId}>
        <div className="container j4k-signup">
          <Reveal>
            <div className="j4k-signup__intro">
              <span className="eyebrow">Reserve Early</span>
              <h2 className="section-title">Spots fill fast</h2>
              <p className="section-lead" style={{ marginTop: '0.75rem' }}>
                Choose your school, then complete the NextKick Parents&apos; Night Out
                form for that location. It is a request — not a final reservation —
                until the academy confirms the Friday date, capacity, and details.
              </p>
              <ol className="j4k-easy">
                <li>
                  <strong>Pick your school</strong>
                  <span>Allendale, Midland Park, or Glen Rock.</span>
                </li>
                <li>
                  <strong>Finish on NextKick</strong>
                  <span>Tell us who&apos;s coming and how to reach you.</span>
                </li>
                <li>
                  <strong>Drop off &amp; unwind</strong>
                  <span>Pizza, games, and supervised fun await.</span>
                </li>
              </ol>
              <div className="flex-actions mt">
                <Link to="/locations/allendale" className="btn btn--outline">
                  Allendale
                </Link>
                <Link to="/locations/midland-park" className="btn btn--outline">
                  Midland Park
                </Link>
                <Link to="/contact" className="btn btn--outline">
                  Contact
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="j4k-signup__form">
              <div className="leadform leadform--event">
                <div className="leadform__head">
                  <span className="eyebrow">{nextKick.eyebrow}</span>
                </div>
                <p className="form-instructions">{nextKick.pickerLede}</p>
                <div className="leadform__steps" aria-hidden="true">
                  <i className="on" />
                  <i className="on" />
                  <i className="on" />
                </div>
                <TrialCta kind="parents-night-out" className="btn btn--lg btn--block" arrow>
                  {detail.ctaLabel}{' '}
                  <span className="btn__arrow" aria-hidden="true">
                    →
                  </span>
                </TrialCta>
                <p className="form-reassure">
                  Open to non-students · Pick your school, then finish on NextKick ·
                  Spots confirmed by the academy
                </p>
                <p className="form-portal-fallback">
                  <a href={fallbackHref} target="_blank" rel="noreferrer">
                    Open the Allendale Parents&apos; Night Out form in a new tab
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
