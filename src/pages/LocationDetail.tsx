import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import OwnerMediaSlot from '../components/OwnerMediaSlot'
import Reveal from '../components/Reveal'
import CtaBanner from '../components/CtaBanner'
import ProgramCard from '../components/ProgramCard'
import SectionSeam from '../components/SectionSeam'
import NotFound from './NotFound'
import {
  getLocation,
  CHILDREN_PROGRAMS,
  ADULT_PROGRAMS,
  PROGRAM_GLYPHS,
  SITE,
} from '../data/site'

function mapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

function directionsHref(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
}

export default function LocationDetail() {
  const { slug } = useParams()
  const loc = slug ? getLocation(slug) : undefined

  if (!loc || !loc.page) return <NotFound />

  const page = loc.page
  const sibling = slug === 'allendale' ? getLocation('midland-park') : getLocation('allendale')
  const programLinks = [...CHILDREN_PROGRAMS, ...ADULT_PROGRAMS.slice(0, 2)]

  return (
    <>
      <PageHero
        family="location"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Locations', to: '/#locations' },
          { label: loc.name },
        ]}
        title={`${loc.name} Martial Arts Classes`}
        intro={page.headline}
      >
        <div className="flex-actions" style={{ justifyContent: 'flex-start' }}>
          <Link to="/contact" className="btn btn--blue btn--lg">
            {SITE.primaryCta} <span className="btn__arrow">→</span>
          </Link>
          {loc.phone && (
            <a
              href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}
              className="btn btn--outline btn--lg"
            >
              Call {loc.name}
            </a>
          )}
        </div>
      </PageHero>

      <SectionSeam from="dark" to="off-white" variant="fade" />

      <section className="section">
        <div className="container split">
          <Reveal>
            <OwnerMediaSlot label={page.imageLabel} icon="🏫" />
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">United Black Belt Academy</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Welcome to our {loc.name} school
            </h2>
            <p className="section-lead">{page.intro}</p>
            <p className="section-lead" style={{ marginTop: '1rem' }}>
              {page.programsBlurb}
            </p>
            <div className="flex-actions mt">
              <Link to="/programs/children" className="btn btn--outline">
                Children&apos;s Programs
              </Link>
              <Link to="/programs/adult" className="btn btn--outline">
                Adult Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" variant="angle" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split interior-split">
          <Reveal>
            <div className="loc-card" style={{ margin: 0 }}>
              <div className="map-embed">
                <iframe
                  title={`Map of ${loc.name}`}
                  src={mapSrc(loc.mapQuery)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <span className="eyebrow">Visit Us</span>
            <h2 className="section-title">Address, hours &amp; directions</h2>
            <p className="section-lead location-visit__meta">
              {loc.address}
              <br />
              {loc.city}
            </p>
            {loc.phone ? (
              <p className="location-visit__phone">
                <strong>Phone: </strong>
                <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}>{loc.phone}</a>
              </p>
            ) : (
              <p className="ph-note" style={{ marginTop: '0.5rem' }}>
                Phone number — pending owner confirmation.
              </p>
            )}
            {loc.note && (
              <p className="ph-note" style={{ marginTop: '0.4rem' }}>
                {loc.note}
              </p>
            )}
            {loc.hours ? (
              <table className="hours mt-sm">
                <tbody>
                  {loc.hours.map((h) => (
                    <tr key={h.day}>
                      <td>{h.day}</td>
                      <td>{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="ph-note mt-sm">
                Operating hours — pending owner confirmation. Call or send a free-class
                request and we&apos;ll share current times.
              </p>
            )}
            {loc.detailsPending && loc.hours && (
              <p className="ph-note mt-sm">
                Hours shown pending final owner verification.
              </p>
            )}
            <div className="flex-actions mt">
              <a
                href={directionsHref(loc.mapQuery)}
                target="_blank"
                rel="noreferrer"
                className="btn btn--outline"
              >
                Get Directions
              </a>
              <Link to="/contact" className="btn btn--blue">
                Request a Free Class
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" variant="belt" />

      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Nearby Communities</span>
            <h2 className="section-title">Families often visit from</h2>
            <p className="section-lead">
              Convenient for households throughout the area — choose the school that fits
              your commute. This list is for local orientation, not a claim of exclusive
              service territory.
            </p>
            <ul className="community-list">
              {page.communitiesServed.map((town) => (
                <li key={town}>{town}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Programs</span>
            <h2 className="section-title">Train at {loc.name}</h2>
            <p className="section-lead">
              Explore age-specific paths, then tell us which {loc.name} class times work
              for your family. Schedules can vary by location.
            </p>
          </Reveal>
          <div className="grid grid--3 mt">
            {programLinks.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 70}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  ages={p.ages}
                  image={p.image}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={`/programs/${p.slug}`}
                  ctaLabel="View program"
                  wrapLink
                />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex-actions mt" style={{ flexWrap: 'wrap' }}>
              <Link to="/just-4-kids" className="btn btn--outline">
                Just 4 Kids Events
              </Link>
              {sibling?.page && (
                <Link to={`/locations/${sibling.id}`} className="btn btn--outline">
                  Also see {sibling.name}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={`Try a free class in ${loc.name}`}
        text="Beginners are welcome. Share a few details and we’ll help you pick the right program and time at this school."
      />
    </>
  )
}
