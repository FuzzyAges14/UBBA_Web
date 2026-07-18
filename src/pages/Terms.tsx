import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function Terms() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Terms and Conditions' }]}
        title="Terms and Conditions"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="stack-gap">
            <p className="ph-note">Placeholder terms — replace with finalized copy before launch.</p>
            <h2 className="card__title">Use Of This Site</h2>
            <p className="card__text">
              By using this website you agree to use it for lawful purposes only and
              in a way that does not infringe the rights of others.
            </p>
            <h2 className="card__title">Class Participation</h2>
            <p className="card__text">
              Participation in classes, events, and programs may require signed
              waivers and adherence to academy policies provided at registration.
            </p>
            <h2 className="card__title">Contact</h2>
            <p className="card__text">
              Questions about these terms? Visit our{' '}
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
