import { Link } from 'react-router-dom'
import type { Location } from '../data/site'

function mapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

export default function LocationCard({ loc }: { loc: Location }) {
  const detailTo = loc.page ? `/locations/${loc.id}` : '/contact'

  return (
    <div className="loc-card">
      <div className="map-embed">
        <iframe
          title={`Map of ${loc.name}`}
          src={mapSrc(loc.mapQuery)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
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
          <Link to="/contact" className="btn btn--dark">
            Free Class
          </Link>
        </div>
      </div>
    </div>
  )
}
