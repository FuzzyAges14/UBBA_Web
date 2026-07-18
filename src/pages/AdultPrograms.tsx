import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import ProgramCard from '../components/ProgramCard'
import SectionHeading from '../components/SectionHeading'
import SectionSeam from '../components/SectionSeam'
import { ADULT_PROGRAMS, FAQS, PROGRAM_GLYPHS, SITE } from '../data/site'

export default function AdultPrograms() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Adult & Family Programs' }]}
        title="Adult & Family Programs"
        intro="Get in the best shape of your life while learning practical self-defense. From total beginners to seasoned athletes, there's a program for you."
      />

      <SectionSeam from="dark" to="off-white" />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {ADULT_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 70}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={`/programs/${p.slug}`}
                  ctaLabel="Learn How It Works"
                  titleAs="h2"
                />
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

      <SectionSeam from="off-white" to="dark" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split" style={{ position: 'relative' }}>
          <Reveal delay={120}>
            <Placeholder label="Adult Taekwondo training session" icon="🥋" variant="tall" />
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="Train Your Way"
              title={<>Fitness, focus &amp; real self-defense</>}
              lead="Whether you want to lose weight, relieve stress, or learn to protect yourself and your family, our adult classes deliver a full-body workout in a supportive, no-ego environment."
            />
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" />

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <SectionHeading eyebrow="FAQs" title="Getting started as an adult" />
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
