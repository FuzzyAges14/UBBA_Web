import type { CSSProperties, ReactNode } from 'react'

type StickerTone = 'red' | 'blue' | 'gold' | 'cream'

type StickerProps = {
  children: ReactNode
  tone?: StickerTone
  rotate?: number
  className?: string
}

/** Playful rotated badge for Just 4 Kids imagery — not used as a hero overlay chip. */
export default function Sticker({
  children,
  tone = 'red',
  rotate = -8,
  className = '',
}: StickerProps) {
  return (
    <span
      className={`sticker sticker--${tone} ${className}`.trim()}
      style={{ '--sticker-rotate': `${rotate}deg` } as CSSProperties}
    >
      {children}
    </span>
  )
}
