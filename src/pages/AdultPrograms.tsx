import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import { ADULT_PROGRAMS, SITE } from '../data/site'

export default function AdultPrograms() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Adult Programs
          </div>
          <h1>Adult Programs</h1>
          <p>
            Get in the best shape of your life while learning practical
            self-defense. From total beginners to seasoned athletes, there's a
            program for you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {ADULT_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 70}>
                <div className="card">
                  <Placeholder className="card__top" label={p.title} icon="💪" />
                  <div className="card__body">
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
          <Reveal delay={120}>
            <Placeholder label="Adult training session" icon="🥋" variant="tall" />
          </Reveal>
          <Reveal>
            <span className="eyebrow">Train Your Way</span>
            <h2 className="section-title">Fitness, Focus &amp; Real Self-Defense</h2>
            <p className="section-lead">
              Whether you want to lose weight, relieve stress, or learn to protect
              yourself and your family, our adult classes deliver a full-body
              workout in a supportive, no-ego environment.
            </p>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta}
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Your First Class Is Free"
        text="No experience needed. Come see how good it feels to train with a team that has your back."
      />
    </>
  )
}
