import { motion } from 'framer-motion';
import './QuoteSection.css';

export function QuoteSection() {
  return (
    <motion.section
      className="quote"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <blockquote>
        "Science is not meant to be kept in the lab; it's the toolbox for
        citizenship. To make it accessible is to empower every mind to
        question, understand, and shape the world they live in."
      </blockquote>
      <cite>— Tahmid H.</cite>
    </motion.section>
  );
}
