import Reveal from '../../components/Reveal'
import OptimizedImage from '../../components/OptimizedImage'
import SectionHeading from '../../components/SectionHeading'
import Taegeuk from '../../components/Taegeuk'
import { IMAGE_DIMENSIONS, IMAGES } from '../../data/site'

const BENEFIT_POINTS = [
  'Confidence that shows up at school, work, and home',
  'Discipline and focus practiced every class',
  'Fitness and coordination for every age',
  'Practical self-defense in a welcoming dojang',
] as const

export default function BenefitsSection() {
  return (
    <section className="section section--dark home-benefits">
      <div className="dojang" aria-hidden="true" />
      <div className="motion-lines" aria-hidden="true">
        <span style={{ top: '18%', left: '-5%' }} />
        <span style={{ top: '62%', left: '45%', width: '55%' }} />
      </div>
      <div className="container split home-benefits__split">
        <Reveal>
          <div className="home-section-head home-section-head--dark">
            <span className="home-section-num" aria-hidden="true">
              02
            </span>
            <div className="home-section-head__body">
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
              <ul className="checklist mt">
                {BENEFIT_POINTS.map((item) => (
                  <li key={item} style={{ color: 'var(--muted-light)' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="home-benefits__media">
            <div className="accent-orb" aria-hidden="true">
              <Taegeuk size={88} spin />
            </div>
            <figure className="photo photo--tall photo--zoom">
              <OptimizedImage
                src={IMAGES.action}
                alt="Martial arts training in a dojang"
                {...IMAGE_DIMENSIONS.action}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </figure>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
