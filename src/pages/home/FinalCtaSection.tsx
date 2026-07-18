import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import { SITE } from '../../data/site'

/**
 * Homepage-specific final CTA (free class + school location links).
 * Kept separate from shared `CtaBanner`, which uses a two-link pattern.
 */
export default function FinalCtaSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta-banner">
            <div className="dojang" aria-hidden="true" />
            <h2>Confidence starts with one class</h2>
            <p>
              Beginners are welcome — kids, teens, and adults can start with a free
              class in Allendale or Midland Park. The first step is simple.
            </p>
            <div className="flex-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--gold btn--lg">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/locations/allendale" className="btn btn--ghost btn--lg">
                Allendale
              </Link>
              <Link to="/locations/midland-park" className="btn btn--ghost btn--lg">
                Midland Park
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
