import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV, SITE, LOCATIONS, GLEN_ROCK } from '../data/site'

export default function Header() {
  const [shrunk, setShrunk] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const locationCount = LOCATIONS.length + (SITE.showGlenRock ? 1 : 0)
  void GLEN_ROCK

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (to: string) =>
    to === '/'
      ? location.pathname === '/' && !location.hash
      : location.pathname === to.split('#')[0] && to.startsWith('/')
        ? location.pathname !== '/' && location.pathname === to
        : false

  return (
    <header className={`header ${shrunk ? 'header--shrunk' : ''}`}>
      <div className="container header__bar">
        <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
          <img src="/logo.svg" alt="" className="brand__logo" />
          <span className="brand__text">
            <span className="brand__name">United Black Belt</span>
            <span className="brand__sub">Academy</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav__link ${isActive(item.to) ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <span className="header__locations" aria-label={`${locationCount} locations`}>
            <span>📍</span>
            <span>
              <strong>{locationCount}</strong> Locations
            </span>
          </span>
          <Link to="/contact" className="btn btn--gold">
            {SITE.primaryCta}
          </Link>
          <button
            type="button"
            className={`hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        {NAV.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
        <Link to="/contact" className="btn btn--gold btn--block">
          {SITE.primaryCta}
        </Link>
      </div>
    </header>
  )
}
