import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import SectionSeam from '../components/SectionSeam'
import { getJust4KidsDetail, getVisibleLocations } from '../data/site'
import { PARENTS_NIGHT_OUT_FEATURE } from '../data/authenticMedia'

function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`
}

export default function ParentsNightOut() {
  const detail = getJust4KidsDetail('parents-night-out')!
  const callId = 'pno-call'
  const schools = getVisibleLocations().filter((loc) => Boolean(loc.phone))
  const allendale = schools.find((loc) => loc.id === 'allendale')

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
          <a href={`#${callId}`} className="btn btn--blue btn--lg">
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
              Next date &amp; pricing — pending owner confirmation. Call your school
              to get the upcoming Friday details and reserve a spot.
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

      <section className="section section--offwhite" id={callId}>
        <div className="container j4k-signup">
          <Reveal>
            <div className="j4k-signup__intro">
              <span className="eyebrow">Reserve by Phone</span>
              <h2 className="section-title">Spots fill fast — call to save yours</h2>
              <p className="section-lead" style={{ marginTop: '0.75rem' }}>
                There is no online form for Parents&apos; Night Out. Call the school
                you prefer, and we will confirm the next Friday date, capacity, and
                pricing. Have this ready when you call:
              </p>
              <ol className="j4k-easy">
                <li>
                  <strong>Your name &amp; phone</strong>
                  <span>So we can confirm details with you.</span>
                </li>
                <li>
                  <strong>How many kids</strong>
                  <span>Ages help us plan games and pizza.</span>
                </li>
                <li>
                  <strong>Preferred school</strong>
                  <span>Allendale, Midland Park, or Glen Rock.</span>
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
                  <span className="eyebrow">Call to Reserve</span>
                </div>
                <p className="form-instructions">
                  Tap a school number below to call. Staff will take your information
                  and lock in the next available Friday night.
                </p>
                <div className="leadform__steps" aria-hidden="true">
                  <i className="on" />
                  <i className="on" />
                  <i className="on" />
                </div>
                <ul className="checklist" style={{ marginBottom: '1.25rem' }}>
                  {schools.map((loc) => (
                    <li key={loc.id}>
                      <strong>{loc.name}</strong>
                      {' — '}
                      <a href={telHref(loc.phone!)}>{loc.phone}</a>
                    </li>
                  ))}
                </ul>
                {allendale ? (
                  <a
                    href={telHref(allendale.phone!)}
                    className="btn btn--lg btn--block"
                  >
                    Call Allendale {allendale.phone}{' '}
                    <span className="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ) : null}
                <p className="form-reassure">
                  Open to non-students · Call your preferred school · Spots confirmed
                  by phone
                </p>
                <p className="form-portal-fallback">
                  Prefer email? Reach us through the{' '}
                  <Link to="/contact">contact page</Link>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
