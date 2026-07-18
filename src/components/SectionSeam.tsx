import type { CSSProperties } from 'react'

type SeamTone = 'off-white' | 'dark' | 'graphite' | 'j4k' | 'j4k-sun' | 'j4k-hero'

const TONES: Record<SeamTone, string> = {
  'off-white': 'var(--off-white)',
  dark: 'var(--black)',
  graphite: 'var(--graphite)',
  j4k: '#fff9f4',
  'j4k-sun': '#fffaf0',
  'j4k-hero': '#eef4ff',
}

type SectionSeamProps = {
  /** Background tone of the section above the seam */
  from: SeamTone
  /** Background tone of the section below the seam */
  to: SeamTone
  /** Soft wave (default) or a thinner fade blend */
  variant?: 'wave' | 'fade'
}

/**
 * Soft visual bridge between adjacent sections with different backgrounds.
 * Place between sections — not inside them.
 */
export default function SectionSeam({ from, to, variant = 'wave' }: SectionSeamProps) {
  const fromColor = TONES[from]
  const toColor = TONES[to]

  if (variant === 'fade') {
    return (
      <div
        className="section-seam section-seam--fade"
        aria-hidden="true"
        style={
          {
            '--seam-from': fromColor,
            '--seam-to': toColor,
          } as CSSProperties
        }
      />
    )
  }

  return (
    <div
      className="section-seam section-seam--wave"
      aria-hidden="true"
      style={
        {
          '--seam-from': fromColor,
          '--seam-to': toColor,
        } as CSSProperties
      }
    >
      <div className="section-seam__fade" />
      <svg
        className="section-seam__svg"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M0,24 C240,72 480,0 720,32 C960,64 1200,8 1440,40 L1440,72 L0,72 Z"
          fill="var(--seam-to)"
        />
      </svg>
      <div className="section-seam__accent" />
    </div>
  )
}
