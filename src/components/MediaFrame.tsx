import Placeholder from './Placeholder'
import FunSticker, { type FunStickerKind } from './FunSticker'
import OptimizedImage from './OptimizedImage'
import { imageDimensionsFor, imageSrcSetFor } from '../data/site'

type MediaFrameProps = {
  label: string
  icon?: string
  stickers?: { kind: FunStickerKind; spot?: 'tl' | 'tr' | 'bl' | 'br'; rotate?: number; delay?: number }[]
  className?: string
  variant?: 'tall' | 'wide' | 'default'
  /** When true and no `src`, show an explicit owner-photo-required caption */
  ownerRequired?: boolean
  /** Optional photo from the media registry (replaces the placeholder). */
  src?: string
  alt?: string
}

/** Media frame with optional peeling stickers for Just 4 Kids; falls back to Placeholder. */
export default function MediaFrame({
  label,
  icon = '🎉',
  stickers = [],
  className = '',
  variant = 'wide',
  ownerRequired = false,
  src,
  alt,
}: MediaFrameProps) {
  const dims = src ? imageDimensionsFor(src) : null
  const srcSet = src ? imageSrcSetFor(src) : undefined

  return (
    <div className={`media-frame ${className}`.trim()}>
      {src && dims ? (
        <OptimizedImage
          src={src}
          alt={alt ?? label}
          width={dims.width}
          height={dims.height}
          srcSet={srcSet}
          sizes="(max-width: 900px) 100vw, 48vw"
          loading="lazy"
        />
      ) : (
        <Placeholder label={label} icon={icon} variant={variant} />
      )}
      {ownerRequired && !src && (
        <p className="media-frame__note">
          OWNER PHOTO REQUIRED — DO NOT SUBSTITUTE WITH MISLEADING STOCK
        </p>
      )}
      {stickers.map((s) => (
        <FunSticker
          key={`${s.kind}-${s.spot ?? 'tr'}`}
          kind={s.kind}
          spot={s.spot}
          rotate={s.rotate}
          delay={s.delay}
        />
      ))}
    </div>
  )
}
