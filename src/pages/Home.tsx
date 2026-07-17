import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import LeadForm from '../components/LeadForm'
import LocationCard from '../components/LocationCard'
import {
  HOME_PROGRAM_CARDS,
  LOCATIONS,
  GLEN_ROCK,
  SITE,
  TESTIMONIALS,
  VALUES,
} from '../data/site'

export default function Home() {
  const locations = SITE.showGlenRock ? [...LOCATIONS, GLEN_ROCK] : LOCATIONS

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="hero__badge">🥋 Allendale &amp; Midland Park, NJ</span>
            <h1>
              Confidence Building Martial Arts Classes in{' '}
              <span className="accent">Allendale &amp; Midland Park</span>
            </h1>
            <p className="hero__sub">
              Martial arts that build discipline, focus, and real self-defense
              skills — for kids, teens, and adults. Come train with a team that
              believes in you.
            </p>
            <div className="hero__actions">
              <Link to="/programs/children" className="btn btn--lg">
                Children's Programs
              </Link>
              <Link to="/programs/adult" className="btn btn--gold btn--lg">
                Adult Programs
              </Link>
            </div>
            <div className="hero__stats">
              <div>
                <div className="stat__num">2</div>
                <div className="stat__label">NJ Locations</div>
              </div>
              <div>
                <div className="stat__num">3-Adult</div>
                <div className="stat__label">All Ages Welcome</div>
              </div>
              <div>
                <div className="stat__num">Free</div>
                <div className="stat__label">First Class</div>
              </div>
            </div>
          </div>
          <div className="hero__media">
            <Placeholder
              label="Students training on the mat"
              icon="🥋"
              variant="tall"
            />
          </div>
        </div>
      </section>

      {/* Program cards */}
      <section className="section" id="programs">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Our Programs</span>
            <h2 className="section-title">Find The Right Class</h2>
            <p className="section-lead center-block text-center">
              Age-specific programs designed to meet every student where they are
              and help them grow.
            </p>
          </Reveal>
          <div className="grid grid--4 mt">
            {HOME_PROGRAM_CARDS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 80}>
                <div className="card">
                  <Placeholder
                    className="card__top"
                    label={p.title}
                    icon="🥋"
                  />
                  <div className="card__body">
                    {p.ages && <span className="card__ages">{p.ages}</span>}
                    <h3 className="card__title">{p.title}</h3>
                    <p className="card__text">{p.blurb}</p>
                    <Link
                      to={
                        p.id === 'adult-martial-arts'
                          ? '/programs/adult'
                          : '/programs/children'
                      }
                      className="card__link"
                    >
                      Learn How It Works →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Main value section */}
      <section className="section section--dark">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Why It Matters</span>
            <h2 className="section-title">
              We Help Parents Raise Confident Leaders &amp; Adults Reach Their Full
              Potential!
            </h2>
            <p className="section-lead">
              Martial arts is about so much more than kicks and punches. Every
              class is built to strengthen the skills that carry over into school,
              work, and life.
            </p>
            <div className="pill-row">
              {VALUES.map((v) => (
                <span className="pill" key={v}>
                  {v}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Placeholder
              label="Instructor coaching a young student"
              icon="🏆"
              variant="tall"
            />
          </Reveal>
        </div>
      </section>

      {/* Lead form */}
      <section className="section" id="trial">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Get Started</span>
            <h2 className="section-title">
              Crush your fitness goals while learning how to protect yourself
            </h2>
            <p className="section-lead">
              Tell us a little about yourself and we'll help you pick the perfect
              program. Your first class is completely free — no pressure, just a
              great workout.
            </p>
            <ul className="stack-gap mt" style={{ listStyle: 'none', padding: 0 }}>
              <li>✅ Friendly, certified instructors</li>
              <li>✅ Clean, welcoming, family-first facilities</li>
              <li>✅ Flexible schedules for busy families</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      {/* Owner section */}
      <section className="section section--ink" id="owner">
        <div className="container split">
          <Reveal>
            <Placeholder label={`${SITE.owner}, Head Instructor`} icon="🥋" variant="tall" />
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Meet The Owner</span>
            <h2 className="section-title">Hi, my name is {SITE.owner}</h2>
            <p className="section-lead">
              Martial arts changed my life, and I've dedicated my career to sharing
              that same transformation with our community. Over the years I've seen
              shy kids find their voice and busy adults rediscover their strength.
            </p>
            <p className="section-lead">
              My goal is simple: create an enjoyable, supportive environment where
              every student builds fitness, confidence, and character — and has fun
              doing it. When you walk through our doors, you're family.
            </p>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Getting started steps */}
      <section className="section">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Getting Started Is Easy</span>
            <h2 className="section-title">Three Simple Steps</h2>
          </Reveal>
          <div className="grid grid--3 mt" style={{ rowGap: '2.4rem' }}>
            {[
              {
                t: 'Redeem A Web Offer',
                d: 'Claim one of our exclusive online offers to lock in your free introductory class.',
              },
              {
                t: 'Schedule A First Lesson',
                d: "Book your child's first semi-private lesson at a time that works for your family.",
              },
              {
                t: 'Begin The Journey',
                d: 'Step onto the mat and start building confidence, discipline, and lifelong skills.',
              },
            ].map((s, i) => (
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

      {/* You belong here + feature blocks */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">You Belong Here</span>
            <h2 className="section-title">Martial Arts For Every Age &amp; Ability</h2>
            <p className="section-lead center-block text-center">
              Whether you're looking for an exciting activity for your child or a
              motivating alternative to the gym, there's a place for you on our mat.
              No experience required — just show up ready to grow.
            </p>
          </Reveal>
          <div className="grid grid--3 mt">
            {[
              {
                t: "Children's Classes",
                d: 'Fun, structured classes that build focus, respect, and confidence.',
                icon: '🧒',
              },
              {
                t: 'Adult Classes',
                d: 'Get fit, relieve stress, and learn practical self-defense.',
                icon: '💪',
              },
              {
                t: 'Workshops & Special Events',
                d: 'Seminars, belt tests, and community events all year round.',
                icon: '🎉',
              },
            ].map((f, i) => (
              <Reveal as="article" key={f.t} delay={i * 90}>
                <div className="feature">
                  <div className="feature__bg" />
                  <div className="feature__body">
                    <div style={{ fontSize: '2rem' }}>{f.icon}</div>
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--ink" id="reviews">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Reviews</span>
            <h2 className="section-title">What Our Families Say</h2>
          </Reveal>
          <div className="grid grid--3 mt">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="quote" style={{ margin: 0 }}>
                  <div className="quote__stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote className="quote__text" style={{ margin: 0 }}>
                    "{t.quote}"
                  </blockquote>
                  <figcaption>
                    <div className="quote__by">{t.name}</div>
                    <div className="quote__role">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="section" id="locations">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow">Our Schools</span>
            <h2 className="section-title">Visit A Location Near You</h2>
            <p className="section-lead center-block text-center">
              Two convenient Bergen County locations, with the same welcoming
              community at each.
            </p>
          </Reveal>
          <div className="grid grid--2 mt">
            {locations.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 90}>
                <LocationCard loc={loc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <h2>Try A Class For Free!</h2>
              <p>
                Come experience the energy, discipline, and fun for yourself. Your
                first class is on us — let's get started today.
              </p>
              <div className="flex-actions" style={{ justifyContent: 'center' }}>
                <Link to="/contact" className="btn btn--gold btn--lg">
                  {SITE.primaryCta}
                </Link>
                <Link to="/just-4-kids" className="btn btn--ghost btn--lg">
                  Explore Just 4 Kids
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
