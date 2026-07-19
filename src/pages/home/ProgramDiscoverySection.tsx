import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import ProgramCard from '../../components/ProgramCard'
import {
  HOME_PROGRAM_CARDS,
  PROGRAM_GLYPHS,
  childrenFreeClassHref,
  formatVisibleLocationList,
} from '../../data/site'

export default function ProgramDiscoverySection() {
  const locationList = formatVisibleLocationList({ style: 'or' })

  return (
    <section className="section home-programs" id="programs">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Find Your Path"
            title={<>Programs for every age &amp; stage</>}
            lead={`From Tiny Tigers to adult martial arts, choose an age-specific path — then try a free class in ${locationList}.`}
          />
        </Reveal>

        <div className="rail mt">
          {HOME_PROGRAM_CARDS.map((p, i) => {
            const isChild =
              p.slug === 'tiny-tigers' ||
              p.slug === 'junior-tigers' ||
              p.slug === 'teen-martial-arts'
            return (
              <Reveal as="article" key={p.id} delay={i * 80}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  ages={p.ages}
                  image={p.image}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={
                    isChild
                      ? childrenFreeClassHref({ program: p.slug })
                      : `/programs/${p.slug}`
                  }
                  ctaLabel={isChild ? `Try ${p.title}` : 'View Adult Program'}
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
