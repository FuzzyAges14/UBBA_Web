import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import MediaFrame from '../components/MediaFrame'
import EventInquiryForm from '../components/EventInquiryForm'
import CtaBanner from '../components/CtaBanner'
import { getJust4KidsDetail } from '../data/site'

export default function BirthdayParties() {
  const detail = getJust4KidsDetail('birthday-parties')!
  const formId = 'birthday-inquiry'

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Just 4 Kids', to: '/just-4-kids' },
          { label: 'Birthday Parties' },
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

      <section className="section">
        <div className="container split">
          <Reveal>
            <MediaFrame
              src={detail.image}
              alt="Kids celebrating at a martial arts birthday party"
              sticker={detail.sticker}
              stickerTone="gold"
              stickerRotate={-12}
            />
          </Reveal>
          <Reveal delay={80}>
            <span className="card__ages">{detail.tag}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Fun &amp; awesome — we handle the stress
            </h2>
            <p className="section-lead">
              Mom &amp; Dad get to relax while the school does the work. Guests enjoy games that
              teach courtesy and respect while having a kicking good time — no martial arts
              experience necessary.
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
                Exact pricing &amp; upgrade options — pending owner confirmation. Inquire to get
                the current package details.
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

      <section className="section" id={formId}>
        <div className="container j4k-form-layout">
          <Reveal>
            <span className="eyebrow">Getting Started Is Easy</span>
            <h2 className="section-title">Tell us the date — we do the rest</h2>
            <ol className="j4k-easy mt">
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
                <span>We’ll call to lock it in.</span>
              </li>
            </ol>
          </Reveal>
          <Reveal delay={100}>
            <EventInquiryForm intent="birthday" />
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
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

      <CtaBanner
        title="Don’t wait until the last minute"
        text="Everyone loves martial arts birthday parties — book in advance and just handle the who and when."
        primaryTo={`#${formId}`}
        primaryLabel={detail.ctaLabel}
        secondaryTo="/just-4-kids"
        secondaryLabel="Back to Just 4 Kids"
      />
    </>
  )
}
