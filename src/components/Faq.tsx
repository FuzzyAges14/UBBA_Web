import { useState } from 'react'
import type { Faq as FaqType } from '../data/site'

export default function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.q} className={`faq__item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className="faq__icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq__a" role="region">
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
