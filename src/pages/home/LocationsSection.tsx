import Reveal from '../../components/Reveal'
import LocationCard from '../../components/LocationCard'
import SectionHeading from '../../components/SectionHeading'
import { getVisibleLocations } from '../../data/site'

export default function LocationsSection() {
  const locations = getVisibleLocations()

  return (
    <section className="section home-locations" id="locations">
      <div className="container">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              08
            </span>
            <div className="home-section-head__body">
              <SectionHeading
                eyebrow="Our Schools"
                title="Train in Allendale & Midland Park"
                lead={`${locations.length} Bergen County schools — pick the campus that fits your commute, then request a free class at the location you prefer.`}
              />
            </div>
          </div>
        </Reveal>

        <div className={`grid ${locations.length >= 3 ? 'grid--3' : 'grid--2'} mt`}>
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 90}>
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
