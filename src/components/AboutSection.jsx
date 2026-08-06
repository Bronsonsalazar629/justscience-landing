import { motion } from 'framer-motion';
import { PillFilter } from './PillFilter';
import './AboutSection.css';

export function AboutSection() {
  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>What is STEMsters?</h2>
      <p>
        Discover more about STEMsters and our mission to inspire young minds
        through interactive STEM education!
      </p>
      <PillFilter />
    </motion.section>
  );
}
