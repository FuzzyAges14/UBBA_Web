import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import { LOCATIONS, GLEN_ROCK, SITE } from '../data/site'
import type { Location } from '../data/site'

function mapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}

function LocationBlock({ loc }: { loc: Location }) {
  return (
    <div className="split" style={{ alignItems: 'stretch' }}>
      <div className="loc-card" style={{ boxShadow: 'none' }}>
        <div className="map-embed">
          <iframe
            title={`Map of ${loc.name}`}
            src={mapSrc(loc.mapQuery)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div>
        <h3 className="section-title" style={{ fontSize: '1.8rem' }}>
          {loc.name}
        </h3>
        <p className="section-lead" style={{ marginTop: '0.6rem' }}>
          {loc.address}
          <br />
          {loc.city}
        </p>
        {loc.phone && (
          <p style={{ marginTop: '0.5rem' }}>
            <strong>Phone: </strong>
            <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} style={{ color: 'var(--red-dark)', fontWeight: 600 }}>
              {loc.phone}
            </a>
          </p>
        )}
        {loc.hours && (
          <table className="hours mt-sm">
            <tbody>
              {loc.hours.map((h) => (
                <tr key={h.day}>
                  <td>{h.day}</td>
                  <td>{h.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const locations = SITE.showGlenRock ? [...LOCATIONS, GLEN_ROCK] : LOCATIONS

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Contact
          </div>
          <h1>Try A Class For Free!</h1>
          <p>
            Ready to get started or have a question? Reach out and our team will
            help you find the perfect program at the location nearest you.
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="section">
        <div className="container stack-gap" style={{ gap: '3rem' }}>
          {locations.map((loc) => (
            <Reveal key={loc.id}>
              <LocationBlock loc={loc} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="section section--dark">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Send A Message</span>
            <h2 className="section-title">Let's Get You On The Mat</h2>
            <p className="section-lead">
              Fill out the form and we'll be in touch to schedule your free class.
              Prefer to talk? Give our Allendale school a call at{' '}
              <a href="tel:2019622922" style={{ color: 'var(--gold)', fontWeight: 600 }}>
                201-962-2922
              </a>
              .
            </p>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
