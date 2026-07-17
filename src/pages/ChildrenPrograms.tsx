import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import { CHILDREN_PROGRAMS, FAQS, SITE } from '../data/site'

const GLYPH: Record<string, string> = {
  'tiny-tigers': '🐯',
  'junior-tigers': '🥋',
  'teen-martial-arts': '⚡',
}

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

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {CHILDREN_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90}>
                <div className="pcard" style={{ minHeight: 420 }}>
                  <div className="pcard__art" />
                  <div className="pcard__scrim" />
                  <span className="pcard__glyph" aria-hidden="true">
                    {GLYPH[p.id]}
                  </span>
                  <div className="pcard__body">
                    {p.ages && <span className="pcard__age">{p.ages}</span>}
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
        </div>
      </section>

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split" style={{ position: 'relative' }}>
          <Reveal>
            <span className="eyebrow">What Students Learn</span>
            <h2 className="section-title">More than kicks &amp; punches</h2>
            <p className="section-lead">
              Every children's class blends high-energy fun with real life skills
              that help kids become better students, friends, and family members.
            </p>
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

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">Parent FAQs</span>
            <h2 className="section-title">What parents ask us most</h2>
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
