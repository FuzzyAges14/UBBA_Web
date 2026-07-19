import Reveal from '../../components/Reveal'
import LocationCard from '../../components/LocationCard'
import SectionHeading from '../../components/SectionHeading'
import { formatVisibleLocationList, getVisibleLocations } from '../../data/site'

export default function LocationsSection() {
  const locations = getVisibleLocations()
  const locationList = formatVisibleLocationList({ style: 'ampersand' })

  return (
    <section className="section home-locations" id="locations">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Schools"
            title={`Train in ${locationList}`}
            lead={`${locations.length} Bergen County schools — pick the campus that fits your commute, then request a free class at the location you prefer.`}
          />
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
