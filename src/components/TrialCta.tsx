import type { MouseEvent, ReactNode } from 'react'
import { NEXTKICK_TRIAL_FORM } from '../data/contact'
import { SITE } from '../data/site'
import { useTrialPortal } from '../context/TrialPortalContext'

function openTrialFormInNewTab() {
  window.open(NEXTKICK_TRIAL_FORM.href, '_blank', 'noopener,noreferrer')
}

type TrialCtaProps = {
  className?: string
  children?: ReactNode
  /** Run before the portal opens (e.g. close the mobile nav). */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  arrow?: boolean
}

/**
 * Opens the NextKick trial form in the site lightbox portal.
 * Falls back to a new tab when rendered outside `TrialPortalProvider`.
 */
export default function TrialCta({
  className,
  children,
  onClick,
  arrow = false,
}: TrialCtaProps) {
  const portal = useTrialPortal()

  return (
    <button
      type="button"
      className={className}
      aria-haspopup="dialog"
      aria-expanded={portal?.isOpen || undefined}
      onClick={(event) => {
        onClick?.(event)
        if (portal) portal.open()
        else openTrialFormInNewTab()
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
