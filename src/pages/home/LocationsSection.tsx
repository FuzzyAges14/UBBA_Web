import Reveal from '../../components/Reveal'
import LocationCard from '../../components/LocationCard'
import SectionHeading from '../../components/SectionHeading'
import { getVisibleLocations } from '../../data/site'

export default function LocationsSection() {
  const locations = getVisibleLocations()

  return (
    <section className="section" id="locations">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Our Schools"
            title="Visit a location near you"
            lead={`${locations.length} convenient Bergen County locations, with the same welcoming community at each.`}
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
