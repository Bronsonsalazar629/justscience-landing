import { AnimatedContent } from './AnimatedContent';
import './QuoteSection.css';

export function QuoteSection() {
  return (
    <AnimatedContent as="section" className="quote">
      <blockquote>
        "Science is not meant to be kept in the lab; it's the toolbox for
        citizenship. To make it accessible is to empower every mind to
        question, understand, and shape the world they live in."
      </blockquote>
      <cite>— Tahmid H.</cite>
    </AnimatedContent>
  );
}
