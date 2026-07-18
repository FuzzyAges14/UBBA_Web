import { getVisibleLocations } from '../../data/site'

/**
 * Post-hero trust signals — kept out of the first viewport so the hero stays
 * brand + headline + CTA focused.
 */
export default function TrustStrip() {
  const locationCount = getVisibleLocations().length

  return (
    <aside className="home-trust" aria-label="Academy highlights">
      <div className="container home-trust__inner">
        <span className="home-trust__item">
          <span className="home-trust__mark" aria-hidden="true">
            ★★★★★
          </span>
          Loved by local families
        </span>
        <span className="home-trust__item">
          <span className="home-trust__dot" aria-hidden="true" />
          Ages 3 through adult
        </span>
        <span className="home-trust__item">
          <span className="home-trust__dot" aria-hidden="true" />
          {locationCount} convenient Bergen County locations
        </span>
        <span className="home-trust__item home-trust__item--place">
          <span className="home-trust__dot" aria-hidden="true" />
          Allendale &amp; Midland Park, NJ
        </span>
      </div>
    </aside>
  )
}
