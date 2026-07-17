import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import { CHILDREN_PROGRAMS, SITE } from '../data/site'

export default function ChildrenPrograms() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Children's Programs
          </div>
          <h1>Children's Programs</h1>
          <p>
            Confidence, focus, and respect — built one class at a time. Our
            age-specific children's classes help kids thrive on and off the mat.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {CHILDREN_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90}>
                <div className="card">
                  <Placeholder className="card__top" label={p.title} icon="🧒" />
                  <div className="card__body">
                    {p.ages && <span className="card__ages">{p.ages}</span>}
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.blurb}</p>
                    <Link to="/contact" className="card__link">
                      Learn How It Works →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">The UBBA Difference</span>
            <h2 className="section-title">More Than Kicks &amp; Punches</h2>
            <p className="section-lead">
              Every children's class blends high-energy fun with real life skills.
              Kids learn to set goals, listen closely, and treat others with
              respect — habits that make them better students, friends, and family
              members.
            </p>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta}
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <Placeholder label="Kids martial arts class" icon="🥋" variant="tall" />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Give Your Child A Head Start"
        text="Book a free introductory class and watch your child's confidence grow."
      />
    </>
  )
}
