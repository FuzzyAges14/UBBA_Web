import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}>
      <div className="container text-center">
        <div className="breadcrumbs">Error 404</div>
        <h1>Page Not Found</h1>
        <p>The page you're looking for has moved or no longer exists.</p>
        <Link to="/" className="btn btn--gold btn--lg mt">
          Back To Home
        </Link>
      </div>
    </section>
  )
}
