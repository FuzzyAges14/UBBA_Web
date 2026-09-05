import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import { getLocationAreaLabel, SITE } from '../../data/site'

/**
 * Homepage final CTA — full-bleed red band (shared `.cta-band` chrome with `CtaBanner`).
 */
export default function FinalCtaSection() {
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
              <Link to="/contact" className="btn btn--blue btn--lg">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/#locations" className="btn btn--ghost btn--lg">
                Our schools
              </Link>
            </div>
            <p className="cta-band__secondary">
              Or visit our{' '}
              <Link to="/locations/allendale" className="text-link text-link--on-red">
                Allendale
              </Link>
              {' or '}
              <Link to="/locations/midland-park" className="text-link text-link--on-red">
                Midland Park
              </Link>
              {' location pages.'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
