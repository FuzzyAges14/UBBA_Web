import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import Reveal from './Reveal'

type CtaBannerProps = {
  title?: string
  text?: string
  primaryTo?: string
  primaryLabel?: string
  secondaryTo?: string
  secondaryLabel?: string
}

/** Full-bleed red CTA band — same chrome as the homepage final CTA. */
export default function CtaBanner({
  title = 'Ready To Get Started?',
  text = 'Your first class is on us. Come see why families across Bergen County choose United Black Belt Academy.',
  primaryTo = '/contact',
  primaryLabel = SITE.primaryCta,
  secondaryTo = '/programs/children',
  secondaryLabel = 'Explore Programs',
}: CtaBannerProps) {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="dojang" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <div className="cta-banner cta-banner--bleed">
            <h2 id="cta-band-title">{title}</h2>
            <p>{text}</p>
            <div className="flex-actions cta-band__actions">
              <Link to={primaryTo} className="btn btn--blue btn--lg">
                {primaryLabel} <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
              <Link to={secondaryTo} className="btn btn--ghost btn--lg">
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
