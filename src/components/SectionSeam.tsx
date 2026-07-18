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

export type SeamVariant = 'wave' | 'fade' | 'angle' | 'belt' | 'line'

type SectionSeamProps = {
  /** Background tone of the section above the seam */
  from: SeamTone
  /** Background tone of the section below the seam */
  to: SeamTone
  /**
   * Visual bridge style. Prefer mixing variants so pages do not repeat the
   * same wave gradient between every section.
   * - fade: soft color blend (default)
   * - wave: signature curved SVG (use sparingly)
   * - angle: diagonal slash cut
   * - belt: belt-rank accent bar
   * - line: thin centered rule with a short blend
   */
  variant?: SeamVariant
}

/**
 * Soft visual bridge between adjacent sections with different backgrounds.
 * Place between sections — not inside them.
 */
export default function SectionSeam({ from, to, variant = 'fade' }: SectionSeamProps) {
  const fromColor = TONES[from]
  const toColor = TONES[to]
  const style = {
    '--seam-from': fromColor,
    '--seam-to': toColor,
  } as CSSProperties

  if (variant === 'fade') {
    return (
      <div
        className="section-seam section-seam--fade"
        aria-hidden="true"
        style={style}
      />
    )
  }

  if (variant === 'line') {
    return (
      <div
        className="section-seam section-seam--line"
        aria-hidden="true"
        style={style}
      >
        <div className="section-seam__rule" />
      </div>
    )
  }

  if (variant === 'belt') {
    return (
      <div
        className="section-seam section-seam--belt"
        aria-hidden="true"
        style={style}
      >
        <div className="section-seam__belt" aria-hidden="true">
          <span className="section-seam__belt-seg section-seam__belt-seg--white" />
          <span className="section-seam__belt-seg section-seam__belt-seg--blue" />
          <span className="section-seam__belt-seg section-seam__belt-seg--red" />
          <span className="section-seam__belt-seg section-seam__belt-seg--black" />
        </div>
      </div>
    )
  }

  if (variant === 'angle') {
    return (
      <div
        className="section-seam section-seam--angle"
        aria-hidden="true"
        style={style}
      >
        <svg
          className="section-seam__svg"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          focusable="false"
        >
          <polygon points="0,0 1440,48 1440,64 0,64" fill="var(--seam-to)" />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="section-seam section-seam--wave"
      aria-hidden="true"
      style={style}
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
