import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import OptimizedImage from '../components/OptimizedImage'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import SectionSeam from '../components/SectionSeam'
import NotFound from './NotFound'
import { getProgram, FAQS, SITE, imageDimensionsFor } from '../data/site'

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = slug ? getProgram(slug) : undefined

  if (!program) return <NotFound />

  const isChildren = program.category === 'Children'
  const categoryLabel = isChildren ? "Children's Programs" : 'Adult & Family Programs'
  const categoryTo = isChildren ? '/programs/children' : '/programs/adult'
  const dims = imageDimensionsFor(program.image)

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: categoryLabel, to: categoryTo },
          { label: program.name },
        ]}
        title={program.name}
        intro={program.tagline}
      />

      <SectionSeam from="dark" to="off-white" />

      {/* Overview */}
      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="photo photo--tall">
              <OptimizedImage
                src={program.image}
                alt=""
                width={dims.width}
                height={dims.height}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
              <span className="photo__credit">Placeholder photo</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {program.ages && <span className="card__ages">{program.ages}</span>}
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              About {program.name}
            </h2>
            <p className="section-lead">{program.description}</p>
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>
              What you'll learn
            </h3>
            <ul className="checklist mt-sm">
              {program.learn.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" />

      {/* What a class looks like */}
      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container" style={{ maxWidth: '820px', position: 'relative' }}>
          <Reveal>
            <span className="eyebrow">What A Class Looks Like</span>
            <h2 className="section-title">Inside the dojang</h2>
            <p className="section-lead">{program.classLooksLike}</p>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" />

      {/* FAQ */}
      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Common questions</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={`Try ${program.name} for free`}
        text="Book a free introductory class — no experience required, beginners always welcome."
      />
    </>
  )
}
