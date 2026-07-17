type PlaceholderProps = {
  label: string
  icon?: string
  variant?: 'tall' | 'wide' | 'default'
  className?: string
}

/**
 * Styled image placeholder. Swap these out for real photography by replacing
 * the component with an <img> once the academy provides assets.
 */
export default function Placeholder({
  label,
  icon = '🥋',
  variant = 'default',
  className = '',
}: PlaceholderProps) {
  const variantClass =
    variant === 'tall' ? 'ph--tall' : variant === 'wide' ? 'ph--wide' : ''
  return (
    <div
      className={`ph ${variantClass} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <span className="ph__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="ph__label">{label}</span>
    </div>
  )
}
