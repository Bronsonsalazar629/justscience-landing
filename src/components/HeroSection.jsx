import { motion } from 'framer-motion';
import { Button } from './Button';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="hero">
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Spreading the Love of Science</h1>
        <div className="hero-buttons">
          <Button variant="primary" href="#/our-mission">Learn More</Button>
          <Button variant="outline">Contact</Button>
        </div>
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
