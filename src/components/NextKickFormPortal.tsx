import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NEXTKICK_TRIAL_FORM } from '../data/contact'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

type NextKickFormPortalProps = {
  open: boolean
  onClose: () => void
}

export default function NextKickFormPortal({ open, onClose }: NextKickFormPortalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const frameTitleId = useId()

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const root = dialogRef.current
      if (!root) return
      const focusables = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div className="form-portal" role="presentation">
      <button
        type="button"
        className="form-portal__backdrop"
        aria-label="Close trial form"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        className="form-portal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={frameTitleId}
      >
        <div className="form-portal__chrome">
          <div className="form-portal__heading">
            <span className="eyebrow">Free Class Request</span>
            <h2 id={titleId}>{NEXTKICK_TRIAL_FORM.title}</h2>
            <p id={frameTitleId} className="form-portal__lede">
              Complete the academy&apos;s NextKick trial form without leaving this page.
              You can also{' '}
              <a
                href={NEXTKICK_TRIAL_FORM.href}
                target="_blank"
                rel="noreferrer"
              >
                open it in a new tab
              </a>
              .
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="form-portal__close"
            aria-label="Close trial form"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="form-portal__frame">
          <iframe
            title={`${NEXTKICK_TRIAL_FORM.title} form`}
            src={NEXTKICK_TRIAL_FORM.href}
            referrerPolicy="no-referrer-when-downgrade"
            allow="payment; clipboard-write"
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
