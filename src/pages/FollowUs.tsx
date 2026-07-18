import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import { SOCIAL } from '../data/site'

const MARK: Record<string, string> = {
  instagram: 'IG',
  facebook: 'FB',
}

export default function FollowUs() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Follow Us' }]}
        title="Follow Us"
        intro="Stay connected with United Black Belt Academy. Choose Instagram or Facebook to see our latest posts."
      />

      <section className="section">
        <div className="container">
          <p className="ph-note" style={{ marginBottom: '1.4rem' }}>
            Profile links and posts are placeholders — swap in the academy&apos;s real
            Instagram and Facebook URLs in <code>SOCIAL</code> before launch.
          </p>
          <div className="grid grid--2">
            {SOCIAL.map((network, i) => (
              <Reveal as="article" key={network.slug} delay={i * 90}>
                <div className="pcard">
                  <div className="pcard__art" />
                  <div className="pcard__scrim" />
                  <span className="pcard__glyph social-card__mark" aria-hidden="true">
                    {MARK[network.slug]}
                  </span>
                  <div className="pcard__body">
                    <span className="pcard__age">{network.handle}</span>
                    <h3 className="pcard__title">{network.label}</h3>
                    <p className="pcard__text">{network.blurb}</p>
                    <Link to={`/follow-us/${network.slug}`} className="pcard__cta">
                      See Recent Posts <span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Train with us in person"
        text="Follow along online — then come try a free class on the mat."
      />
    </>
  )
}
