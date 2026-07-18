import { useEffect, useRef, useState, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/**
 * Wraps content and fades/slides it in when it scrolls into view.
 * Falls back to visible immediately when IntersectionObserver is unavailable
 * or the user prefers reduced motion.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reduceMotion)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    // Low threshold + expanded rootMargin so tall blocks (maps, cards) still
    // reveal when only a sliver enters the viewport — avoiding "blank" sections
    // that look like white-on-white contrast failures.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01, rootMargin: '64px 0px 64px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reduceMotion])

  const Tag = as as 'div'

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay && !reduceMotion ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
