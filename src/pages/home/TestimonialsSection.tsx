import Reveal from '../../components/Reveal'
import { TESTIMONIALS } from '../../data/site'

export default function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS

  return (
    <section className="section section--dark" id="reviews">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Reviews</span>
          <p className="feature-quote">"{featured.quote}"</p>
          <p className="quote__by mt">
            {featured.name}{' '}
            <span className="quote__role">— {featured.role}</span>
          </p>
          <p className="ph-note mt-sm">
            Placeholder reviews · pending owner-approved testimonials
          </p>
        </Reveal>
        <div className="grid grid--2 mt-lg">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="quote" style={{ margin: 0 }}>
                <div className="quote__stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="quote__text" style={{ margin: 0 }}>
                  "{t.quote}"
                </blockquote>
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
