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
  return (
    <div className="form-portal__picker">
      <div className="form-portal__picker-grid" role="list">
        {locations.map((loc) => (
          <button
            key={loc.id}
            type="button"
            className="form-portal__loc-btn"
            role="listitem"
            onClick={() => onSelect(loc.id)}
          >
            <span className="form-portal__loc-btn-inner">
              <span className="form-portal__loc-name">
                {loc.name}
                {loc.isNew && <span className="form-portal__loc-badge">New</span>}
              </span>
              <span className="form-portal__loc-blurb">{loc.blurb}</span>
            </span>
            <span className="form-portal__loc-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
