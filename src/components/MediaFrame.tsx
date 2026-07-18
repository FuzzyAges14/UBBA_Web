import Placeholder from './Placeholder'
import FunSticker, { type FunStickerKind } from './FunSticker'

type MediaFrameProps = {
  label: string
  icon?: string
  stickers?: { kind: FunStickerKind; spot?: 'tl' | 'tr' | 'bl' | 'br'; rotate?: number; delay?: number }[]
  className?: string
  variant?: 'tall' | 'wide' | 'default'
  /** When true, show an explicit owner-photo-required caption */
  ownerRequired?: boolean
}

/** Placeholder media with optional peeling visual stickers for Just 4 Kids. */
export default function MediaFrame({
  label,
  icon = '🎉',
  stickers = [],
  className = '',
  variant = 'wide',
  ownerRequired = false,
}: MediaFrameProps) {
  return (
    <div className={`media-frame ${className}`.trim()}>
      <Placeholder label={label} icon={icon} variant={variant} />
      {ownerRequired && (
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
