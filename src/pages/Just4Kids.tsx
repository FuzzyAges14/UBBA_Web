import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import { JUST_4_KIDS } from '../data/site'

const STEPS = [
  { t: 'Select Program', d: 'Pick the experience that fits — a party, camp, or a fun night out.' },
  { t: 'Enroll Your Child', d: 'Reserve your spot in just a few minutes. We handle the rest.' },
  { t: 'Let The Fun Begin!', d: 'Drop off and relax while our team delivers a safe, exciting time.' },
]

const ICONS: Record<string, string> = {
  'birthday-parties': '🎂',
  'summer-camp': '☀️',
  'parents-night-out': '🍕',
}

export default function Just4Kids() {
  return (
    <>
      <PageHero
        center
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Just 4 Kids' }]}
        title="At United Black Belt Academy, the fun doesn't stop at the mat!"
        intro="From birthday bashes to summer adventures and monthly parents' night out, we keep kids moving, laughing, and learning."
      />

      {/* 3-step flow */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">Three steps to fun</h2>
          </Reveal>
          <div className="grid grid--3 mt" style={{ rowGap: '2.6rem' }}>
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <div className="step">
                  <div className="step__num">{i + 1}</div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Program sections */}
      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container stack-gap" style={{ gap: '3rem', position: 'relative' }}>
          {JUST_4_KIDS.map((prog, i) => (
            <Reveal key={prog.id}>
              <div className={`split ${i % 2 === 1 ? 'split--flip' : ''}`.trim()}>
                <div>
                  <Placeholder
                    label={prog.title}
                    icon={ICONS[prog.id] ?? '🎉'}
                    variant="wide"
                  />
                </div>
                <div>
                  <span className="card__ages">{prog.tag}</span>
                  <h3 className="section-title" style={{ fontSize: '1.9rem', marginTop: '0.6rem' }}>
                    {prog.title}
                  </h3>
                  <p className="section-lead">{prog.blurb}</p>
                  <p className="ph-note mt-sm">
                    Pricing, dates &amp; inclusions — pending owner confirmation.
                  </p>
                  <Link to="/contact" className="btn btn--gold mt">
                    Book {prog.title} <span className="btn__arrow">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Plan something unforgettable"
        text="Reach out today to book a party, reserve a camp spot, or join the next parents' night out."
      />
    </>
  )
}
