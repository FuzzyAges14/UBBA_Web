import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { SITE } from '../data/site'

type Crumb = { label: string; to?: string }

export type PageHeroFamily = 'program' | 'location' | 'contact' | 'legal' | 'default'

export default function PageHero({
  title,
  intro,
  crumbs = [],
  center = false,
  variant = 'default',
  family = 'default',
  showBrand = true,
  children,
}: {
  title: ReactNode
  intro?: ReactNode
  crumbs?: Crumb[]
  center?: boolean
  /** Playful Just 4 Kids hero — light gradient matching the hub */
  variant?: 'default' | 'playful'
  /** Visual family accent for interior page systems */
  family?: PageHeroFamily
  /** Brand wordmark above the H1 (skip for legal or when title already carries brand) */
  showBrand?: boolean
  children?: ReactNode
}) {
  const playful = variant === 'playful'
  const familyClass =
    !playful && family !== 'default' ? ` page-hero--${family}` : ''

  return (
    <section
      className={`${playful ? 'j4k-hero' : 'page-hero'}${familyClass}${
        center ? ' text-center' : ''
      }`.trim()}
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
        {showBrand && (
          <p className={playful ? 'j4k-hero__brand' : 'page-hero__brand'}>{SITE.shortName}</p>
        )}
        <div
          className={playful ? 'j4k-hero__accent' : 'page-hero__accent'}
          aria-hidden="true"
        >
          <span
            className={
              playful
                ? 'j4k-hero__accent-bar j4k-hero__accent-bar--red'
                : 'page-hero__accent-bar page-hero__accent-bar--red'
            }
          />
          <span className={playful ? 'j4k-hero__accent-dot' : 'page-hero__accent-dot'} />
          <span
            className={
              playful
                ? 'j4k-hero__accent-bar j4k-hero__accent-bar--blue'
                : 'page-hero__accent-bar page-hero__accent-bar--blue'
            }
          />
        </div>
        <h1>{title}</h1>
        {intro && (
          <p className={`${playful ? 'j4k-hero__lead' : ''} ${center ? 'center-block' : ''}`.trim()}>
            {intro}
          </p>
        )}
        {children &&
          (playful ? children : <div className="page-hero__actions">{children}</div>)}
      </div>
    </section>
  )
}
