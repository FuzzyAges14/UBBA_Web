import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import OptimizedImage from '../components/OptimizedImage'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import ProgramCard from '../components/ProgramCard'
import SectionHeading from '../components/SectionHeading'
import SectionSeam from '../components/SectionSeam'
import {
  ADULT_PROGRAMS,
  FAQS,
  IMAGE_DIMENSIONS,
  IMAGES,
  PROGRAM_GLYPHS,
  SITE,
} from '../data/site'

export default function AdultPrograms() {
  return (
    <>
      <PageHero
        family="program"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Adult & Family Programs' }]}
        title="Adult & Family Martial Arts"
        intro="Fitness, focus, and practical self-defense for adults — plus family training options. Beginners are welcome at our Allendale and Midland Park schools."
      />

      <SectionSeam from="dark" to="off-white" />

      <section className="section">
        <div className="container program-overview__grid">
          <div className="grid grid--3">
            {ADULT_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 70}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  image={p.image}
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
        <div className="container split interior-split">
          <Reveal delay={120}>
            <figure className="interior-media interior-media--tall interior-media--focus-center">
              <div className="interior-media__veil" aria-hidden="true" />
              <OptimizedImage
                src={IMAGES.action}
                alt="Adult martial artist practicing a high kick (temporary stock photography)"
                width={IMAGE_DIMENSIONS.action.width}
                height={IMAGE_DIMENSIONS.action.height}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <figcaption className="interior-media__credit">
                Temporary stock — not UBBA instructors or students
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="Train Your Way"
              title={<>Fitness, focus &amp; real self-defense</>}
              lead="Whether you want a motivating alternative to the gym, a place to relieve stress, or practical self-defense skills, adult classes deliver a full-body workout in a supportive, no-ego environment — no prior martial arts background required."
            />
            <div className="flex-actions mt">
              <Link to="/contact" className="btn btn--gold">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/locations/allendale" className="btn btn--outline">
                Allendale
              </Link>
              <Link to="/locations/midland-park" className="btn btn--outline">
                Midland Park
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" />

      <section className="section section--offwhite">
        <div className="container interior-faq">
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
