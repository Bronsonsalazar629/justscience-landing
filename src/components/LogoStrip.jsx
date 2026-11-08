import { AnimatedContent } from './AnimatedContent';
import './LogoStrip.css';

const PLACEHOLDER_COUNT = 6;

export function LogoStrip() {
  return (
    <AnimatedContent
      as="section"
      className="logo-strip"
      aria-label="Partner logos placeholder"
    >
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div key={i} className="logo-strip-item" />
      ))}
    </AnimatedContent>
  );
}
