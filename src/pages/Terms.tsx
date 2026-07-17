import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Terms and Conditions
          </div>
          <h1>Terms and Conditions</h1>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="stack-gap">
            <p className="section-lead">
              This is a placeholder terms and conditions page for United Black Belt
              Academy. Replace this copy with your finalized terms before launch.
            </p>
            <h3 className="card__title">Use Of This Site</h3>
            <p className="card__text">
              By using this website you agree to use it for lawful purposes only
              and in a way that does not infringe the rights of others.
            </p>
            <h3 className="card__title">Class Participation</h3>
            <p className="card__text">
              Participation in classes, events, and programs may require signed
              waivers and adherence to academy policies provided at registration.
            </p>
            <h3 className="card__title">Contact</h3>
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
