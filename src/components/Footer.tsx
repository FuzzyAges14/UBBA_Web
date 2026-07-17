import { Link } from 'react-router-dom'
import { FOOTER_LINKS, LOCATIONS, SITE } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="brand" aria-label={`${SITE.name} home`}>
              <img src="/logo.svg" alt="" className="brand__logo" />
              <span className="brand__text">
                <span className="brand__name">United Black Belt</span>
                <span className="brand__sub">Academy</span>
              </span>
            </Link>
            <p>
              Confidence-building martial arts for kids, teens, and adults across
              Bergen County, NJ. Discipline, respect, and fun on every mat.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer__links">
              {FOOTER_LINKS.map((item) => (
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
                <div key={loc.id} style={{ marginBottom: '0.8rem' }}>
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
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <span>
            <Link to="/privacy">Privacy Policy</Link>
            {'  ·  '}
            <Link to="/terms">Terms and Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
