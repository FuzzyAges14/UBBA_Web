type OwnerMediaSlotProps = {
  label: string
  /** Short instruction shown under the label */
  note?: string
  icon?: string
  className?: string
}

/**
 * Reserved frame for authentic UBBA photography.
 * Do not replace with stock that implies a real school interior or exterior.
 */
export default function OwnerMediaSlot({
  label,
  note,
  icon = '🏫',
  className = '',
}: OwnerMediaSlotProps) {
  return (
    <div
      className={`owner-slot ${className}`.trim()}
      role="img"
      aria-label={note ? `${label}. ${note}` : label}
    >
      <span className="owner-slot__mark" aria-hidden="true">
        {icon}
      </span>
      <p className="owner-slot__label">{label}</p>
      {note ? <p className="owner-slot__note">{note}</p> : null}
    </div>
  )
}
