import Marquee from '../components/Marquee'
import SectionSeam from '../components/SectionSeam'
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
  TrustStrip,
} from './home'

/** Homepage composition — section implementations live in `src/pages/home/`. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee items={VALUES} />
      <TrustStrip />
      <ProgramDiscoverySection />
      <SectionSeam from="off-white" to="dark" />
      <BenefitsSection />
      <SectionSeam from="dark" to="graphite" variant="fade" />
      <StatsSection />
      <SectionSeam from="graphite" to="off-white" />
      <TrialSection />
      <SectionSeam from="off-white" to="dark" />
      <InstructorSection />
      <SectionSeam from="dark" to="graphite" variant="fade" />
      <BeltJourneySection />
      <SectionSeam from="graphite" to="off-white" />
      <AudienceSection />
      <SectionSeam from="off-white" to="dark" />
      <TestimonialsSection />
      <SectionSeam from="dark" to="off-white" />
      <LocationsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  )
}
