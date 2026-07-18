import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import OptimizedImage from '../components/OptimizedImage'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import ProgramCard from '../components/ProgramCard'
import SectionHeading from '../components/SectionHeading'
import SectionSeam from '../components/SectionSeam'
import {
  CHILDREN_PROGRAMS,
  FAQS,
  IMAGE_DIMENSIONS,
  IMAGES,
  PROGRAM_GLYPHS,
  SITE,
} from '../data/site'

const LEARN = [
  'Focus & listening skills that carry into the classroom',
  'Confidence to try, fail, and try again',
  'Respect for instructors, teammates, and family',
  'Coordination, balance, and healthy movement',
  'Goal setting through the belt curriculum',
  'Practical, age-appropriate self-defense',
]

export default function ChildrenPrograms() {
  return (
    <>
      <PageHero
        family="program"
        crumbs={[{ label: 'Home', to: '/' }, { label: "Children's Programs" }]}
        title="Children's Martial Arts Programs"
        intro="Confidence, focus, discipline, and respect — built one class at a time. Age-specific Taekwondo for kids and teens at our Allendale and Midland Park schools."
      />

      <SectionSeam from="dark" to="off-white" />

      <section className="section">
        <div className="container program-overview__grid">
          <div className="grid grid--3">
            {CHILDREN_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  ages={p.ages}
                  image={p.image}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={`/programs/${p.slug}`}
                  ctaLabel="Learn How It Works"
                  titleAs="h2"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split interior-split">
          <Reveal>
            <SectionHeading
              eyebrow="What Students Learn"
              title={<>More than kicks &amp; punches</>}
              lead="Every children's class blends high-energy fun with skills that support school, friendships, and family life — without promising specific grades or outcomes. Students practice focus, respect, and healthy movement in a welcoming dojang."
            />
            <ul className="checklist mt">
              {LEARN.map((l) => (
                <li key={l} style={{ color: 'var(--muted-light)' }}>
                  {l}
                </li>
              ))}
            </ul>
            <div className="flex-actions mt">
              <Link to="/contact" className="btn btn--blue">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/locations/allendale" className="btn btn--outline">
                Allendale
              </Link>
              <Link to="/locations/midland-park" className="btn btn--outline">
                Midland Park
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="interior-media interior-media--tall interior-media--focus-top">
              <div className="interior-media__veil" aria-hidden="true" />
              <OptimizedImage
                src={IMAGES.kidsGroup}
                alt="Young martial arts students practicing punches together in class"
                width={IMAGE_DIMENSIONS.kidsGroup.width}
                height={IMAGE_DIMENSIONS.kidsGroup.height}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" />

      <section className="section section--offwhite">
        <div className="container interior-faq">
          <Reveal>
            <SectionHeading
              eyebrow="Parent FAQs"
              title="What parents ask us most"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Try a free children's class"
        text="Book a complimentary introductory class for Tiny Tigers, Junior Tigers, or Teen Martial Arts — beginners welcome."
      />
    </>
  )
}
