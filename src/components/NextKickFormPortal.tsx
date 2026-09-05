import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  getNextKickForm,
  getNextKickFormHref,
  NEXTKICK_LOCATION_ORDER,
  type NextKickFormKind,
  type NextKickLocationId,
} from '../data/contact'
import { SITE } from '../data/site'
import NextKickLocationPicker, {
  type NextKickPickerLocation,
} from './NextKickLocationPicker'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

const NEW_TAB_MARKER = 'open it in a new tab'

function renderFormLede(text: string, href: string) {
  const markerIndex = text.indexOf(NEW_TAB_MARKER)
  if (markerIndex === -1) return text

  return (
    <>
      {text.slice(0, markerIndex)}
      <a href={href} target="_blank" rel="noreferrer">
        {NEW_TAB_MARKER}
      </a>
      {text.slice(markerIndex + NEW_TAB_MARKER.length)}
    </>
  )
}

type NextKickFormPortalProps = {
  open: boolean
  onClose: () => void
  kind: NextKickFormKind | null
  locationId: NextKickLocationId | null
  onSelectLocation: (id: NextKickLocationId) => void
  onBackToPicker: () => void
}

export default function NextKickFormPortal({
  open,
  onClose,
  kind,
  locationId,
  onSelectLocation,
  onBackToPicker,
}: NextKickFormPortalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()
  const ledeId = useId()

  const isPickerStep = !locationId
  const config = kind ? getNextKickForm(kind) : null
  const formHref =
    kind && locationId ? getNextKickFormHref(kind, locationId) : null
  const activeLocation =
    config && locationId ? config.locations[locationId] : null

  const pickerLocations: NextKickPickerLocation[] = config
    ? NEXTKICK_LOCATION_ORDER.filter(
        (id) => id !== 'glen-rock' || SITE.showGlenRock,
      ).map((id) => ({
        id,
        name: config.locations[id].name,
        blurb: config.locations[id].blurb,
        isNew: id === 'glen-rock',
      }))
    : []

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open, isPickerStep])

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

  if (!open || !kind || !config || typeof document === 'undefined') return null

  const lede = isPickerStep ? config.pickerLede : config.formLede
  const closeLabel = isPickerStep
    ? `Close ${config.title}`
    : `Close ${activeLocation?.name ?? 'school'} form`

  return createPortal(
    <div className="form-portal" role="presentation">
          <button
            type="button"
            className="form-portal__backdrop"
            aria-label="Dismiss form portal"
            onClick={onClose}
          />
      <div
        ref={dialogRef}
        className={[
          'form-portal__dialog',
          `form-portal__dialog--${config.theme}`,
          isPickerStep ? 'form-portal__dialog--picker' : 'form-portal__dialog--form',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={ledeId}
      >
        <div className="belt-bar form-portal__belt" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="form-portal__chrome">
          <div className="form-portal__heading">
            {!isPickerStep && (
              <button
                type="button"
                className="form-portal__back"
                onClick={onBackToPicker}
              >
                ← All schools
              </button>
            )}
            <span className="eyebrow">{config.eyebrow}</span>
            <h2 id={titleId}>
              {isPickerStep ? config.title : `${config.title} — ${activeLocation?.name}`}
            </h2>
            <p id={ledeId} className="form-portal__lede">
              {isPickerStep || !formHref ? lede : renderFormLede(lede, formHref)}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="form-portal__close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {isPickerStep ? (
          <div className="form-portal__body form-portal__body--picker">
            <div className="dojang dojang--light" aria-hidden="true" />
            <NextKickLocationPicker
              locations={pickerLocations}
              onSelect={onSelectLocation}
            />
          </div>
        ) : (
          <div className="form-portal__frame">
            <iframe
              title={`${config.title} — ${activeLocation?.name ?? 'school'} form`}
              src={formHref ?? undefined}
              referrerPolicy="no-referrer-when-downgrade"
              allow="payment; clipboard-write"
            />
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
