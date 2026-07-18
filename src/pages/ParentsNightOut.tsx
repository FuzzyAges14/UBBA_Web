import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import SectionSeam from '../components/SectionSeam'
import { getJust4KidsDetail } from '../data/site'

export default function ParentsNightOut() {
  const detail = getJust4KidsDetail('parents-night-out')!
  const formId = 'pno-inquiry'

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

      <SectionSeam from="j4k-hero" to="j4k" />

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

      <SectionSeam from="j4k" to="off-white" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              label="Parents' Night Out photo — coming soon"
              icon={detail.mediaIcon}
              ownerRequired
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
            <ul className="checklist mt-sm">
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
            <ul className="checklist mt">
              {detail.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="ph-note mt-sm">
              Next date &amp; pricing — pending owner confirmation. Inquire to get the upcoming
              Friday details.
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
                Submit an inquiry with how many kids are coming and which school you prefer.
                We reply with the next Friday date, capacity, and current details — dates and
                fees still need owner confirmation each season.
              </p>
              <ol className="j4k-easy">
                <li>
                  <strong>Tell us who&apos;s coming</strong>
                  <span>How many kids — and which location.</span>
                </li>
                <li>
                  <strong>We confirm the Friday</strong>
                  <span>You’ll get the next date and details.</span>
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
              <EventInquiryForm intent="parents-night-out" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
