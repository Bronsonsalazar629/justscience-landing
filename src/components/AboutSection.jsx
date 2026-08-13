import { motion } from 'framer-motion';
import './AboutSection.css';

const VALUES = [
  {
    title: 'Passion for Science',
    copy: 'We believe science should be accessible, exciting, and inspiring for everyone, regardless of background.',
  },
  {
    title: 'Community First',
    copy: 'We go directly to communities, meeting people where they are and building lasting relationships.',
  },
  {
    title: 'Hands-On Learning',
    copy: 'Interactive experiments and demonstrations make complex concepts easy to understand and remember.',
  },
  {
    title: 'Student Leadership',
    copy: 'Led by students, for the community - we understand the power of peer-to-peer learning.',
  },
];

export function AboutSection() {
  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Our Vision & Values</h2>
      <p>
        To make science education accessible, engaging, and inspiring by
        bringing hands-on learning experiences directly to communities
        across the country. We believe every child deserves the chance to
        fall in love with science.
      </p>
      <div className="value-grid">
        {VALUES.map((value) => (
          <div key={value.title} className="value-card">
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
