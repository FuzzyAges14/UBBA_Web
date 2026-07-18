import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import { GETTING_STARTED } from '../../data/site'

export default function BeltJourneySection() {
  return (
    <section className="section section--graphite">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Getting Started"
            title="Your journey, belt by belt"
            lead="Starting is simple. Here's the path from your first free class to lifelong growth."
          />
        </Reveal>
        <div className="journey mt">
          {GETTING_STARTED.map((step, i) => (
            <Reveal key={step.title} delay={i * 90}>
              <div className="jstep">
                <div className="jstep__belt" style={{ background: step.color }} />
                <div className="jstep__n">
                  Step {i + 1} · {step.belt}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
