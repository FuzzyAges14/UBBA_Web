import { useState } from 'react'
import type { Faq as FaqType } from '../data/site'

export default function Faq({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `faq-panel-${i}`
        const buttonId = `faq-button-${i}`
        return (
          <div key={item.q} className={`faq__item ${isOpen ? 'open' : ''}`}>
            <button
              id={buttonId}
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span className="faq__icon" aria-hidden="true">
                +
              </span>
            </button>
            <div
              id={panelId}
              className="faq__a"
              role="region"
              aria-labelledby={buttonId}
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </div>
  )
}
