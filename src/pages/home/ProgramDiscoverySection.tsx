import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import ProgramCard from '../../components/ProgramCard'
import { HOME_PROGRAM_CARDS, PROGRAM_GLYPHS } from '../../data/site'

export default function ProgramDiscoverySection() {
  return (
    <section className="section home-programs" id="programs">
      <div className="container">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              01
            </span>
            <div className="home-section-head__body">
              <SectionHeading
                eyebrow="Find Your Path"
                title={<>Programs for every age &amp; stage</>}
                lead="From Tiny Tigers to adult martial arts, choose an age-specific path — then try a free class in Allendale or Midland Park."
              />
            </div>
          </div>
        </Reveal>

        <div className="rail mt">
          {HOME_PROGRAM_CARDS.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 80}>
              <ProgramCard
                title={p.title}
                text={p.blurb}
                ages={p.ages}
                image={p.image}
                glyph={PROGRAM_GLYPHS[p.id]}
                to={`/programs/${p.slug}`}
                ctaLabel="Learn How It Works"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
