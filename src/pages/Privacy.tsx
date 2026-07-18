import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function Privacy() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
        title="Privacy Policy"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="stack-gap">
            <p className="ph-note">Placeholder policy — replace with finalized copy before launch.</p>
            <h2 className="card__title">Information We Collect</h2>
            <p className="card__text">
              When you submit a form on our site, we collect the details you provide
              (such as your name, email, phone number, and program interest) so we
              can respond to your request.
            </p>
            <h2 className="card__title">How We Use Your Information</h2>
            <p className="card__text">
              We use your information solely to contact you about classes, offers,
              and events at United Black Belt Academy. We never sell your data.
            </p>
            <h2 className="card__title">Contact</h2>
            <p className="card__text">
              Questions about this policy? Visit our{' '}
              <Link to="/contact" style={{ color: 'var(--red-dark)', fontWeight: 600 }}>
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
