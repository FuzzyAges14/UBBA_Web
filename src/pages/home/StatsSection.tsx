import Reveal from '../../components/Reveal'
import StatCounter from '../../components/StatCounter'
import { STATS } from '../../data/site'

export default function StatsSection() {
  return (
    <section className="section--tight section--graphite">
      <div className="container">
        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="stat">
                <div className="stat__num">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="stat__label">{s.label}</div>
                {s.placeholder && <span className="stat__ph">Pending confirmation</span>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
