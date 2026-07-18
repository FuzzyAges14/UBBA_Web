import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Crumb = { label: string; to?: string }

export default function PageHero({
  title,
  intro,
  crumbs = [],
  center = false,
  variant = 'default',
  children,
}: {
  title: ReactNode
  intro?: ReactNode
  crumbs?: Crumb[]
  center?: boolean
  /** Playful Just 4 Kids hero — light gradient matching the hub */
  variant?: 'default' | 'playful'
  children?: ReactNode
}) {
  const playful = variant === 'playful'

  return (
    <section
      className={`${playful ? 'j4k-hero' : 'page-hero'} ${center ? 'text-center' : ''}`.trim()}
    >
      {playful ? (
        <>
          <div className="j4k-hero__bg" aria-hidden="true" />
          <div className="j4k-confetti j4k-confetti--hero" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="page-hero__bg" aria-hidden="true" />
          <div className="dojang dojang--fade" aria-hidden="true" />
        </>
      )}
      <div className={`container ${playful ? 'j4k-hero__inner' : 'page-hero__inner'}`}>
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
        {intro && (
          <p className={`${playful ? 'j4k-hero__lead' : ''} ${center ? 'center-block' : ''}`.trim()}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
