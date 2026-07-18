import Reveal from '../../components/Reveal'
import Faq from '../../components/Faq'
import SectionHeading from '../../components/SectionHeading'
import { FAQS } from '../../data/site'

export default function FaqSection() {
  return (
    <section className="section section--offwhite home-faq">
      <div className="container home-faq__inner">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              07
            </span>
            <div className="home-section-head__body">
              <SectionHeading
                eyebrow="Good To Know"
                title={<>Questions parents &amp; new students ask</>}
              />
              <div className="mt">
                <Faq items={FAQS} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
