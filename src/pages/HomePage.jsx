import { HeroSection } from '../components/HeroSection';
import { LogoStrip } from '../components/LogoStrip';
import { AboutSection } from '../components/AboutSection';
import { ImpactSection } from '../components/ImpactSection';
import { QuoteSection } from '../components/QuoteSection';
import { AcknowledgementsSection } from '../components/AcknowledgementsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
      <hr className="divider" />
      <ImpactSection />
      <QuoteSection />
      <hr className="divider" />
      <AcknowledgementsSection />
    </>
  );
}
