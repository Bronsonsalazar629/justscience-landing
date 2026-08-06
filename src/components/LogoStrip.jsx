import { motion } from 'framer-motion';
import './LogoStrip.css';

const PLACEHOLDER_COUNT = 6;

export function LogoStrip() {
  return (
    <motion.section
      className="logo-strip"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      aria-label="Partner logos placeholder"
    >
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div key={i} className="logo-strip-item" />
      ))}
    </motion.section>
  );
}
