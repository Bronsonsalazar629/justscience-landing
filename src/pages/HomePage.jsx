import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ImpactSection } from '../components/ImpactSection';
import { QuoteSection } from '../components/QuoteSection';
import { AcknowledgementsSection } from '../components/AcknowledgementsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <hr className="divider" />
      <ImpactSection />
      <QuoteSection />
      <hr className="divider" />
      <AcknowledgementsSection />
    </>
  );
}
