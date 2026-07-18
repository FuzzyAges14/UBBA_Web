import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionSeam from '../components/SectionSeam'

export default function Privacy() {
  return (
    <>
      <PageHero
        family="legal"
        showBrand={false}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
        title="Privacy Policy"
      />
      <SectionSeam from="dark" to="off-white" variant="fade" />
      <section className="section">
        <div className="container legal-prose">
          <div className="stack-gap">
            <p className="ph-note">Placeholder policy — replace with finalized copy before launch.</p>
            <h2>Information We Collect</h2>
            <p>
              When you submit a form on our site, we collect the details you provide
              (such as your name, email, phone number, and program interest) so we
              can respond to your request.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              We use your information solely to contact you about classes, offers,
              and events at United Black Belt Academy. We never sell your data.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about this policy? Visit our{' '}
              <Link to="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
