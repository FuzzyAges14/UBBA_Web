import { Link } from 'react-router-dom'
import type { Location } from '../data/site'
import { imageDimensionsFor } from '../data/site'
import TrialCta from './TrialCta'
import OptimizedImage from './OptimizedImage'

function mapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

function mapsPlaceHref(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export default function LocationCard({ loc }: { loc: Location }) {
  const detailTo = loc.page ? `/locations/${loc.id}` : '/contact'
  const photo = loc.imageSrc || loc.visitImageSrc
  const dims = photo ? imageDimensionsFor(photo) : null

  return (
    <div className="loc-card">
      {photo && dims ? (
        <a
          className="map-embed map-embed--photo"
          href={mapsPlaceHref(loc.mapQuery)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${loc.name} in Google Maps`}
        >
          <OptimizedImage
            src={photo}
            alt={`${loc.name} United Black Belt Academy — Google location photo`}
            width={dims.width}
            height={dims.height}
            sizes="(max-width: 900px) 100vw, 33vw"
            loading="lazy"
          />
          <span className="map-embed__badge">Google Maps</span>
        </a>
      ) : (
        <div className="map-embed">
          <iframe
            title={`Map of ${loc.name}`}
            src={mapSrc(loc.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
      <div className="loc-card__body">
        <h3 className="loc-card__name">
          {loc.name}
          {loc.isNew && <span className="loc-badge">New</span>}
        </h3>
        <p className="loc-card__meta">
          {loc.address}
          <br />
          {loc.city}
        </p>
        {loc.phone && (
          <p className="loc-card__meta">
            <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}>{loc.phone}</a>
          </p>
        )}
        {loc.note && (
          <p className="loc-card__meta">
            <em>{loc.note}</em>
          </p>
        )}
        {loc.placeholder && (
          <p className="loc-card__meta">
            <em>Placeholder location — enable in site settings if kept.</em>
          </p>
        )}
        <div className="loc-card__actions">
          <Link to={detailTo} className="btn btn--outline">
            {loc.page ? `Visit ${loc.name} Page` : 'View Contact Page'}
          </Link>
          <TrialCta className="btn btn--dark">Free Class</TrialCta>
        </div>
      </div>
    </div>
  )
}
