import { HeroSection } from '../components/HeroSection';
import { LogoStrip } from '../components/LogoStrip';
import { AboutSection } from '../components/AboutSection';
import { QuoteSection } from '../components/QuoteSection';
import { AcknowledgementsSection } from '../components/AcknowledgementsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
      <QuoteSection />
      <hr className="divider" />
      <AcknowledgementsSection />
    </>
  );
}
