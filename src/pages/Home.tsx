import Marquee from '../components/Marquee'
import SectionSeam from '../components/SectionSeam'
import { VALUES } from '../data/site'
import {
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
      <SectionSeam from="off-white" to="dark" variant="angle" />
      <BenefitsSection />
      <SectionSeam from="dark" to="graphite" variant="fade" />
      <StatsSection />
      <SectionSeam from="graphite" to="off-white" variant="belt" />
      <TrialSection />
      <SectionSeam from="off-white" to="dark" variant="line" />
      <InstructorSection />
      <SectionSeam from="dark" to="graphite" variant="fade" />
      <BeltJourneySection />
      <SectionSeam from="graphite" to="dark" variant="wave" />
      <TestimonialsSection />
      <SectionSeam from="dark" to="off-white" variant="belt" />
      <FaqSection />
      <LocationsSection />
      <FinalCtaSection />
    </>
  )
}
