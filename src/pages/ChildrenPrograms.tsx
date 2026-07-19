import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import OptimizedImage from '../components/OptimizedImage'
import CtaBanner from '../components/CtaBanner'
import PageHero from '../components/PageHero'
import Faq from '../components/Faq'
import ProgramCard from '../components/ProgramCard'
import SectionHeading from '../components/SectionHeading'
import SectionSeam from '../components/SectionSeam'
import LeadForm from '../components/LeadForm'
import InfoCallout from '../components/InfoCallout'
import JsonLd from '../components/JsonLd'
import {
  CHILDREN_ENROLLMENT_STEPS,
  CHILDREN_PROGRAMS,
  FAQS,
  IMAGE_DIMENSIONS,
  IMAGES,
  PROGRAM_GLYPHS,
  childrenFreeClassHref,
  formatVisibleLocationList,
  getVisibleLocations,
  locationCtaPath,
  imageSrcSetFor,
} from '../data/site'
import { absoluteUrl } from '../config/siteUrl'

const LEARN = [
  'Focus & listening skills that carry into the classroom',
  'Confidence to try, fail, and try again',
  'Respect for instructors, teammates, and family',
  'Coordination, balance, and healthy movement',
  'Goal setting through the belt curriculum',
  'Practical, age-appropriate self-defense',
]

