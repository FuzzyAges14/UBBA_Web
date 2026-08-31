import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Placeholder from '../components/Placeholder'
import Reveal from '../components/Reveal'
import CtaBanner from '../components/CtaBanner'
import NotFound from './NotFound'
import { getSocial, SITE } from '../data/site'

export default function SocialFeed() {
  const { network: networkSlug } = useParams()
  const network = getSocial(networkSlug)

  if (!network) return <NotFound />

  const mark = network.slug === 'instagram' ? 'IG' : 'FB'

  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Follow Us', to: '/follow-us' },
          { label: network.label },
        ]}
        title={network.label}
        intro={`${network.handle} — recent posts from United Black Belt Academy.`}
      />

      <section className="section">
        <div className="container split">
          <Reveal>
            <Placeholder label={`${network.label} profile`} icon="🥋" variant="tall" />
          </Reveal>
          <Reveal delay={100}>
            <span className="card__ages">{network.handle}</span>
            <h2 className="section-title" style={{ marginTop: '0.6rem' }}>
              Profile overview
            </h2>
            <p className="section-lead">{network.blurb}</p>
            <div className="mt" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a
                href={network.href}
                className="btn btn--blue"
                title={`Open ${network.label}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {network.label} Profile <span className="btn__arrow">→</span>
              </a>
              <Link to="/follow-us" className="btn btn--outline">
                Back to Follow Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">Latest Posts</span>
            <h2 className="section-title">Most recent on {network.label}</h2>
            <p className="section-lead">
              Tap a post to open it on {network.label} — class updates, camp highlights, and
              promotions from our Bergen County schools.
            </p>
          </Reveal>

          <ul className="social-feed">
            {network.recentPosts.map((post, i) => (
              <Reveal as="li" key={post.id} delay={i * 70}>
                {post.placeholder || post.href === '#' ? (
                  <div className="social-feed__post social-feed__post--pending" aria-disabled="true">
                    <span className="social-feed__thumb" aria-hidden="true">
                      <span className="social-feed__mark">{mark}</span>
                    </span>
                    <span className="social-feed__body">
                      <span className="social-feed__caption">{post.caption}</span>
                      <span className="social-feed__meta">
                        Placeholder · {post.dateLabel}
                      </span>
                      <span className="social-feed__link">
                        Link pending <span aria-hidden="true">→</span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <a
                    href={post.href}
                    className="social-feed__post"
                    title={post.caption}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-feed__thumb" aria-hidden="true">
                      <span className="social-feed__mark">{mark}</span>
                    </span>
                    <span className="social-feed__body">
                      <span className="social-feed__caption">{post.caption}</span>
                      <span className="social-feed__meta">{post.dateLabel}</span>
                      <span className="social-feed__link">
                        Open post <span aria-hidden="true">→</span>
                      </span>
                    </span>
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        title="See it live on the mat"
        text={`Follow us on ${network.label}, then book a free class at ${SITE.shortName}.`}
      />
    </>
  )
}
