import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import { GETTING_STARTED } from '../../data/site'

export default function BeltJourneySection() {
  return (
    <section className="section section--graphite home-journey">
      <div className="container">
        <Reveal>
          <div className="home-section-head home-section-head--dark">
            <span className="home-section-num" aria-hidden="true">
              05
            </span>
            <SectionHeading
              eyebrow="Getting Started"
              title="Your journey, belt by belt"
              lead="Starting is simple. Here's the path from your first free class to lifelong growth."
            />
          </div>
        </Reveal>

        <div className="belt-bar home-journey__belt mt" aria-hidden="true">
          {GETTING_STARTED.map((step) => (
            <span key={step.belt} style={{ background: step.color }} />
          ))}
        </div>

        <ol className="home-journey__path mt">
          {GETTING_STARTED.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 80} className="home-journey__step">
              <span className="home-journey__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div
                className="home-journey__swatch"
                style={{ background: step.color }}
                aria-hidden="true"
              />
              <div className="home-journey__copy">
                <div className="home-journey__belt-label">
                  Step {i + 1} · {step.belt}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
