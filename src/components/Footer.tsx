import { Link } from 'react-router-dom'
import { CONTACT, SOCIAL_PROFILES } from '../data/contact'
import { FOOTER_LINKS, LOCATIONS, SITE } from '../data/site'
import Taegeuk from './Taegeuk'

export default function Footer() {
  const year = new Date().getFullYear()
  const half = Math.ceil(FOOTER_LINKS.length / 2)
  const col1 = FOOTER_LINKS.slice(0, half)
  const col2 = FOOTER_LINKS.slice(half)

  return (
    <footer className="footer">
      <div className="dojang dojang--fade" aria-hidden="true" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-60px',
          top: '-40px',
          opacity: 0.12,
          color: '#fff',
        }}
      >
        <Taegeuk size={260} />
      </div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
              <img
                src="/logo.png"
                alt=""
                className="brand__logo"
                width={52}
                height={49}
              />
              <span className="brand__text">
                <span className="brand__name">United Black Belt</span>
                <span className="brand__sub">Academy</span>
              </span>
            </Link>
            <p>
              Confidence-building Taekwondo for kids, teens, and adults across
              Bergen County, NJ. Discipline, respect, and real growth on every mat.
            </p>
            {CONTACT.publicEmail && (
              <p style={{ marginTop: '0.75rem' }}>
                <a href={`mailto:${CONTACT.publicEmail}`}>{CONTACT.publicEmail}</a>
              </p>
            )}
            <div className="footer__social" aria-label="Social media">
              {SOCIAL_PROFILES.map((profile) =>
                profile.href && profile.href !== '#' ? (
                  <a
                    key={profile.slug}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {profile.label}
                  </a>
                ) : (
                  <Link key={profile.slug} to={`/follow-us/${profile.slug}`}>
                    {profile.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer__links">
              {col1.map((item) => (
                <Link key={item.label} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>More</h4>
            <div className="footer__links">
              {col2.map((item) => (
                <Link key={item.label} to={item.to}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>Our Schools</h4>
            <div className="footer__contact">
              {LOCATIONS.map((loc) => (
                <div key={loc.id} style={{ marginBottom: '0.9rem' }}>
                  <strong style={{ color: '#fff' }}>{loc.name}</strong>
                  <br />
                  {loc.address}, {loc.city}
                  {loc.phone && (
                    <>
                      <br />
                      <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}>
                        {loc.phone}
                      </a>
                    </>
                  )}
                </div>
              ))}
              <Link to="/contact" className="btn btn--gold mt-sm">
                {SITE.primaryCta}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <span>
            <Link to="/privacy">Privacy Policy</Link>
            {'   ·   '}
            <Link to="/terms">Terms and Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
