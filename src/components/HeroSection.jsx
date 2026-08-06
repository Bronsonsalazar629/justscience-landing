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
        <h1>Sparking imagination &amp; innovation one experiment at a time</h1>
        <div className="hero-buttons">
          <Button variant="primary">Learn More</Button>
          <Button variant="outline">Contact</Button>
        </div>
        <p>
          Join our mission to ignite curiosity and creativity through
          hands-on STEM projects today!
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
