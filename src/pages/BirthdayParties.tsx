import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import SectionSeam from '../components/SectionSeam'
import { getJust4KidsDetail, IMAGES } from '../data/site'

export default function BirthdayParties() {
  const detail = getJust4KidsDetail('birthday-parties')!
  const formId = 'birthday-inquiry'

  return (
    <>
      <PageHero
        variant="playful"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: 'Birthday Parties' },
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

      <SectionSeam from="j4k-hero" to="j4k" variant="wave" />

      <section className="section j4k-surface">
        <div className="j4k-confetti" aria-hidden="true" />
        <div className="container">
          <Reveal>
            <span className="eyebrow">Kids Will</span>
            <h2 className="section-title">There is no party like a martial arts birthday</h2>
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

      <SectionSeam from="j4k" to="off-white" variant="fade" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              label="Birthday party at United Black Belt Academy"
              icon={detail.mediaIcon}
              src={IMAGES.birthday}
              alt="Kids celebrating a birthday party at United Black Belt Academy"
              stickers={[
                { kind: 'cake', spot: 'tr', rotate: -14, delay: 0 },
                { kind: 'shades', spot: 'bl', rotate: 10, delay: 0.35 },
                { kind: 'balloon', spot: 'br', rotate: -6, delay: 0.7 },
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="card__ages">{detail.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Fun &amp; awesome — we handle the stress
            </h2>
            <p className="section-lead">
              Parents get to relax while instructors run the party. Guests enjoy games that
              practice courtesy and respect while having a kicking good time — no martial arts
              experience necessary. Ideal for birthday celebrations when you want an active,
              supervised option instead of planning every detail yourself.
            </p>
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>So many fun activities</h3>
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
              <span className="eyebrow">Birthday Package</span>
              <h2 className="section-title">What we provide</h2>
              <ul className="checklist mt">
                {detail.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="ph-note mt-sm">
                Party length, guest capacity, pricing, and upgrade options — pending owner
                confirmation. The inquiry form starts the conversation; we confirm current
                package details before booking.
              </p>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div>
              <span className="eyebrow">You Bring</span>
              <h2 className="section-title">What parents supply</h2>
              <ul className="checklist mt">
                {(detail.parentsSupply ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="section-lead mt-sm">
                Comfortable clothes only — uniforms are <strong>not</strong> required. Every child
                needs a waiver signed by a parent or guardian.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Birthday party questions</h2>
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
              <h2 className="section-title">Tell us the date — we do the rest</h2>
              <p className="section-lead" style={{ marginTop: '0.75rem' }}>
                Use the form to share your preferred date, guest range, and school interest.
                It is an inquiry — not a final reservation — until our team confirms
                availability and details.
              </p>
              <ol className="j4k-easy">
                <li>
                  <strong>The date</strong>
                  <span>When’s the big day?</span>
                </li>
                <li>
                  <strong>How many guests</strong>
                  <span>We’ll size the party just right.</span>
                </li>
                <li>
                  <strong>How to contact you</strong>
                  <span>We’ll call to confirm details.</span>
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
              <EventInquiryForm intent="birthday" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
