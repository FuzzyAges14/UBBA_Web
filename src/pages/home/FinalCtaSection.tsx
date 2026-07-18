import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import { SITE } from '../../data/site'

/**
 * Homepage-specific final CTA (three actions including tel:).
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
              Beginners are welcome, no experience is required, and children and
              adults can both start today. The first step is simple.
            </p>
            <div className="flex-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--gold btn--lg">
                {SITE.primaryCta} <span className="btn__arrow">→</span>
              </Link>
              <a href="tel:2019622922" className="btn btn--ghost btn--lg">
                Call Allendale
              </a>
              <Link to="/programs/children" className="btn btn--ghost btn--lg">
                Explore Programs
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
