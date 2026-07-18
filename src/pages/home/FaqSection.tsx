import Reveal from '../../components/Reveal'
import Faq from '../../components/Faq'
import SectionHeading from '../../components/SectionHeading'
import { FAQS } from '../../data/site'

export default function FaqSection() {
  return (
    <section className="section section--offwhite home-faq">
      <div className="container home-faq__inner">
        <Reveal>
          <SectionHeading
            eyebrow="Good To Know"
            title={<>Questions parents &amp; new students ask</>}
          />
          <div className="mt">
            <Faq items={FAQS} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
