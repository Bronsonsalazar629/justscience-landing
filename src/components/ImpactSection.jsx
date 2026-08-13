import { motion } from 'framer-motion';
import './ImpactSection.css';

const STATS = [
  { value: '20', label: 'Students Reached', copy: 'Children and teens engaged through our programs' },
  { value: '1', label: 'Communities Visited', copy: 'Schools, libraries, and community centers' },
  { value: '100%', label: 'Positive Feedback', copy: 'Of participants say they love science more' },
  { value: '2', label: 'Experiments Performed', copy: 'Different hands-on activities demonstrated' },
  { value: '0', label: 'Awards Won', copy: 'Recognition for our community impact' },
  { value: '5', label: 'Active Volunteers', copy: 'Passionate students making a difference' },
];

export function ImpactSection() {
  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Our Impact</h2>
      <p>
        Numbers tell a story, but the real impact is in the curiosity we
        spark and the passion for learning we ignite in every community we
        visit.
      </p>
      <div className="value-grid">
        {STATS.map((stat) => (
          <div key={stat.label} className="value-card impact-card">
            <p className="impact-value">{stat.value}</p>
            <h3>{stat.label}</h3>
            <p>{stat.copy}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
