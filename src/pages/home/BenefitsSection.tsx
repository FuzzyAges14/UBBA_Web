import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import { BENEFITS_MEDIA } from '../../data/authenticMedia'

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
        </Reveal>
        <Reveal delay={120}>
          <figure className="home-benefits__media">
            <picture>
              <source type="image/webp" srcSet={BENEFITS_MEDIA.webpSrcSet} sizes="(max-width: 900px) 100vw, 48vw" />
              <img
                src={BENEFITS_MEDIA.src}
                srcSet={BENEFITS_MEDIA.srcSet}
                sizes="(max-width: 900px) 100vw, 48vw"
                alt={BENEFITS_MEDIA.alt}
                width={BENEFITS_MEDIA.width}
                height={BENEFITS_MEDIA.height}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="home-benefits__caption">
              <span className="home-benefits__caption-kicker">On The Mat</span>
              <span className="home-benefits__caption-copy">
                Discipline. Respect. Confidence.
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
