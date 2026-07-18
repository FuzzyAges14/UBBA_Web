import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import LeadForm from '../components/LeadForm'
import PageHero from '../components/PageHero'
import SectionSeam from '../components/SectionSeam'
import { LOCATIONS, GLEN_ROCK, SITE } from '../data/site'
import type { Location } from '../data/site'

function mapSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`
}
function directionsHref(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
}

function LocationBlock({ loc }: { loc: Location }) {
  return (
    <div className="split" style={{ alignItems: 'stretch' }}>
      <div className="loc-card">
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
        <h2 className="section-title contact-loc__title">
          {loc.name}
          {loc.isNew && <span className="loc-badge">New</span>}
        </h2>
        <p className="section-lead contact-loc__address">
          {loc.address}
          <br />
          {loc.city}
        </p>
        {loc.note && (
          <p className="ph-note" style={{ marginTop: '0.4rem' }}>
            {loc.note}
          </p>
        )}
        {loc.phone ? (
          <p className="contact-loc__phone">
            <strong>Phone: </strong>
            <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`}>{loc.phone}</a>
          </p>
        ) : (
          <p className="ph-note" style={{ marginTop: '0.5rem' }}>
            Phone &amp; hours — pending owner confirmation.
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
        <div className="flex-actions mt">
          <a href={directionsHref(loc.mapQuery)} target="_blank" rel="noreferrer" className="btn btn--outline">
            Get Directions
          </a>
          {loc.phone && (
            <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} className="btn btn--dark">
              Call {loc.name}
            </a>
          )}
          {loc.page && (
            <Link to={`/locations/${loc.id}`} className="btn btn--outline">
              {loc.name} school page
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const locations = SITE.showGlenRock ? [...LOCATIONS, GLEN_ROCK] : LOCATIONS

  return (
    <>
      <PageHero
        family="contact"
        center
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        title="Try A Class For Free!"
        intro="Ready to start Taekwondo or martial arts in Allendale or Midland Park? Tell us about your family and we’ll help you pick a program — then schedule your complimentary introductory class."
      />

      <SectionSeam from="dark" to="off-white" variant="fade" />

      <section className="section">
        <div className="container stack-gap contact-locations">
          {locations.map((loc) => (
            <Reveal key={loc.id}>
              <LocationBlock loc={loc} />
            </Reveal>
          ))}
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" variant="angle" />

      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split contact-form-panel interior-split">
          <Reveal>
            <span className="eyebrow">Send A Message</span>
            <h2 className="section-title">Let's get you on the mat</h2>
            <p className="section-lead">
              Fill out the form and we'll be in touch to schedule your free class.
              Prefer to talk? Call our Allendale school at{' '}
              <a href="tel:2019622922">201-962-2922</a>.
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
