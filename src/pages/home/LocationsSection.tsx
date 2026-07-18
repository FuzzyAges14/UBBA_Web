import Reveal from '../../components/Reveal'
import LocationCard from '../../components/LocationCard'
import SectionHeading from '../../components/SectionHeading'
import { getVisibleLocations } from '../../data/site'

export default function LocationsSection() {
  const locations = getVisibleLocations()
  const [featured, ...rest] = locations

  return (
    <section className="section home-locations" id="locations">
      <div className="container">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              08
            </span>
            <SectionHeading
              eyebrow="Our Schools"
              title="Train in Allendale & Midland Park"
              lead={`${locations.length} Bergen County schools — pick the campus that fits your commute, then request a free class at the location you prefer.`}
            />
          </div>
        </Reveal>

        <div className="home-locations__layout mt">
          {featured && (
            <Reveal className="home-locations__featured">
              <LocationCard loc={featured} />
            </Reveal>
          )}
          {rest.length > 0 && (
            <div className="home-locations__stack">
              {rest.map((loc, i) => (
                <Reveal key={loc.id} delay={i * 80}>
                  <LocationCard loc={loc} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
