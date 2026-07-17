import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import Reveal from './Reveal'

type CtaBannerProps = {
  title?: string
  text?: string
}

export default function CtaBanner({
  title = 'Ready To Get Started?',
  text = 'Your first class is on us. Come see why families across Bergen County choose United Black Belt Academy.',
}: CtaBannerProps) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="cta-banner">
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="flex-actions" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn--gold btn--lg">
                {SITE.primaryCta}
              </Link>
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
