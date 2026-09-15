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
  /** @deprecated Kept for call-site compatibility; captions are no longer shown. */
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
