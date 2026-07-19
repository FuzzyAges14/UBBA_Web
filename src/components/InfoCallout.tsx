import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type InfoCalloutProps = {
  eyebrow?: string
  title: string
  titleId?: string
  children: ReactNode
  ctaTo?: string
  ctaLabel?: string
  /** Optional landmark label for screen readers. */
  ariaLabel?: string
}

/**
 * Compact informational callout for service notes that should not use
 * warning/alert styling (e.g. individualized instruction options).
 */
export default function InfoCallout({
  eyebrow = 'Helpful to know',
  title,
  titleId,
  children,
  ctaTo,
  ctaLabel,
  ariaLabel,
}: InfoCalloutProps) {
  return (
    <aside className="info-callout" aria-label={ariaLabel ?? title}>
      <div className="info-callout__accent" aria-hidden="true" />
      <div className="info-callout__body">
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={titleId} className="info-callout__title">
          {title}
        </h2>
        <div className="info-callout__text">{children}</div>
        {ctaTo && ctaLabel ? (
          <Link to={ctaTo} className="btn btn--outline mt">
            {ctaLabel} <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </aside>
  )
}
