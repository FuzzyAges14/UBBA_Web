import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Photo from '../components/Photo'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import { ADULT_PROGRAMS, FAQS, IMAGES, SITE } from '../data/site'

export default function AdultPrograms() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Adult & Family Programs' }]}
        title="Adult & Family Programs"
        intro="Get in the best shape of your life while learning practical self-defense. From total beginners to seasoned athletes, there's a program for you."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {ADULT_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 70}>
                <div className="pcard" style={{ minHeight: 380 }}>
                  {p.image ? (
                    <img className="pcard__img" src={p.image} alt={p.title} loading="lazy" />
                  ) : (
                    <div className="pcard__art" />
                  )}
                  <div className="pcard__scrim" />
                  <div className="pcard__body">
                    <h3 className="pcard__title">{p.title}</h3>
                    <p className="pcard__text">{p.blurb}</p>
                    <Link to={`/programs/${p.slug}`} className="pcard__cta">
                      Learn How It Works <span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="ph-note mt">
              Program availability, equipment, and requirements — pending owner
              confirmation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split" style={{ position: 'relative' }}>
          <Reveal delay={120}>
            <Photo
              src={IMAGES.action}
              alt="Adult Taekwondo training session"
              variant="tall"
              zoom
              credit="Placeholder photo"
            />
          </Reveal>
          <Reveal>
            <span className="eyebrow">Train Your Way</span>
            <h2 className="section-title">Fitness, focus &amp; real self-defense</h2>
            <p className="section-lead">
              Whether you want to lose weight, relieve stress, or learn to protect
              yourself and your family, our adult classes deliver a full-body workout
              in a supportive, no-ego environment.
            </p>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Getting started as an adult</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Your first class is free"
        text="No experience needed. Come see how good it feels to train with a team that has your back."
      />
    </>
  )
}
