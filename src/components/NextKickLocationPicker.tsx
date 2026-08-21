import { useId } from 'react'
import type { NextKickLocationId } from '../data/contact'

export type NextKickPickerLocation = {
  id: NextKickLocationId
  name: string
  blurb: string
  isNew?: boolean
}

type NextKickLocationPickerProps = {
  locations: NextKickPickerLocation[]
  onSelect: (id: NextKickLocationId) => void
}

export default function NextKickLocationPicker({
  locations,
  onSelect,
}: NextKickLocationPickerProps) {
  const baseId = useId()

  return (
    <div className="form-portal__picker">
      <div className="form-portal__picker-grid">
        {locations.map((loc) => {
          const nameId = `${baseId}-${loc.id}-name`
          const blurbId = `${baseId}-${loc.id}-blurb`

          return (
          <button
            key={loc.id}
            type="button"
            className="form-portal__loc-btn"
            aria-labelledby={nameId}
            aria-describedby={blurbId}
            onClick={() => onSelect(loc.id)}
          >
            <span className="form-portal__loc-btn-inner">
              <span className="form-portal__loc-name">
                <span id={nameId}>{loc.name}</span>
                {loc.isNew && <span className="form-portal__loc-badge">New</span>}
              </span>
              <span id={blurbId} className="form-portal__loc-blurb">{loc.blurb}</span>
            </span>
            <span className="form-portal__loc-arrow" aria-hidden="true">
              →
            </span>
          </button>
          )
        })}
      </div>
    </div>
  )
}
