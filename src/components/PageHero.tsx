import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Crumb = { label: string; to?: string }

export default function PageHero({
  title,
  intro,
  crumbs = [],
  center = false,
  children,
}: {
  title: ReactNode
  intro?: ReactNode
  crumbs?: Crumb[]
  center?: boolean
  children?: ReactNode
}) {
  return (
    <section className={`page-hero ${center ? 'text-center' : ''}`}>
      <div className="page-hero__bg" aria-hidden="true" />
      <div className="dojang dojang--fade" aria-hidden="true" />
      <div className="container page-hero__inner">
        {crumbs.length > 0 && (
          <div className="breadcrumbs">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
                {i < crumbs.length - 1 ? ' / ' : ''}
              </span>
            ))}
          </div>
        )}
        <h1>{title}</h1>
        {intro && <p className={center ? 'center-block' : ''}>{intro}</p>}
        {children}
      </div>
    </section>
  )
}
