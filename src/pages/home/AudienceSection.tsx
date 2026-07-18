import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import OptimizedImage from '../../components/OptimizedImage'
import SectionHeading from '../../components/SectionHeading'
import { HOME_AUDIENCE_FEATURES, IMAGE_DIMENSIONS, IMAGES } from '../../data/site'

const AUDIENCE_MEDIA = [
  { image: IMAGES.kidsGroup, dims: IMAGE_DIMENSIONS.kidsGroup },
  { image: IMAGES.action, dims: IMAGE_DIMENSIONS.action },
] as const

export default function AudienceSection() {
  const [kids, adults, events] = HOME_AUDIENCE_FEATURES

  return (
    <section className="section home-audience">
      <div className="container">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              06
            </span>
            <SectionHeading
              eyebrow="You Belong Here"
              title={<>Martial arts for every age &amp; ability</>}
              lead="Whether you want an exciting activity for your child or a motivating alternative to the gym, there's a place for you on our mat. No experience required — just show up ready to grow."
            />
          </div>
        </Reveal>

        <div className="home-audience__split mt">
          {[kids, adults].map((f, i) => (
            <Reveal as="article" key={f.title} delay={i * 90}>
              <Link to={f.to} className="feature home-feature">
                <div className="feature__bg" aria-hidden="true" />
                <OptimizedImage
                  className="feature__img"
                  src={AUDIENCE_MEDIA[i].image}
                  alt=""
                  {...AUDIENCE_MEDIA[i].dims}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
                <div className="feature__body">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <span className="home-feature__cta">
                    {f.cta} <span className="btn__arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="home-audience__aside mt">
            Looking for birthday parties, summer camp, or Parents&apos; Night Out?{' '}
            <Link to={events.to} className="text-link">
              {events.cta}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
