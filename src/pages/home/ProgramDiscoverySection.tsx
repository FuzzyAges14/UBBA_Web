import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import ProgramCard from '../../components/ProgramCard'
import { HOME_PROGRAM_CARDS, PROGRAM_GLYPHS } from '../../data/site'

export default function ProgramDiscoverySection() {
  return (
    <section className="section" id="programs">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Find Your Path"
            title={<>Programs for every age &amp; stage</>}
            lead="Age-specific training that meets each student exactly where they are — hover a program to see how it works."
          />
        </Reveal>
        <div className="rail mt">
          {HOME_PROGRAM_CARDS.map((p, i) => (
            <Reveal as="article" key={p.id} delay={i * 80}>
              <ProgramCard
                title={p.title}
                text={p.blurb}
                ages={p.ages}
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
