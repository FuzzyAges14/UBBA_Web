import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <PageHero center crumbs={[{ label: 'Error 404' }]} title="Page Not Found">
      <p className="center-block">
        The page you're looking for has moved or no longer exists.
      </p>
      <div className="flex-actions mt" style={{ justifyContent: 'center' }}>
        <Link to="/" className="btn btn--blue btn--lg">
          Back To Home
        </Link>
      </div>
    </PageHero>
  )
}
