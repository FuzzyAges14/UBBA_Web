import type { CSSProperties } from 'react'

export type FunStickerKind =
  | 'cake'
  | 'shades'
  | 'balloon'
  | 'sun'
  | 'palm'
  | 'wave'
  | 'pizza'
  | 'glasses'
  | 'sparkle'

type FunStickerProps = {
  kind: FunStickerKind
  /** Corner placement relative to the media frame */
  spot?: 'tl' | 'tr' | 'bl' | 'br'
  rotate?: number
  className?: string
  delay?: number
}

const LABELS: Record<FunStickerKind, string> = {
  cake: 'Birthday cake sticker',
  shades: 'Party shades sticker',
  balloon: 'Balloon sticker',
  sun: 'Sunshine sticker',
  palm: 'Palm tree sticker',
  wave: 'Ocean wave sticker',
  pizza: 'Pizza sticker',
  glasses: 'Movie glasses sticker',
  sparkle: 'Sparkle sticker',
}

function Glyph({ kind }: { kind: FunStickerKind }) {
  switch (kind) {
    case 'cake':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="52" rx="22" ry="6" fill="#f0b429" />
          <rect x="12" y="30" width="40" height="22" rx="6" fill="#ffe8d6" />
          <rect x="12" y="30" width="40" height="8" fill="#e11836" />
          <rect x="30" y="14" width="4" height="16" rx="2" fill="#2563eb" />
          <circle cx="32" cy="12" r="4" fill="#f0b429" />
          <circle cx="20" cy="42" r="3" fill="#e11836" />
          <circle cx="32" cy="46" r="3" fill="#2563eb" />
          <circle cx="44" cy="42" r="3" fill="#f0b429" />
        </svg>
      )
    case 'shades':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M10 28h14a8 8 0 0 1 8 8v4a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6v-6a6 6 0 0 1 0-6Zm30 0h14a6 6 0 0 1 0 6v6a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6v-4a8 8 0 0 1 8-8Z"
            fill="#1b1b1d"
          />
          <path d="M24 32h16" stroke="#1b1b1d" strokeWidth="4" strokeLinecap="round" />
          <path d="M14 30l-6-4M50 30l6-4" stroke="#1b1b1d" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 36h8M40 36h8" stroke="#7ca9ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case 'balloon':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="26" rx="16" ry="20" fill="#e11836" />
          <path d="M32 46v14" stroke="#1b1b1d" strokeWidth="2" strokeDasharray="2 3" />
          <path d="M26 44h12l-6 6-6-6Z" fill="#c41230" />
          <ellipse cx="26" cy="20" rx="4" ry="6" fill="rgba(255,255,255,0.35)" />
        </svg>
      )
    case 'sun':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="12" fill="#f0b429" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="32"
              x2="32"
              y2="8"
              stroke="#f0b429"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${deg} 32 32)`}
            />
          ))}
        </svg>
      )
    case 'palm':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M34 58c0-16 2-28 4-40" stroke="#8b5a2b" strokeWidth="4" strokeLinecap="round" />
          <path
            d="M38 20c-10-2-18 4-22 12 10-2 16 0 22-4Z"
            fill="#2f9e44"
          />
          <path
            d="M38 22c2-10 10-14 18-14-4 8-6 14-10 18-4 0-6-2-8-4Z"
            fill="#37b24d"
          />
          <path
            d="M36 24c-8-8-18-8-26-4 8 2 14 6 20 12 4-2 6-4 6-8Z"
            fill="#2f9e44"
          />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 72 48" aria-hidden="true" className="fun-sticker__wave-svg">
          <defs>
            <linearGradient id="waveSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ca9ff" />
              <stop offset="55%" stopColor="#cfe3ff" />
              <stop offset="55%" stopColor="#4dabf7" />
              <stop offset="100%" stopColor="#228be6" />
            </linearGradient>
          </defs>
          <rect width="72" height="48" rx="12" fill="url(#waveSky)" />
          <circle className="fun-sticker__sun-bob" cx="54" cy="14" r="7" fill="#f0b429" />
          <path
            className="fun-sticker__wave-line"
            d="M0 30c6 0 6-6 12-6s6 6 12 6 6-6 12-6 6 6 12 6 6-6 12-6 6 6 12 6v18H0V30Z"
            fill="#228be6"
          />
          <path
            className="fun-sticker__wave-line fun-sticker__wave-line--2"
            d="M0 34c6 0 6-5 12-5s6 5 12 5 6-5 12-5 6 5 12 5 6-5 12-5 6 5 12 5v14H0V34Z"
            fill="#1971c2"
            opacity="0.85"
          />
        </svg>
      )
    case 'pizza':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 8 56 52H8L32 8Z" fill="#f0b429" />
          <path d="M32 16 50 48H14L32 16Z" fill="#ffa94d" />
          <circle cx="28" cy="34" r="3.5" fill="#e11836" />
          <circle cx="38" cy="40" r="3.5" fill="#e11836" />
          <circle cx="32" cy="28" r="2.5" fill="#e11836" />
        </svg>
      )
    case 'glasses':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="6" y="24" width="22" height="16" rx="4" fill="#1b1b1d" />
          <rect x="36" y="24" width="22" height="16" rx="4" fill="#1b1b1d" />
          <path d="M28 32h8" stroke="#1b1b1d" strokeWidth="3" />
          <rect x="10" y="28" width="14" height="8" rx="2" fill="#e11836" opacity="0.85" />
          <rect x="40" y="28" width="14" height="8" rx="2" fill="#2563eb" opacity="0.85" />
        </svg>
      )
    case 'sparkle':
      return (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M32 6 36 26 56 32 36 38 32 58 28 38 8 32 28 26Z"
            fill="#f0b429"
          />
          <path d="M48 10 50 18 58 20 50 22 48 30 46 22 38 20 46 18Z" fill="#e11836" />
        </svg>
      )
  }
}

/** Visual sticker with a gentle peel / bob motion — decorative only. */
export default function FunSticker({
  kind,
  spot = 'tr',
  rotate = -8,
  className = '',
  delay = 0,
}: FunStickerProps) {
  return (
    <span
      className={`fun-sticker fun-sticker--${spot} fun-sticker--${kind} ${className}`.trim()}
      style={
        {
          '--sticker-rotate': `${rotate}deg`,
          '--sticker-delay': `${delay}s`,
        } as CSSProperties
      }
      role="img"
      aria-label={LABELS[kind]}
    >
      <span className="fun-sticker__face">
        <Glyph kind={kind} />
      </span>
      <span className="fun-sticker__peel" aria-hidden="true" />
    </span>
  )
}
