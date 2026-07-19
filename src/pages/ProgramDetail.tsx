import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import OptimizedImage from '../components/OptimizedImage'
import Reveal from '../components/Reveal'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import ProgramCard from '../components/ProgramCard'
import SectionSeam from '../components/SectionSeam'
import NotFound from './NotFound'
import {
  getProgram,
  FAQS,
  SITE,
  LOCATIONS,
  childrenFreeClassHref,
  getVisibleLocations,
  imageDimensionsFor,
  imageSrcSetFor,
} from '../data/site'

export default function ProgramDetail() {
  const { slug } = useParams()
  const program = slug ? getProgram(slug) : undefined

  if (!program) return <NotFound />

  const isChildren = program.category === 'Children'
  const categoryLabel = isChildren ? "Children's Programs" : 'Adult & Family Programs'
  const categoryTo = isChildren ? '/programs/children' : '/programs/adult'
  const dims = imageDimensionsFor(program.image)
  const related = program.relatedSlugs
    .map((s) => getProgram(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const locationPages = LOCATIONS.filter((loc) => loc.page)
  const visibleLocations = getVisibleLocations()
  const freeClassTo = isChildren
    ? childrenFreeClassHref({ program: program.slug })
    : '/contact'
  const freeClassLabel = isChildren
    ? `Try ${program.name}`
    : SITE.primaryCta

  return (
    <>
      <PageHero
        family="program"
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
      >
        {isChildren ? (
          <div className="flex-actions">
            <Link to={freeClassTo} className="btn btn--blue">
              Schedule a Free Class <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ) : null}
      </PageHero>

      <SectionSeam from="dark" to="off-white" variant="angle" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <div className="photo photo--tall program-detail__photo">
              <OptimizedImage
                src={program.image}
                alt=""
                width={dims.width}
                height={dims.height}
                srcSet={imageSrcSetFor(program.image)}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="program-detail__copy">
              {program.ages && <span className="card__ages">{program.ages}</span>}
              <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
                About {program.name}
              </h2>
              <p className="section-lead">{program.description}</p>
              <h3>Who it&apos;s for</h3>
              <p className="section-lead" style={{ marginTop: '0.5rem' }}>
                {program.audience}
              </p>
              <h3>What you&apos;ll work on</h3>
              <ul className="checklist">
                {program.learn.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <Link to={freeClassTo} className="btn btn--blue mt">
                {freeClassLabel} <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" variant="belt" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container interior-faq program-expect">
          <Reveal>
            <span className="program-expect__index" aria-hidden="true">
              02 — Expectation
            </span>
            <span className="eyebrow">What Students Can Expect</span>
            <h2 className="section-title">Inside the dojang</h2>
            <p className="section-lead">{program.classLooksLike}</p>
            <p className="section-lead" style={{ marginTop: '1rem' }}>
              Ready to try it? Request a free introductory class and we&apos;ll help you
              choose a time at{' '}
              {(isChildren ? visibleLocations : locationPages).map((loc, i, arr) => (
                <span key={loc.id}>
                  {i > 0 && (i === arr.length - 1 ? ', or ' : ', ')}
                  {loc.page ? (
                    <Link
                      to={`/locations/${loc.id}`}
                      style={{ color: 'var(--blue-soft)', fontWeight: 600 }}
                    >
                      {loc.name}
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      style={{ color: 'var(--blue-soft)', fontWeight: 600 }}
                    >
                      {loc.name}
                    </Link>
                  )}
                </span>
              ))}
              .
            </p>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <>
          <SectionSeam from="dark" to="off-white" variant="fade" />
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
                    <ProgramCard
                      title={p.name}
                      text={p.tagline}
                      ages={p.ages}
                      image={p.image}
                      to={
                        p.category === 'Children'
                          ? childrenFreeClassHref({ program: p.slug })
                          : `/programs/${p.slug}`
                      }
                      ctaLabel={
                        p.category === 'Children' ? `Try ${p.name}` : 'View program'
                      }
                      wrapLink
                    />
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <div className="flex-actions mt">
                  <Link to={categoryTo} className="btn btn--outline">
                    All {categoryLabel}
                  </Link>
                  <Link to={freeClassTo} className="btn btn--outline">
                    Schedule a Free Class
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {!related.length && <SectionSeam from="dark" to="off-white" variant="line" />}

      <section className="section section--offwhite">
        <div className="container interior-faq">
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
        primaryTo={freeClassTo}
        primaryLabel={isChildren ? 'Schedule a Free Class' : SITE.primaryCta}
        secondaryTo={categoryTo}
        secondaryLabel={`All ${categoryLabel}`}
      />
    </>
  )
}
