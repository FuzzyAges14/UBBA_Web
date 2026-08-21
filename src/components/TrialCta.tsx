import type { MouseEvent, ReactNode } from 'react'
import {
  getNextKickFormHref,
  type NextKickFormKind,
} from '../data/contact'
import { SITE } from '../data/site'
import { useTrialPortal } from '../context/TrialPortalContext'

function openNextKickFormInNewTab(kind: NextKickFormKind) {
  window.open(
    getNextKickFormHref(kind, 'allendale'),
    '_blank',
    'noopener,noreferrer',
  )
}

type TrialCtaProps = {
  className?: string
  children?: ReactNode
  /** Which NextKick form flow to open (default: free-class trial). */
  kind?: NextKickFormKind
  /** Run before the portal opens (e.g. close the mobile nav). */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  arrow?: boolean
}

/**
 * Opens a NextKick form portal (location picker → per-school iframe).
 * Falls back to a new tab when rendered outside `TrialPortalProvider`.
 */
export default function TrialCta({
  className,
  children,
  kind = 'trial',
  onClick,
  arrow = false,
}: TrialCtaProps) {
  const portal = useTrialPortal()

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-expanded={portal?.isOpen && portal.kind === kind ? true : undefined}
      onClick={(event) => {
        onClick?.(event)
        if (portal) portal.open(kind)
        else openNextKickFormInNewTab(kind)
      }}
    >
      {children ?? (
        <>
          {SITE.primaryCta}
          {arrow ? (
            <>
              {' '}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </>
          ) : null}
        </>
      )}
    </button>
  )
}
