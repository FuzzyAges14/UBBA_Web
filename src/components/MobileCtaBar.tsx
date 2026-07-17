import { Link } from 'react-router-dom'

export default function MobileCtaBar() {
  return (
    <nav className="mobile-cta" aria-label="Quick actions">
      <a href="tel:2019622922">
        <span className="ic" aria-hidden="true">📞</span>
        Call
      </a>
      <Link to="/#locations">
        <span className="ic" aria-hidden="true">📍</span>
        Locations
      </Link>
      <Link to="/contact" className="primary">
        <span className="ic" aria-hidden="true">🥋</span>
        Free Trial
      </Link>
    </nav>
  )
}
