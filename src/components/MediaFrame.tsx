import Placeholder from './Placeholder'
import FunSticker, { type FunStickerKind } from './FunSticker'

type MediaFrameProps = {
  label: string
  icon?: string
  stickers?: { kind: FunStickerKind; spot?: 'tl' | 'tr' | 'bl' | 'br'; rotate?: number; delay?: number }[]
  className?: string
  variant?: 'tall' | 'wide' | 'default'
}

/** Placeholder media with optional peeling visual stickers for Just 4 Kids. */
export default function MediaFrame({
  label,
  icon = '🎉',
  stickers = [],
  className = '',
  variant = 'wide',
}: MediaFrameProps) {
  return (
    <div className={`media-frame ${className}`.trim()}>
      <Placeholder label={label} icon={icon} variant={variant} />
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
