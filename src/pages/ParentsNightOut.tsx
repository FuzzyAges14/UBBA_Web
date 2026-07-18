import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import { getJust4KidsDetail } from '../data/site'

export default function ParentsNightOut() {
  const detail = getJust4KidsDetail('parents-night-out')!
  const formId = 'pno-inquiry'

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: "Parents' Night Out" },
        ]}
        title={detail.heroTitle}
        intro={detail.heroIntro}
      >
        <div className="flex-actions mt" style={{ justifyContent: 'flex-start' }}>
          <a href={`#${formId}`} className="btn btn--gold btn--lg">
            {detail.ctaLabel} <span className="btn__arrow">→</span>
          </a>
          <Link to="/just-4-kids" className="btn btn--outline btn--lg">
            All Just 4 Kids
          </Link>
        </div>
      </PageHero>

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

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              label="Parents' Night Out photo — coming soon"
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
              Once a month on a Friday, kids get games, laughter, and pizza while you get a real
              night off. Open to non-students — bring friends!
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

      <section className="section" id={formId}>
        <div className="container j4k-form-layout">
          <Reveal>
            <span className="eyebrow">Reserve Early</span>
            <h2 className="section-title">Spots fill fast</h2>
            <ol className="j4k-easy mt">
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
          </Reveal>
          <Reveal delay={100}>
            <EventInquiryForm intent="parents-night-out" />
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
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
    </>
  )
}
