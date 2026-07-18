import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/Reveal'
import Placeholder from '../components/Placeholder'
import LeadForm from '../components/LeadForm'
import LocationCard from '../components/LocationCard'
import Marquee from '../components/Marquee'
import StatCounter from '../components/StatCounter'
import Taegeuk from '../components/Taegeuk'
import Faq from '../components/Faq'
import HeroVideo from '../components/HeroVideo'
import {
  HOME_PROGRAM_CARDS,
  LOCATIONS,
  GLEN_ROCK,
  SITE,
  IMAGES,
  TESTIMONIALS,
  VALUES,
  STATS,
  OWNER,
  GETTING_STARTED,
  FAQS,
} from '../data/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const PROGRAM_GLYPH: Record<string, string> = {
  'tiny-tigers': '🐯',
  'junior-tigers': '🥋',
  'teen-martial-arts': '⚡',
  'adult-martial-arts': '💪',
}

const staticFade = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
}

export default function Home() {
  const locations = SITE.showGlenRock ? [...LOCATIONS, GLEN_ROCK] : LOCATIONS
  const reduceMotion = useReducedMotion()
  const heroMotion = reduceMotion ? staticFade : fadeUp

  return (
    <>
      {/* ---------- Hero (cinematic video) ---------- */}
      <section className="hero" aria-labelledby="home-hero-title">
        <HeroVideo src={IMAGES.heroVideo} poster={IMAGES.heroPoster} />
        <div className="hero__overlay" aria-hidden="true" />
        <div className="dojang dojang--fade" aria-hidden="true" />
        <div className="container hero__inner">
          <motion.span
            className="hero__badge"
            initial="hidden"
            animate="show"
            variants={heroMotion}
          >
            <span aria-hidden="true">📍</span> Allendale &amp; Midland Park, NJ
          </motion.span>
          <motion.h1
            id="home-hero-title"
            initial="hidden"
            animate="show"
            custom={1}
            variants={heroMotion}
          >
            United <span className="accent accent--red">Black</span>{' '}
            <span className="accent">Belt</span> Academy
          </motion.h1>
          <motion.p
            className="hero__tagline"
            initial="hidden"
            animate="show"
            custom={2}
            variants={heroMotion}
          >
            Confidence Building Martial Arts Classes in Allendale &amp; Midland Park
          </motion.p>
          <motion.p
            className="hero__sub"
            initial="hidden"
            animate="show"
            custom={3}
            variants={heroMotion}
          >
            We build confidence, discipline, focus, and real self-defense skills —
            for kids, teens, and adults. Train with a team that believes in you.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial="hidden"
            animate="show"
            custom={4}
            variants={heroMotion}
          >
            <Link to="/contact" className="btn btn--lg">
              {SITE.primaryCta} <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link to="/programs/children" className="btn btn--ghost btn--lg">
              Children&apos;s Programs
            </Link>
            <Link to="/programs/adult" className="btn btn--ghost btn--lg">
              Adult Programs
            </Link>
          </motion.div>
          <motion.div
            className="hero__meta"
            initial="hidden"
            animate="show"
            custom={5}
            variants={heroMotion}
          >
            <span>
              <span className="dot" aria-hidden="true">★★★★★</span> Loved by local families
            </span>
            <span>
              <span className="dot" aria-hidden="true">●</span> Ages 3 through adult
            </span>
            <span>
              <span className="dot" aria-hidden="true">●</span> {locations.length} convenient locations
            </span>
          </motion.div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </section>

      {/* ---------- Value marquee ---------- */}
      <Marquee items={VALUES} />

      {/* ---------- Program discovery rail ---------- */}
      <section className="section" id="programs">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Find Your Path</span>
            <h2 className="section-title">Programs for every age &amp; stage</h2>
            <p className="section-lead">
              Age-specific training that meets each student exactly where they are —
              hover a program to see how it works.
            </p>
          </Reveal>
          <div className="rail mt">
            {HOME_PROGRAM_CARDS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 80}>
                <div className="pcard">
                  <div className="pcard__art" />
                  <div className="pcard__scrim" />
                  <span className="pcard__glyph" aria-hidden="true">
                    {PROGRAM_GLYPH[p.id]}
                  </span>
                  <div className="pcard__body">
                    {p.ages && <span className="pcard__age">{p.ages}</span>}
                    <h3 className="pcard__title">{p.title}</h3>
                    <p className="pcard__text">{p.blurb}</p>
                    <Link to={`/programs/${p.slug}`} className="pcard__cta">
                      Learn How It Works <span className="btn__arrow">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Main value story ---------- */}
      <section className="section section--dark">
        <div className="dojang" aria-hidden="true" />
        <div className="container split" style={{ position: 'relative' }}>
          <Reveal>
            <span className="eyebrow">Why It Matters</span>
            <h2 className="section-title">
              We help parents raise confident leaders &amp; adults reach their full
              potential
            </h2>
            <p className="section-lead">
              Martial arts is about far more than kicks and punches. Every class is
              built to strengthen the skills that carry into school, work, and life.
            </p>
            <div className="pill-row">
              {VALUES.map((v) => (
                <span className="pill" key={v}>
                  {v}
                </span>
              ))}
            </div>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position: 'relative' }}>
              <div className="accent-orb" aria-hidden="true">
                <Taegeuk size={88} spin />
              </div>
              <Placeholder
                label="Instructor coaching a young student"
                icon="🏆"
                variant="tall"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
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

      {/* ---------- Lead form ---------- */}
      <section className="section" id="trial">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Get Started</span>
            <h2 className="section-title">
              Crush your fitness goals while learning how to protect yourself
            </h2>
            <p className="section-lead">
              Tell us a little about yourself and we'll help you choose the perfect
              program. Your first class is completely free — no pressure, just a
              great workout.
            </p>
            <ul className="checklist mt">
              <li>Friendly, certified instructors</li>
              <li>Clean, welcoming, family-first facilities</li>
              <li>Flexible schedules for busy families</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      {/* ---------- Owner ---------- */}
      <section className="section section--dark" id="owner">
        <div className="container owner">
          <div className="owner__sticky">
            <Reveal>
              <Placeholder
                label={`${OWNER.name}, Head Instructor`}
                icon="🥋"
                variant="tall"
              />
            </Reveal>
          </div>
          <Reveal delay={100} className="owner__copy">
            <span className="eyebrow">Meet The Owner</span>
            <h2 className="section-title">Hi, my name is {OWNER.name}</h2>
            <p className="section-lead">{OWNER.intro}</p>
            <blockquote className="owner__quote">"{OWNER.quote}"</blockquote>
            <div className="stack-gap">
              {OWNER.story.map((para) => (
                <p key={para.slice(0, 24)} className="section-lead" style={{ marginTop: 0 }}>
                  {para}
                </p>
              ))}
            </div>
            <p className="owner__sign mt">— {OWNER.name}</p>
            <ul className="checklist mt-sm">
              {OWNER.credentials.map((c) => (
                <li key={c} style={{ color: 'var(--muted-light)' }}>
                  {c}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn--gold mt">
              {SITE.primaryCta} <span className="btn__arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Getting started belt journey ---------- */}
      <section className="section section--graphite">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Getting Started</span>
            <h2 className="section-title">Your journey, belt by belt</h2>
            <p className="section-lead">
              Starting is simple. Here's the path from your first free class to
              lifelong growth.
            </p>
          </Reveal>
          <div className="journey mt">
            {GETTING_STARTED.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="jstep">
                  <div className="jstep__belt" style={{ background: step.color }} />
                  <div className="jstep__n">
                    Step {i + 1} · {step.belt}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- You belong here + feature stories ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">You Belong Here</span>
            <h2 className="section-title">Martial arts for every age &amp; ability</h2>
            <p className="section-lead">
              Whether you want an exciting activity for your child or a motivating
              alternative to the gym, there's a place for you on our mat. No
              experience required — just show up ready to grow.
            </p>
          </Reveal>
          <div className="grid grid--3 mt">
            {[
              {
                title: "Children's Classes",
                text: 'Confidence, listening, discipline, respect, and friendships — the foundation for confident kids.',
                to: '/programs/children',
                icon: '🧒',
                cta: "Explore Children's Programs",
              },
              {
                title: 'Adult Classes',
                text: 'Fitness, self-defense, stress relief, and real community for every level.',
                to: '/programs/adult',
                icon: '💪',
                cta: 'Explore Adult Programs',
              },
              {
                title: 'Workshops & Special Events',
                text: 'Belt testing, tournaments, seminars, camps, and family events all year round.',
                to: '/just-4-kids',
                icon: '🎉',
                cta: 'See Just 4 Kids',
              },
            ].map((f, i) => (
              <Reveal as="article" key={f.title} delay={i * 80}>
                <Link to={f.to} className="pcard">
                  <div className="pcard__art" />
                  <div className="pcard__scrim" />
                  <span className="pcard__glyph" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div className="pcard__body">
                    <h3 className="pcard__title">{f.title}</h3>
                    <p className="pcard__text">{f.text}</p>
                    <span className="pcard__cta">
                      {f.cta} <span className="btn__arrow">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="section section--dark" id="reviews">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Reviews</span>
            <p className="feature-quote">"{TESTIMONIALS[0].quote}"</p>
            <p className="quote__by mt">
              {TESTIMONIALS[0].name}{' '}
              <span className="quote__role">— {TESTIMONIALS[0].role}</span>
            </p>
            <p className="ph-note mt-sm">
              Placeholder reviews · pending owner-approved testimonials
            </p>
          </Reveal>
          <div className="grid grid--2 mt-lg">
            {TESTIMONIALS.slice(1).map((t, i) => (
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

      {/* ---------- Locations ---------- */}
      <section className="section" id="locations">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our Schools</span>
            <h2 className="section-title">Visit a location near you</h2>
            <p className="section-lead">
              {locations.length} convenient Bergen County locations, with the same
              welcoming community at each.
            </p>
          </Reveal>
          <div className={`grid ${locations.length >= 3 ? 'grid--3' : 'grid--2'} mt`}>
            {locations.map((loc, i) => (
              <Reveal key={loc.id} delay={i * 90}>
                <LocationCard loc={loc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section--offwhite">
        <div className="container" style={{ maxWidth: '820px' }}>
          <Reveal>
            <span className="eyebrow">Good To Know</span>
            <h2 className="section-title">Questions parents &amp; new students ask</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta-banner">
              <div className="dojang" aria-hidden="true" />
              <h2>Confidence starts with one class</h2>
              <p>
                Beginners are welcome, no experience is required, and children and
                adults can both start today. The first step is simple.
              </p>
              <div className="flex-actions" style={{ justifyContent: 'center' }}>
                <Link to="/contact" className="btn btn--gold btn--lg">
                  {SITE.primaryCta} <span className="btn__arrow">→</span>
                </Link>
                <a href="tel:2019622922" className="btn btn--ghost btn--lg">
                  Call Allendale
                </a>
                <Link to="/programs/children" className="btn btn--ghost btn--lg">
                  Explore Programs
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
