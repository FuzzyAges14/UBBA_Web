import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE, LOCATIONS, MEGA_MENU } from '../data/site'

const TOP_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#owner' },
  { label: 'Just 4 Kids', to: '/just-4-kids' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const location = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)

  const locationCount = LOCATIONS.length + (SITE.showGlenRock ? 1 : 0)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMegaOpen(false)
    setProgramsOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) setProgramsOpen(false)
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140)
  }

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' && !location.hash : location.pathname === to

  return (
    <>
      <header className={`header ${solid ? 'header--solid' : ''}`}>
        <div className="belt-bar header__accent" aria-hidden="true">
          <span style={{ background: '#f4f4f4' }} />
          <span style={{ background: 'var(--gold)' }} />
          <span style={{ background: 'var(--red)' }} />
          <span style={{ background: '#0a0a0a' }} />
        </div>
        <div className="container header__bar">
          <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
            <img src="/logo.svg" alt="" className="brand__logo" />
            <span className="brand__text">
              <span className="brand__name">United Black Belt</span>
              <span className="brand__sub">Academy</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {TOP_NAV.slice(0, 2).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav__link ${isActive(item.to) ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}

            <div
              className={`nav__item ${megaOpen ? 'is-open' : ''}`}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={`nav__link ${location.pathname.startsWith('/programs') ? 'is-active' : ''}`}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Programs <span className="nav__caret">▼</span>
              </button>
              {megaOpen && (
                <div className="mega" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                  {MEGA_MENU.map((group) => (
                    <div key={group.heading}>
                      <div className="mega__heading">{group.heading}</div>
                      {group.links.map((link) => (
                        <Link key={link.label} to={link.to} className="mega__link">
                          <span>{link.label}</span>
                          {link.meta && <span className="mega__meta">{link.meta}</span>}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {TOP_NAV.slice(2).map((item) => (
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
              <span aria-hidden="true">📍</span>
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
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/*
        Keep the mobile drawer outside <header>. The solid header uses
        backdrop-filter, which makes position:fixed descendants size to the
        header box (~78px) and the menu appears empty after scroll.
      */}
      <div
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}
        id="mobile-nav"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav__scroll">
          <nav className="mobile-nav__links" aria-label="Mobile">
            <Link to="/">Home</Link>
            <Link to="/#owner">About</Link>

            <div className={`mobile-nav__accordion ${programsOpen ? 'is-open' : ''}`}>
              <button
                type="button"
                className="mobile-nav__accordion-trigger"
                aria-expanded={programsOpen}
                aria-controls="mobile-programs"
                onClick={() => setProgramsOpen((v) => !v)}
              >
                <span>Programs</span>
                <span className="nav__caret" aria-hidden="true">
                  ▼
                </span>
              </button>
              <div
                id="mobile-programs"
                className="mobile-nav__accordion-panel"
                hidden={!programsOpen}
              >
                {MEGA_MENU.map((group) => (
                  <div key={group.heading} className="mobile-nav__group">
                    <div className="mn-group">{group.heading}</div>
                    {group.links.map((link) => (
                      <Link key={link.label} to={link.to} className="mn-sub">
                        <span className="mn-sub__label">{link.label}</span>
                        {link.meta ? (
                          <span className="mn-sub__meta">{link.meta}</span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/just-4-kids">Just 4 Kids</Link>
            <Link to="/#reviews">Reviews</Link>
            <Link to="/#locations">Locations</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
        <div className="mobile-nav__cta">
          <Link to="/contact" className="btn btn--gold btn--block mobile-nav__cta-btn">
            {SITE.primaryCta}
          </Link>
        </div>
      </div>
    </>
  )
}
