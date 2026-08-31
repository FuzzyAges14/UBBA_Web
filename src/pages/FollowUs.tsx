import Reveal from '../components/Reveal'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import ProgramCard from '../components/ProgramCard'
import { SOCIAL, type SocialSlug } from '../data/site'

const MARK: Record<SocialSlug, string> = {
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
          <div className="grid grid--2">
            {SOCIAL.map((network, i) => (
              <Reveal as="article" key={network.slug} delay={i * 90}>
                <ProgramCard
                  title={network.label}
                  text={network.blurb}
                  ages={network.handle}
                  glyph={MARK[network.slug]}
                  glyphClassName="social-card__mark"
                  to={`/follow-us/${network.slug}`}
                  ctaLabel="See Recent Posts"
                  titleAs="h2"
                />
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
