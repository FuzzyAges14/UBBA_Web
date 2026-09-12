import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import TrialCta from '../../components/TrialCta'
import { getLocationAreaLabel, getVisibleLocations } from '../../data/site'

/**
 * Homepage final CTA — full-bleed red band (shared `.cta-band` chrome with `CtaBanner`).
 * Primary CTA opens the NextKick portal; copy/links include all visible schools.
 */
export default function FinalCtaSection() {
  const locations = getVisibleLocations()

  return (
    <section className="cta-band" aria-labelledby="home-final-cta-title">
      <div className="dojang" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="cta-banner cta-banner--bleed">
            <h2 id="home-final-cta-title">Confidence starts with one class</h2>
            <p>
              Beginners are welcome — kids, teens, and adults can start with a free
              class in {getLocationAreaLabel()}. The first step is simple.
            </p>
            <div className="flex-actions cta-band__actions">
              <TrialCta className="btn btn--blue btn--lg" arrow />
              <Link to="/#locations" className="btn btn--ghost btn--lg">
                Our schools
              </Link>
            </div>
            <p className="cta-band__secondary">
              Or visit our{' '}
              {locations.map((loc, i) => {
                let sep: string | null = null
                if (i > 0) {
                  sep =
                    i === locations.length - 1
                      ? locations.length === 2
                        ? ' or '
                        : ', or '
                      : ', '
                }
                return (
                  <span key={loc.slug}>
                    {sep}
                    <Link
                      to={`/locations/${loc.slug}`}
                      className="text-link text-link--on-red"
                    >
                      {loc.name}
                    </Link>
                  </span>
                )
              })}
              {' location pages.'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
