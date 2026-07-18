import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import Placeholder from '../../components/Placeholder'
import SectionHeading from '../../components/SectionHeading'
import Taegeuk from '../../components/Taegeuk'
import { SITE, VALUES } from '../../data/site'

export default function BenefitsSection() {
  return (
    <section className="section section--dark">
      <div className="dojang" aria-hidden="true" />
      <div className="container split" style={{ position: 'relative' }}>
        <Reveal>
          <SectionHeading
            eyebrow="Why It Matters"
            title={
              <>
                We help parents raise confident leaders &amp; adults reach their full
                potential
              </>
            }
            lead="Martial arts is about far more than kicks and punches. Every class is built to strengthen the skills that carry into school, work, and life."
          />
          <div className="pill-row">
            {VALUES.map((v) => (
              <span className="pill" key={v}>
                {v}
              </span>
            ))}
          </div>
          <Link to="/contact" className="btn btn--gold mt">
            {SITE.primaryCta} <span className="btn__arrow">→</span>
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ position: 'relative' }}>
            <div className="accent-orb" aria-hidden="true">
              <Taegeuk size={88} spin />
            </div>
            <Placeholder
              label="Instructor coaching a young student"
              icon="🏆"
              variant="tall"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
