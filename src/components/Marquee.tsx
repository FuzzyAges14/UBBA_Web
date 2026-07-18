import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Marquee({ items }: { items: string[] }) {
  const reduceMotion = usePrefersReducedMotion()

  if (reduceMotion) {
    return (
      <div className="marquee marquee--static" aria-hidden="true">
        <div className="marquee__track marquee__track--static">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    )
  }

  const doubled = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  )
}
