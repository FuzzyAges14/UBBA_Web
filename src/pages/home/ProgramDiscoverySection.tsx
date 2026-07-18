import { Link } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import SectionHeading from '../../components/SectionHeading'
import OptimizedImage from '../../components/OptimizedImage'
import { HOME_PROGRAM_CARDS, IMAGES, imageDimensionsFor } from '../../data/site'

function programImage(src: string | undefined): string {
  return src ?? IMAGES.kidsGroup
}

export default function ProgramDiscoverySection() {
  const [featured, ...rest] = HOME_PROGRAM_CARDS
  const featuredImage = programImage(featured.image)

  return (
    <section className="section home-programs" id="programs">
      <div className="container">
        <Reveal>
          <div className="home-section-head">
            <span className="home-section-num" aria-hidden="true">
              01
            </span>
            <SectionHeading
              eyebrow="Find Your Path"
              title={<>Programs for every age &amp; stage</>}
              lead="From Tiny Tigers to adult martial arts, choose an age-specific path — then try a free class in Allendale or Midland Park."
            />
          </div>
        </Reveal>

        <div className="home-programs__editorial mt">
          <Reveal as="article" className="home-programs__featured">
            <Link to={`/programs/${featured.slug}`} className="feature feature--tall home-feature">
              <div className="feature__bg" aria-hidden="true" />
              <OptimizedImage
                className="feature__img"
                src={featuredImage}
                alt=""
                {...imageDimensionsFor(featuredImage)}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 55vw"
              />
              <div className="feature__body">
                <span className="home-feature__age">{featured.ages}</span>
                <h3>{featured.title}</h3>
                <p>{featured.blurb}</p>
                <span className="home-feature__cta">
                  Learn How It Works <span className="btn__arrow" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
            <span className="photo__credit">Placeholder photo</span>
          </Reveal>

          <div className="home-programs__stack">
            {rest.map((p, i) => {
              const image = programImage(p.image)
              return (
                <Reveal as="article" key={p.id} delay={i * 70}>
                  <Link to={`/programs/${p.slug}`} className="home-program-row">
                    <div className="home-program-row__media">
                      <OptimizedImage
                        src={image}
                        alt=""
                        {...imageDimensionsFor(image)}
                        loading="lazy"
                        sizes="120px"
                      />
                    </div>
                    <div className="home-program-row__body">
                      <span className="home-program-row__age">{p.ages}</span>
                      <h3>{p.title}</h3>
                      <p>{p.blurb}</p>
                    </div>
                    <span className="home-program-row__arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
