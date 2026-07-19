import Reveal from '../../components/Reveal'
import LeadForm from '../../components/LeadForm'
import SectionHeading from '../../components/SectionHeading'
import { getTrialHighlights } from '../../data/site'

export default function TrialSection() {
  const highlights = getTrialHighlights()

  return (
    <section className="section home-trial" id="trial">
      <div className="dojang dojang--light" aria-hidden="true" />
      <div className="container split">
        <Reveal>
          <SectionHeading
            eyebrow="Get Started"
            title="Crush your fitness goals while learning how to protect yourself"
            lead="Tell us a little about your goals and preferred school. We'll help you choose a program and schedule a free introductory class — no pressure, just a welcoming first step onto the mat."
          />
          <ul className="checklist mt">
            {highlights.map((item) => (
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
