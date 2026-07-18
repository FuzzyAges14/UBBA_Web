import Reveal from '../../components/Reveal'
import StatCounter from '../../components/StatCounter'
import { STATS } from '../../data/site'

export default function StatsSection() {
  return (
    <section className="section--tight section--graphite home-stats" aria-label="Academy statistics">
      <div className="container">
        <div className="home-stats__rail">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="home-stats__item">
                <div className="home-stats__num">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="home-stats__label">{s.label}</div>
                {s.placeholder && (
                  <span className="stat__ph">Pending confirmation</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
