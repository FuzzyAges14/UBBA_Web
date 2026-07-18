import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import Placeholder from '../../components/Placeholder'
import SectionHeading from '../../components/SectionHeading'
import { OWNER, SITE } from '../../data/site'

export default function InstructorSection() {
  return (
    <section className="section section--dark" id="owner">
      <div className="container owner">
        <div className="owner__sticky">
          <Reveal>
            <Placeholder
              label={`${OWNER.name}, Head Instructor`}
              icon="🥋"
              variant="tall"
            />
          </Reveal>
        </div>
        <Reveal delay={100} className="owner__copy">
          <SectionHeading
            eyebrow="Meet The Owner"
            title={`Hi, my name is ${OWNER.name}`}
            lead={OWNER.intro}
          />
          <blockquote className="owner__quote">"{OWNER.quote}"</blockquote>
          <div className="stack-gap">
            {OWNER.story.map((para) => (
              <p key={para.slice(0, 24)} className="section-lead" style={{ marginTop: 0 }}>
                {para}
              </p>
            ))}
          </div>
          <p className="owner__sign mt">— {OWNER.name}</p>
          <ul className="checklist mt-sm">
            {OWNER.credentials.map((c) => (
              <li key={c} style={{ color: 'var(--muted-light)' }}>
                {c}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--blue mt">
            {SITE.primaryCta} <span className="btn__arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
