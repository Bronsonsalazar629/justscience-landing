import { AnimatedContent } from '../components/AnimatedContent';
import { QuoteSection } from '../components/QuoteSection';
import './OurMissionPage.css';

export function OurMissionPage() {
  return (
    <section className="our-mission">
      <AnimatedContent as="h1">Our Mission</AnimatedContent>
      <AnimatedContent as="div" className="mission-intro">
        <p>To show that gaining valuable STEM education does not require immense effort.</p>
        <p>
          <strong>JustScience</strong> aims to alleviate the barriers in STEM
          while ensuring that obscure concepts are simplified to engage and
          inspire future generations.
        </p>
      </AnimatedContent>
      <QuoteSection />
    </section>
  );
}
