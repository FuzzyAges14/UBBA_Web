import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE, LOCATIONS, MEGA_MENU, SOCIAL } from '../data/site'

const TOP_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#owner' },
  { label: 'Reviews', to: '/#reviews' },
  { label: 'Locations', to: '/#locations' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [socialOpen, setSocialOpen] = useState(false)
  const location = useLocation()
  const megaCloseTimer = useRef<number | undefined>(undefined)
  const socialCloseTimer = useRef<number | undefined>(undefined)

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
    setSocialOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const openMega = () => {
    window.clearTimeout(megaCloseTimer.current)
    setSocialOpen(false)
    setMegaOpen(true)
  }
  const scheduleMegaClose = () => {
    megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), 140)
  }

  const openSocial = () => {
    window.clearTimeout(socialCloseTimer.current)
    setMegaOpen(false)
    setSocialOpen(true)
  }
  const scheduleSocialClose = () => {
    socialCloseTimer.current = window.setTimeout(() => setSocialOpen(false), 140)
  }

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' && !location.hash : location.pathname === to

  return (
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
            onMouseLeave={scheduleMegaClose}
          >
            <button
              type="button"
              className={`nav__link ${location.pathname.startsWith('/programs') || location.pathname === '/just-4-kids' ? 'is-active' : ''}`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              onClick={() => {
                setSocialOpen(false)
                setMegaOpen((v) => !v)
              }}
            >
              Programs <span className="nav__caret">▼</span>
            </button>
            {megaOpen && (
              <div className="mega" onMouseEnter={openMega} onMouseLeave={scheduleMegaClose}>
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

          <div
            className={`nav__item ${socialOpen ? 'is-open' : ''}`}
            onMouseEnter={openSocial}
            onMouseLeave={scheduleSocialClose}
          >
            <button
              type="button"
              className="nav__link"
              aria-expanded={socialOpen}
              aria-haspopup="true"
              onClick={() => {
                setMegaOpen(false)
                setSocialOpen((v) => !v)
              }}
            >
              Follow Us <span className="nav__caret">▼</span>
            </button>
            {socialOpen && (
              <div
                className="mega mega--social"
                onMouseEnter={openSocial}
                onMouseLeave={scheduleSocialClose}
              >
                {SOCIAL.map((network) => (
                  <div key={network.label} className="social-panel__col">
                    <div className="mega__heading">{network.label}</div>
                    <a
                      href={network.href}
                      className="social-panel__profile"
                      title={
                        network.placeholder
                          ? `${network.label} profile (link pending)`
                          : `${network.label} profile`
                      }
                    >
                      <span className="social-panel__mark" aria-hidden="true">
                        {network.label === 'Instagram' ? 'IG' : 'FB'}
                      </span>
                      <span>
                        <strong>{network.handle}</strong>
                        <span className="social-panel__hint">
                          {network.placeholder ? 'Profile link pending' : 'Visit profile'}
                        </span>
                      </span>
                    </a>
                    <ul className="social-panel__posts">
                      {network.recentPosts.map((post) => (
                        <li key={post.id}>
                          <a
                            href={post.href}
                            className="social-panel__post"
                            title={
                              post.placeholder
                                ? `${network.label} post (placeholder)`
                                : post.caption
                            }
                          >
                            <span className="social-panel__thumb" aria-hidden="true" />
                            <span className="social-panel__post-body">
                              <span className="social-panel__caption">{post.caption}</span>
                              <span className="social-panel__meta">
                                {post.placeholder ? 'Placeholder · ' : ''}
                                {post.dateLabel}
                              </span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
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

      {/* Mobile menu */}
      <div className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/#owner">About</Link>
        {MEGA_MENU.map((group) => (
          <div key={group.heading}>
            <div className="mn-group">{group.heading}</div>
            {group.links.map((link) => (
              <Link key={link.label} to={link.to} className="mn-sub">
                {link.label}
                {link.meta ? ` · ${link.meta}` : ''}
              </Link>
            ))}
          </div>
        ))}
        <div>
          <div className="mn-group">Follow Us</div>
          {SOCIAL.map((network) => (
            <div key={network.label} className="mn-social">
              <a
                href={network.href}
                className="mn-sub"
                title={
                  network.placeholder
                    ? `${network.label} profile (link pending)`
                    : `${network.label} profile`
                }
              >
                {network.label}
                {network.placeholder ? ' · link pending' : ''}
              </a>
              {network.recentPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.href}
                  className="mn-sub mn-sub--post"
                  title={post.placeholder ? `${network.label} post (placeholder)` : post.caption}
                >
                  {post.caption}
                  {post.placeholder ? ' · placeholder' : ''}
                </a>
              ))}
            </div>
          ))}
        </div>
        <Link to="/#reviews">Reviews</Link>
        <Link to="/#locations">Locations</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/contact" className="btn btn--gold btn--block">
          {SITE.primaryCta}
        </Link>
      </div>
    </header>
  )
}
