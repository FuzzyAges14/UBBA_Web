import Reveal from '../../components/Reveal'
import Faq from '../../components/Faq'
import SectionHeading from '../../components/SectionHeading'
import { FAQS } from '../../data/site'

export default function FaqSection() {
  return (
    <section className="section section--offwhite">
      <div className="container" style={{ maxWidth: '820px' }}>
        <Reveal>
          <SectionHeading
            eyebrow="Good To Know"
            title={<>Questions parents &amp; new students ask</>}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="mt">
            <Faq items={FAQS} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
