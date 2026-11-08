import { motion } from 'framer-motion';
import { Button } from './Button';
import './HeroSection.css';

const TITLE = 'Spreading the Love of Science';

const titleVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.3, staggerChildren: 0.08 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-text">
        <motion.h1
          aria-label={TITLE}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {TITLE.split(' ').map((word) => (
            <motion.span
              key={word}
              className="hero-title-word"
              variants={wordVariants}
              aria-hidden="true"
            >
              {word}
            </motion.span>
          ))}
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