function childrenStructuredData() {
  const locations = getVisibleLocations()
  const pageUrl = absoluteUrl('/programs/children')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: "Children's Martial Arts Programs | United Black Belt Academy",
      description: `Age-specific children’s martial arts programs at United Black Belt Academy in ${formatVisibleLocationList({ style: 'and', withState: true })}.`,
      url: pageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'United Black Belt Academy',
        url: absoluteUrl('/'),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: "Children's Martial Arts Programs",
      itemListElement: CHILDREN_PROGRAMS.map((program, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Course',
          name: program.title,
          description: program.blurb,
          provider: {
            '@type': 'SportsActivityLocation',
            name: 'United Black Belt Academy',
            areaServed: locations.map((loc) => `${loc.name}, NJ`),
          },
          ...(program.ages
            ? {
                educationalLevel: program.ages,
              }
            : {}),
          url: absoluteUrl(`/programs/${program.slug}`),
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.slice(0, 4).map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ]
}

export default function ChildrenPrograms() {
  const locations = getVisibleLocations()
  const locationList = formatVisibleLocationList({ style: 'and' })
  const structuredData = childrenStructuredData()

  return (
    <>
      <JsonLd id="children-programs" data={structuredData} />

      <PageHero
        family="program"
        crumbs={[{ label: 'Home', to: '/' }, { label: "Children's Programs" }]}
        title="Children's Martial Arts Programs"
        intro={`Confidence, focus, discipline, and respect — built one class at a time. Age-specific Taekwondo for kids and teens at our ${locationList} schools.`}
      >
        <div className="flex-actions">
          <a href="#free-class" className="btn btn--blue">
            Schedule a Free Class <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
          <a href="#programs" className="btn btn--outline">
            Choose an Age Group
          </a>
        </div>
      </PageHero>

      <SectionSeam from="dark" to="off-white" variant="angle" />

      <section
        className="section section--compact enroll-strip"
        aria-labelledby="enroll-strip-title"
      >
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Getting Started"
              title={<span id="enroll-strip-title">Three simple steps to start</span>}
              lead="From choosing the right age group to stepping onto the mat — here’s how enrollment works."
            />
          </Reveal>
          <ol className="enroll-strip__steps mt">
            {CHILDREN_ENROLLMENT_STEPS.map((step, index) => (
              <li key={step.title} className="enroll-strip__step">
                <span className="enroll-strip__num" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="enroll-strip__copy">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                {index < CHILDREN_ENROLLMENT_STEPS.length - 1 ? (
                  <span className="enroll-strip__connector" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="programs" aria-labelledby="programs-heading">
        <div className="container program-overview__grid">
          <Reveal>
            <SectionHeading
              eyebrow="Age-Specific Classes"
              title={<span id="programs-heading">Find the right program</span>}
              lead="Each curriculum is designed for your child’s stage of development — pick a program, then schedule a free introductory class."
            />
          </Reveal>
          <div className="grid grid--3 mt">
            {CHILDREN_PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.id} delay={i * 90}>
                <ProgramCard
                  title={p.title}
                  text={p.blurb}
                  ages={p.ages}
                  image={p.image}
                  glyph={PROGRAM_GLYPHS[p.id]}
                  to={childrenFreeClassHref({ program: p.slug })}
                  ctaLabel={`Try ${p.title}`}
                  titleAs="h2"
                />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="enroll-strip__detail-links mt">
              Prefer to read more first?{' '}
              {CHILDREN_PROGRAMS.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && (i === CHILDREN_PROGRAMS.length - 1 ? ', or ' : ', ')}
                  <Link to={`/programs/${p.slug}`}>{p.title}</Link>
                </span>
              ))}
              .
            </p>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" variant="belt" />

      <section className="section section--dark" aria-labelledby="learn-heading">
        <div className="dojang" aria-hidden="true" />
        <div className="container split interior-split">
          <Reveal>
            <SectionHeading
              eyebrow="What Students Learn"
              title={<span id="learn-heading">More than kicks &amp; punches</span>}
              lead="Every children's class blends high-energy fun with skills that support school, friendships, and family life — without promising specific grades or outcomes. Students practice focus, respect, and healthy movement in a welcoming dojang."
            />
            <ul className="checklist mt">
              {LEARN.map((l) => (
                <li key={l} style={{ color: 'var(--muted-light)' }}>
                  {l}
                </li>
              ))}
            </ul>
            <div className="flex-actions mt">
              <a href="#free-class" className="btn btn--blue">
                Schedule a Free Class <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <figure className="interior-media interior-media--wide interior-media--focus-center">
              <div className="interior-media__veil" aria-hidden="true" />
              <OptimizedImage
                src={IMAGES.kidsGroup}
                alt="Young martial arts students practicing punches together in class"
                width={IMAGE_DIMENSIONS.kidsGroup.width}
                height={IMAGE_DIMENSIONS.kidsGroup.height}
                srcSet={imageSrcSetFor(IMAGES.kidsGroup)}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="dark" to="off-white" variant="fade" />

      <section className="section" aria-labelledby="access-heading">
        <div className="container">
          <Reveal>
            <InfoCallout
              eyebrow="Individualized Instruction"
              title="Support tailored to your child"
              titleId="access-heading"
              ariaLabel="Individualized instruction options"
              ctaTo="/contact"
              ctaLabel="Ask About Individualized Instruction"
            >
              <p>
                Individualized instruction options may be available for students who
                benefit from additional support. Contact the academy to discuss your
                child’s needs and current availability.
              </p>
            </InfoCallout>
          </Reveal>
        </div>
      </section>

      <section
        className="section section--offwhite"
        id="locations"
        aria-labelledby="locations-heading"
      >
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Our Academies"
              title={<span id="locations-heading">Choose a location</span>}
              lead={`Train at the school that fits your family — ${locationList}.`}
            />
          </Reveal>
          <div className="flex-actions enroll-strip__locations mt" role="group" aria-label="Academy locations">
            {locations.map((loc) => (
              <Link
                key={loc.id}
                to={locationCtaPath(loc)}
                className="btn btn--outline"
              >
                {loc.name}
                {loc.isNew ? ' (New)' : ''}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionSeam from="off-white" to="off-white" variant="line" />

      <section className="section section--offwhite" aria-labelledby="faq-heading">
        <div className="container interior-faq">
          <Reveal>
            <SectionHeading
              eyebrow="Parent FAQs"
              title={<span id="faq-heading">What parents ask us most</span>}
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt">
              <Faq items={FAQS} />
            </div>
          </Reveal>
        </div>
      </section>

      <SectionSeam from="off-white" to="dark" variant="angle" />

      <section
        className="section section--dark children-free-class"
        id="free-class"
        aria-labelledby="free-class-heading"
      >
        <div className="dojang" aria-hidden="true" />
        <div className="container split interior-split children-free-class__grid">
          <Reveal>
            <figure className="interior-media interior-media--wide interior-media--focus-top">
              <div className="interior-media__veil" aria-hidden="true" />
              <OptimizedImage
                src={IMAGES.kidsKicks}
                alt="Children practicing high kicks during a martial arts class at United Black Belt Academy"
                width={IMAGE_DIMENSIONS.kidsKicks.width}
                height={IMAGE_DIMENSIONS.kidsKicks.height}
                srcSet={imageSrcSetFor(IMAGES.kidsKicks)}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </figure>
            <ul className="checklist children-free-class__reassure mt">
              <li style={{ color: 'var(--muted-light)' }}>No prior experience required</li>
              <li style={{ color: 'var(--muted-light)' }}>Beginner-friendly classes</li>
              <li style={{ color: 'var(--muted-light)' }}>No obligation to enroll</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Free Introductory Class"
              title={
                <span id="free-class-heading">
                  Schedule Your Child&apos;s Free Introductory Class
                </span>
              }
              lead="Choose a program and academy location. Our team will contact you to help schedule a class and answer any questions."
            />
            <div className="mt">
              <LeadForm submitLabel="Schedule a Free Class" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Ready for your child’s first class?"
        text={`Book a complimentary introductory class for Tiny Tigers, Junior Tigers, or Teen Martial Arts at ${locationList} — beginners welcome.`}
        primaryTo="#free-class"
        primaryLabel="Schedule a Free Class"
        secondaryTo="#locations"
        secondaryLabel="Choose a Location"
      />
    </>
  )
}
