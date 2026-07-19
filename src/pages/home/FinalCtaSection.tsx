import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import {
  SITE,
  formatVisibleLocationList,
  getVisibleLocations,
  locationCtaPath,
} from '../../data/site'

/**
 * Homepage final CTA — full-bleed red band (shared `.cta-band` chrome with `CtaBanner`).
 */
export default function FinalCtaSection() {
  const locations = getVisibleLocations()
  const locationList = formatVisibleLocationList({ style: 'or' })
  const secondary = locations[0]
  const tertiary = locations[1]

  return (
    <section className="cta-band" aria-labelledby="home-final-cta-title">
      <div className="dojang" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="cta-banner cta-banner--bleed">
            <h2 id="home-final-cta-title">Confidence starts with one class</h2>
            <p>
              Beginners are welcome — kids, teens, and adults can start with a free
              class in {locationList}. The first step is simple.
            </p>
            <div className="flex-actions cta-band__actions">
              <Link to="/contact" className="btn btn--blue btn--lg">
                {SITE.primaryCta} <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              {secondary ? (
                <Link to={locationCtaPath(secondary)} className="btn btn--ghost btn--lg">
                  {secondary.name} school
                </Link>
              ) : null}
            </div>
            {tertiary ? (
              <p className="cta-band__secondary">
                Or visit our{' '}
                <Link to={locationCtaPath(tertiary)} className="text-link text-link--on-red">
                  {tertiary.name} location
                </Link>
                {locations.length > 2 ? (
                  <>
                    {' '}
                    or{' '}
                    <Link
                      to={locationCtaPath(locations[2])}
                      className="text-link text-link--on-red"
                    >
                      {locations[2].name}
                    </Link>
                  </>
                ) : null}
                .
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
