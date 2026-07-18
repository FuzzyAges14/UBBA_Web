import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import CtaBanner from '../components/CtaBanner'
import { getJust4KidsDetail } from '../data/site'

export default function SummerCamp() {
  const detail = getJust4KidsDetail('summer-camp')!
  const formId = 'camp-inquiry'

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: 'Summer Camp' },
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

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              src={detail.image}
              alt="Kids training and playing at summer camp"
              sticker={detail.sticker}
              stickerTone="blue"
              stickerRotate={8}
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="card__ages">{detail.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Summertime is fun time — and learning time
            </h2>
            <p className="section-lead">
              Kids enjoy games, projects, and outings plus life-enriching skills: self-confidence,
              respect, self-control, and friendship. No martial arts experience necessary.
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

      <section className="section" id={formId}>
        <div className="container j4k-form-layout">
          <Reveal>
            <span className="eyebrow">Getting Started Is Easy</span>
            <h2 className="section-title">Reserve your child’s spot</h2>
            <ol className="j4k-easy mt">
              <li>
                <strong>Enter your info</strong>
                <span>Tell us who you’re signing up.</span>
              </li>
              <li>
                <strong>Enroll your child</strong>
                <span>We’ll confirm dates and details.</span>
              </li>
              <li>
                <strong>Begin summer camp</strong>
                <span>Drop off and let the fun begin!</span>
              </li>
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <EventInquiryForm intent="summer-camp" />
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
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

      <CtaBanner
        title="Give your child an unforgettable summer"
        text="Spots are limited — reach out today to reserve camp weeks at your preferred location."
        primaryTo={`#${formId}`}
        primaryLabel={detail.ctaLabel}
        secondaryTo="/just-4-kids"
        secondaryLabel="Back to Just 4 Kids"
      />
    </>
  )
}
