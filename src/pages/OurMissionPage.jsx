import { motion } from 'framer-motion';
import { QuoteSection } from '../components/QuoteSection';
import './OurMissionPage.css';

export function OurMissionPage() {
  return (
    <section className="our-mission">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Our Mission
      </motion.h1>
      <motion.div
        className="mission-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <p>To show that gaining valuable STEM education does not require immense effort.</p>
        <p>
          <strong>JustScience</strong> aims to alleviate the barriers in STEM
          while ensuring that obscure concepts are simplified to engage and
          inspire future generations.
        </p>
      </motion.div>
      <QuoteSection />
    </section>
  );
}
