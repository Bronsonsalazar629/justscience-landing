import { AnimatedContent } from './AnimatedContent';
import cmuCenterLogo from '../assets/cmu-center.png';
import './AcknowledgementsSection.css';

export function AcknowledgementsSection() {
  return (
    <AnimatedContent as="section" className="acknowledgements">
      <h2>Acknowledgements</h2>
      <img
        src={cmuCenterLogo}
        alt="Carnegie Mellon University Center for Student Diversity and Inclusion"
        className="acknowledgements-logo"
      />
    </AnimatedContent>
  );
}
