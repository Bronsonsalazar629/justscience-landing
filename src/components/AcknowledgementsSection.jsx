import { motion } from 'framer-motion';
import cmuCenterLogo from '../assets/cmu-center.png';
import './AcknowledgementsSection.css';

export function AcknowledgementsSection() {
  return (
    <motion.section
      className="acknowledgements"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Acknowledgements</h2>
      <img
        src={cmuCenterLogo}
        alt="Carnegie Mellon University Center for Student Diversity and Inclusion"
        className="acknowledgements-logo"
      />
    </motion.section>
  );
}
