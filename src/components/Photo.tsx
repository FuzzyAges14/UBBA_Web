type PhotoProps = {
  src: string
  alt: string
  variant?: 'tall' | 'wide' | 'default'
  zoom?: boolean
  className?: string
  credit?: string
}

/**
 * Renders a cover-fit photo inside a rounded frame.
 * Images are currently PLACEHOLDERS — see docs/IMAGE_SOURCES.md.
 */
export default function Photo({
  src,
  alt,
  variant = 'default',
  zoom = false,
  className = '',
  credit,
}: PhotoProps) {
  const v =
    variant === 'tall' ? 'photo--tall' : variant === 'wide' ? 'photo--wide' : ''
  return (
    <div className={`photo ${v} ${zoom ? 'photo--zoom' : ''} ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" />
      {credit && <span className="photo__credit">{credit}</span>}
    </div>
  )
}
