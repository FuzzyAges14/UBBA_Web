import Marquee from '../components/Marquee'
import { VALUES } from '../data/site'
import {
  AudienceSection,
  BeltJourneySection,
  BenefitsSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  InstructorSection,
  LocationsSection,
  ProgramDiscoverySection,
  StatsSection,
  TestimonialsSection,
  TrialSection,
} from './home'

/** Homepage composition — section implementations live in `src/pages/home/`. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee items={VALUES} />
      <ProgramDiscoverySection />
      <BenefitsSection />
      <StatsSection />
      <TrialSection />
      <InstructorSection />
      <BeltJourneySection />
      <AudienceSection />
      <TestimonialsSection />
      <LocationsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
