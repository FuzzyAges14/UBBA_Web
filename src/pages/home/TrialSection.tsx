import Reveal from '../../components/Reveal'
import LeadForm from '../../components/LeadForm'
import SectionHeading from '../../components/SectionHeading'
import { TRIAL_HIGHLIGHTS } from '../../data/site'

export default function TrialSection() {
  return (
    <section className="section" id="trial">
      <div className="container split">
        <Reveal>
          <SectionHeading
            eyebrow="Get Started"
            title="Crush your fitness goals while learning how to protect yourself"
            lead="Tell us a little about yourself and we'll help you choose the perfect program. Your first class is completely free — no pressure, just a great workout."
          />
          <ul className="checklist mt">
            {TRIAL_HIGHLIGHTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  )
}
