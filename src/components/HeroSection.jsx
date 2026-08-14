import { motion } from 'framer-motion';
import { Button } from './Button';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.3, ease: 'easeOut' }}
        >
          Spreading the Love of Science
        </motion.h1>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
        >
          <Button variant="liquid" href="#/our-mission">Learn More</Button>
          <Button variant="liquid">Contact</Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p>
            Simplifying science and innovation to make education accessible
            and engaging
          </p>
          <p>
            We're a passionate group of students bringing hands-on science
            experiences directly to communities, inspiring the next
            generation of scientists and innovators.
          </p>
        </motion.div>
      </div>
      <div
        className="hero-placeholder"
        role="img"
        aria-label="Hero illustration placeholder"
      >
        Illustration placeholder
      </div>
    </section>
  );
}
