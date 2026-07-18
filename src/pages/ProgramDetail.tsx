import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import OptimizedImage from '../components/OptimizedImage'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import SectionSeam from '../components/SectionSeam'
import NotFound from './NotFound'
import { getProgram, FAQS, SITE, LOCATIONS, imageDimensionsFor } from '../data/site'

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = slug ? getProgram(slug) : undefined

  if (!program) return <NotFound />

  const isChildren = program.category === 'Children'
  const categoryLabel = isChildren ? "Children's Programs" : 'Adult & Family Programs'
  const categoryTo = isChildren ? '/programs/children' : '/programs/adult'
  const related = program.relatedSlugs
    .map((s) => getProgram(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const locationPages = LOCATIONS.filter((loc) => loc.page)
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
        intro={
          <>
            {program.tagline}
            {program.ages ? ` ${program.ages}.` : ''}
          </>
        }
      />

      <SectionSeam from="dark" to="off-white" />

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
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>Who it&apos;s for</h3>
            <p className="section-lead" style={{ marginTop: '0.5rem' }}>
              {program.audience}
            </p>
            <h3 style={{ marginTop: '1.6rem', fontSize: '1.2rem' }}>
              What you&apos;ll work on
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

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container" style={{ maxWidth: '820px', position: 'relative' }}>
          <Reveal>
            <span className="eyebrow">What Students Can Expect</span>
            <h2 className="section-title">Inside the dojang</h2>
            <p className="section-lead">{program.classLooksLike}</p>
            <p className="section-lead" style={{ marginTop: '1rem' }}>
              Ready to try it? Request a free introductory class and we&apos;ll help you
              choose a time at{' '}
              {locationPages.map((loc, i) => (
                <span key={loc.id}>
                  {i > 0 && (i === locationPages.length - 1 ? ', or ' : ', ')}
                  <Link
                    to={`/locations/${loc.id}`}
                    style={{ color: 'var(--blue-soft)', fontWeight: 600 }}
                  >
                    {loc.name}
                  </Link>
                </span>
              ))}
              .
            </p>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <SectionSeam from="dark" to="off-white" />
          <section className="section">
            <div className="container">
              <Reveal>
                <span className="eyebrow">Keep Exploring</span>
                <h2 className="section-title">Related programs</h2>
                <p className="section-lead">
                  Looking for a different age group or training focus? These paths are a
                  natural next step.
                </p>
              </Reveal>
              <div className="grid grid--3 mt">
                {related.map((p, i) => (
                  <Reveal as="article" key={p.slug} delay={i * 70}>
                    <Link to={`/programs/${p.slug}`} className="pcard">
                      <div className="pcard__art" />
                      <div className="pcard__scrim" />
                      <div className="pcard__body">
                        {p.ages && <span className="pcard__age">{p.ages}</span>}
                        <h3 className="pcard__title">{p.name}</h3>
                        <p className="pcard__text">{p.tagline}</p>
                        <span className="pcard__cta">
                          Learn more <span className="btn__arrow">→</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <div className="flex-actions mt">
                  <Link to={categoryTo} className="btn btn--outline">
                    All {categoryLabel}
                  </Link>
                  <Link to="/contact" className="btn btn--ghost">
                    Contact &amp; free class
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {!related.length && <SectionSeam from="dark" to="off-white" />}

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
