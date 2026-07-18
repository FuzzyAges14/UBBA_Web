import Reveal from '../../components/Reveal'
import { TESTIMONIALS } from '../../data/site'

export default function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS

  return (
    <section className="section section--dark home-reviews" id="reviews">
      <div className="container">
        <Reveal>
          <div className="home-section-head home-section-head--dark">
            <span className="home-section-num" aria-hidden="true">
              07
            </span>
            <div className="home-section-head__body">
              <span className="eyebrow">Reviews</span>
              <p className="feature-quote">"{featured.quote}"</p>
              <p className="quote__by mt">
                {featured.name}{' '}
                <span className="quote__role">— {featured.role}</span>
              </p>
              <p className="ph-note mt-sm">
                Placeholder reviews · pending owner-approved testimonials
              </p>
            </div>
          </div>
        </Reveal>

        <div className="home-reviews__list mt-lg">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="home-reviews__quote">
                <blockquote className="home-reviews__text">"{t.quote}"</blockquote>
                <figcaption>
                  <div className="quote__by">{t.name}</div>
                  <div className="quote__role">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
