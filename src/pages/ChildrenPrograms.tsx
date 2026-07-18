import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import ProgramCard from '../components/ProgramCard'
import SectionHeading from '../components/SectionHeading'
import SectionSeam from '../components/SectionSeam'
import { CHILDREN_PROGRAMS, FAQS, PROGRAM_GLYPHS, SITE } from '../data/site'

const LEARN = [
  'Focus & listening skills that carry into the classroom',
  'Confidence to try, fail, and try again',
  'Respect for instructors, teammates, and family',
  'Coordination, balance, and healthy movement',
  'Goal setting through the belt curriculum',
  'Practical, age-appropriate self-defense',
]

export default function ChildrenPrograms() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: "Children's Programs" }]}
        title="Children's Programs"
        intro="Confidence, focus, and respect — built one class at a time. Our age-specific children's classes help kids thrive on and off the mat."
      />

      <SectionSeam from="dark" to="off-white" />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {CHILDREN_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  ages={p.ages}
                  image={p.image}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={`/programs/${p.slug}`}
                  ctaLabel="Learn How It Works"
                  titleAs="h2"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split" style={{ position: 'relative' }}>
          <Reveal>
            <SectionHeading
              eyebrow="What Students Learn"
              title={<>More than kicks &amp; punches</>}
              lead="Every children's class blends high-energy fun with real life skills that help kids become better students, friends, and family members."
            />
            <ul className="checklist mt">
              {LEARN.map((l) => (
                <li key={l} style={{ color: 'var(--muted-light)' }}>
                  {l}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Placeholder label="Kids Taekwondo class" icon="🥋" variant="tall" />
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" />

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <SectionHeading
              eyebrow="Parent FAQs"
              title="What parents ask us most"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Give your child a head start"
        text="Book a free introductory class and watch your child's confidence grow."
      />
    </>
  )
}
