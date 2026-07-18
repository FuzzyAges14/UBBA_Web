import type { ReactNode } from 'react'
import Sticker from './Sticker'

type MediaFrameProps = {
  src: string
  alt: string
  sticker?: string
  stickerTone?: 'red' | 'blue' | 'gold' | 'cream'
  stickerRotate?: number
  className?: string
  children?: ReactNode
}

/** Image frame with an optional side sticker for Just 4 Kids pages. */
export default function MediaFrame({
  src,
  alt,
  sticker,
  stickerTone = 'gold',
  stickerRotate = -10,
  className = '',
  children,
}: MediaFrameProps) {
  return (
    <div className={`media-frame ${className}`.trim()}>
      <img src={src} alt={alt} className="media-frame__img" loading="lazy" />
      {sticker && (
        <Sticker tone={stickerTone} rotate={stickerRotate} className="media-frame__sticker">
          {sticker}
        </Sticker>
      )}
      {children}
    </div>
  )
}
