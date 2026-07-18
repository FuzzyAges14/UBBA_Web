import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import { SITE } from '../../data/site'

/**
 * Homepage-specific final CTA (free class + school location links).
 * Kept separate from shared `CtaBanner`, which uses a two-link pattern.
 */
export default function FinalCtaSection() {
  return (
    <section className="home-final-cta" aria-labelledby="home-final-cta-title">
      <div className="dojang" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="cta-banner cta-banner--bleed">
            <h2 id="home-final-cta-title">Confidence starts with one class</h2>
            <p>
              Beginners are welcome — kids, teens, and adults can start with a free
              class in Allendale or Midland Park. The first step is simple.
            </p>
            <div className="flex-actions home-final-cta__actions">
              <Link to="/contact" className="btn btn--blue btn--lg">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/locations/allendale" className="btn btn--ghost btn--lg">
                Allendale school
              </Link>
            </div>
            <p className="home-final-cta__secondary">
              Or visit our{' '}
              <Link to="/locations/midland-park" className="text-link text-link--on-red">
                Midland Park location
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
