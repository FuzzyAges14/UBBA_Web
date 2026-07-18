import Reveal from '../../components/Reveal'
import LeadForm from '../../components/LeadForm'
import SectionHeading from '../../components/SectionHeading'
import { TRIAL_HIGHLIGHTS } from '../../data/site'

export default function TrialSection() {
  return (
    <section className="section home-trial" id="trial">
      <div className="dojang dojang--light" aria-hidden="true" />
      <div className="container split">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              03
            </span>
            <div className="home-section-head__body">
              <SectionHeading
                eyebrow="Get Started"
                title="Crush your fitness goals while learning how to protect yourself"
                lead="Tell us a little about your goals and preferred school. We'll help you choose a program and schedule a free introductory class — no pressure, just a welcoming first step onto the mat."
              />
              <ul className="checklist mt">
                {TRIAL_HIGHLIGHTS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  )
}
