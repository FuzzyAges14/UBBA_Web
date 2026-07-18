import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionSeam from '../components/SectionSeam'

export default function Terms() {
  return (
    <>
      <PageHero
        family="legal"
        showBrand={false}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Terms and Conditions' }]}
        title="Terms and Conditions"
      />
      <SectionSeam from="dark" to="off-white" />
      <section className="section">
        <div className="container legal-prose">
          <div className="stack-gap">
            <p className="ph-note">Placeholder terms — replace with finalized copy before launch.</p>
            <h2>Use Of This Site</h2>
            <p>
              By using this website you agree to use it for lawful purposes only and
              in a way that does not infringe the rights of others.
            </p>
            <h2>Class Participation</h2>
            <p>
              Participation in classes, events, and programs may require signed
              waivers and adherence to academy policies provided at registration.
            </p>
            <h2>Contact</h2>
            <p>
              Questions about these terms? Visit our{' '}
              <Link to="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
