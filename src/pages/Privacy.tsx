import { Link } from 'react-router-dom'

export default function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / Privacy Policy
          </div>
          <h1>Privacy Policy</h1>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div className="stack-gap">
            <p className="section-lead">
              This is a placeholder privacy policy for United Black Belt Academy.
              Replace this copy with your finalized policy before launch.
            </p>
            <h3 className="card__title">Information We Collect</h3>
            <p className="card__text">
              When you submit a form on our site, we collect the details you
              provide (such as your name, email, phone number, and program
              interest) so we can respond to your request.
            </p>
            <h3 className="card__title">How We Use Your Information</h3>
            <p className="card__text">
              We use your information solely to contact you about classes, offers,
              and events at United Black Belt Academy. We never sell your data.
            </p>
            <h3 className="card__title">Contact</h3>
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
