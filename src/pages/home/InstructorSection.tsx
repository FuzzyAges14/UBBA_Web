import Reveal from '../../components/Reveal'
import Placeholder from '../../components/Placeholder'
import SectionHeading from '../../components/SectionHeading'
import { OWNER } from '../../data/site'

/**
 * Owner portrait must remain an authentic UBBA photo.
 * Do not substitute stock — see docs/IMAGE_SOURCES.md.
 */
export default function InstructorSection() {
  return (
    <section className="section section--dark home-owner" id="owner">
      <div className="container owner">
        <div className="owner__sticky">
          <Reveal>
            <Placeholder
              label={`OWNER PHOTO REQUIRED — ${OWNER.name}, Head Instructor`}
              icon="🥋"
              variant="tall"
            />
            <p className="ph-note mt-sm">
              Authentic owner portrait required — do not substitute with misleading stock
            </p>
          </Reveal>
        </div>
        <Reveal delay={100} className="owner__copy">
          <div className="home-section-head home-section-head--dark">
            <span className="home-section-num" aria-hidden="true">
              04
            </span>
            <SectionHeading
              eyebrow="Meet The Owner"
              title={`Hi, my name is ${OWNER.name}`}
              lead={OWNER.intro}
            />
          </div>
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
        </Reveal>
      </div>
    </section>
  )
}
