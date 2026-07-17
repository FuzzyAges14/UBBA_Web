import { useState } from 'react'
import './App.css'

function App() {
  const [opened, setOpened] = useState(false)

  return (
    <main className="page">
      <div className="glow" aria-hidden="true" />

      <section className="hero">
        <p className="eyebrow">A little something for</p>
        <h1 className="title">UBBA</h1>
        <p className="subtitle">
          A present, wrapped in code and sent with care.
        </p>

        <div className="gift-stage">
          <button
            className={`gift ${opened ? 'gift--open' : ''}`}
            onClick={() => setOpened((v) => !v)}
            aria-pressed={opened}
            aria-label={opened ? 'Close the present' : 'Open the present'}
          >
            <span className="gift__lid" aria-hidden="true" />
            <span className="gift__box" aria-hidden="true" />
            <span className="gift__ribbon" aria-hidden="true" />
          </button>

          <p className="gift-caption" role="status">
            {opened
              ? '🎉 Surprise! Thanks for being you.'
              : 'Tap the gift to unwrap it.'}
          </p>
        </div>
      </section>

      <footer className="footer">
        <span>Made with React + Vite</span>
      </footer>
    </main>
  )
}

export default App
