import Reveal from '../../components/Reveal'
import OptimizedImage from '../../components/OptimizedImage'
import SectionHeading from '../../components/SectionHeading'
import { IMAGE_DIMENSIONS, IMAGES, OWNER } from '../../data/site'

/** Owner portrait from the live unitedbba.com site (Master Lee / Sanghyun Lee). */
export default function InstructorSection() {
  return (
    <section className="section section--dark home-owner" id="owner">
      <div className="container owner">
        <div className="owner__sticky">
          <Reveal>
            <figure className="owner__photo">
              <OptimizedImage
                src={IMAGES.instructorPortrait}
                alt={`${OWNER.name}, Head Instructor and owner of United Black Belt Academy`}
                width={IMAGE_DIMENSIONS.instructorPortrait.width}
                height={IMAGE_DIMENSIONS.instructorPortrait.height}
                loading="lazy"
                sizes="(max-width: 900px) 70vw, 320px"
              />
            </figure>
          </Reveal>
        </div>
        <Reveal delay={100} className="owner__copy">
          <div className="home-section-head home-section-head--dark">
            <span className="home-section-num" aria-hidden="true">
              04
            </span>
            <div className="home-section-head__body">
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
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
