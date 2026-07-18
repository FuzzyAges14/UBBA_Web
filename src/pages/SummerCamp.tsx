import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import SectionSeam from '../components/SectionSeam'
import { getJust4KidsDetail } from '../data/site'

export default function SummerCamp() {
  const detail = getJust4KidsDetail('summer-camp')!
  const formId = 'camp-inquiry'

  return (
    <>
      <PageHero
        variant="playful"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: 'Summer Camp' },
        ]}
        title={detail.heroTitle}
        intro={detail.heroIntro}
      >
        <div className="flex-actions" style={{ justifyContent: 'flex-start' }}>
          <a href={`#${formId}`} className="btn btn--gold btn--lg">
            {detail.ctaLabel} <span className="btn__arrow">→</span>
          </a>
          <Link to="/just-4-kids" className="btn btn--outline btn--lg">
            All Just 4 Kids
          </Link>
        </div>
      </PageHero>

      <SectionSeam from="j4k-hero" to="j4k-sun" />

      <section className="section j4k-surface j4k-surface--sun">
        <div className="j4k-confetti" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Campers Will</span>
            <h2 className="section-title">Our summer camps are packed with fun</h2>
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

      <SectionSeam from="j4k-sun" to="off-white" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              label="Summer camp photo — coming soon"
              icon={detail.mediaIcon}
              stickers={[
                { kind: 'wave', spot: 'tr', rotate: 3, delay: 0 },
                { kind: 'palm', spot: 'bl', rotate: -8, delay: 0.25 },
                { kind: 'sun', spot: 'br', rotate: 12, delay: 0.55 },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="card__ages">{detail.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Summertime is fun time — and learning time
            </h2>
            <p className="section-lead">
              Campers ages 3–12 enjoy games, projects, and martial arts practice while building
              confidence, respect, self-control, and friendship. No martial arts experience
              necessary — parents choose camp when they want an active, supervised summer plan
              with structure and play.
            </p>
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>What’s in a camp day</h3>
            <ul className="checklist mt-sm">
              {detail.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container j4k-pack">
          <Reveal>
            <div>
              <span className="eyebrow">Weekly Themes</span>
              <h2 className="section-title">Built for imagination</h2>
              <ul className="checklist mt">
                {(detail.weekNotes ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="checklist mt-sm">
                {detail.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="ph-note mt-sm">
                Camp dates, weekly themes &amp; pricing — pending seasonal owner confirmation.
                Inquire for the current schedule.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div>
              <span className="eyebrow">Pack List</span>
              <h2 className="section-title">What to bring</h2>
              <ul className="checklist mt">
                {(detail.whatToBring ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Summer camp questions</h2>
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
              <span className="eyebrow">Getting Started Is Easy</span>
              <h2 className="section-title">Ask about this summer’s camp</h2>
              <p className="section-lead" style={{ marginTop: '0.75rem' }}>
                The form is an inquiry for dates, location preference, and openings. We
                confirm the seasonal schedule and pricing before enrollment — those details
                are not finalized on this page.
              </p>
              <ol className="j4k-easy">
                <li>
                  <strong>Enter your info</strong>
                  <span>Tell us who you’re signing up.</span>
                </li>
                <li>
                  <strong>Share preferences</strong>
                  <span>We’ll confirm dates, school, and details.</span>
                </li>
                <li>
                  <strong>Begin summer camp</strong>
                  <span>Drop off once your spot is confirmed!</span>
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
              <EventInquiryForm intent="summer-camp" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
