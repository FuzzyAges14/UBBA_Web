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

export default function CtaBanner({
  title = 'Ready To Get Started?',
  text = 'Your first class is on us. Come see why families across Bergen County choose United Black Belt Academy.',
  primaryTo = '/contact',
  primaryLabel = SITE.primaryCta,
  secondaryTo = '/programs/children',
  secondaryLabel = 'Explore Programs',
}: CtaBannerProps) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta-banner">
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="flex-actions" style={{ justifyContent: 'center' }}>
              <Link to={primaryTo} className="btn btn--blue btn--lg">
                {primaryLabel}
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
