import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import ProgramCard from '../../components/ProgramCard'
import { HOME_AUDIENCE_FEATURES } from '../../data/site'

export default function AudienceSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="You Belong Here"
            title={<>Martial arts for every age &amp; ability</>}
            lead="Whether you want an exciting activity for your child or a motivating alternative to the gym, there's a place for you on our mat. No experience required — just show up ready to grow."
          />
        </Reveal>
        <div className="grid grid--3 mt">
          {HOME_AUDIENCE_FEATURES.map((f, i) => (
            <Reveal as="article" key={f.title} delay={i * 80}>
              <ProgramCard
                wrapLink
                title={f.title}
                text={f.text}
                to={f.to}
                glyph={f.icon}
                ctaLabel={f.cta}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
