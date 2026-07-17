/**
 * Abstract Taegeuk-inspired mark (opposing curved forms).
 * Used as a subtle decorative device — kept minimal and abstract per brand rules.
 */
export default function Taegeuk({
  size = 120,
  className = '',
  spin = false,
}: {
  size?: number
  className?: string
  spin?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={
        spin
          ? { animation: 'tg-spin 24s linear infinite' }
          : undefined
      }
    >
      <defs>
        <style>{`@keyframes tg-spin{to{transform:rotate(360deg);transform-origin:50% 50%}}`}</style>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      <path
        d="M50 2a48 48 0 0 1 0 96 24 24 0 0 0 0-48 24 24 0 0 1 0-48z"
        fill="var(--red)"
        fillOpacity="0.9"
      />
      <path
        d="M50 98a48 48 0 0 1 0-96 24 24 0 0 0 0 48 24 24 0 0 1 0 48z"
        fill="var(--blue)"
        fillOpacity="0.9"
      />
    </svg>
  )
}
