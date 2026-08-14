import { motion } from 'framer-motion';
import './OurTeamPage.css';

const FOUNDERS = [
  {
    name: 'Tom Lan',
    role: 'Founder',
    bio: 'Started JustScience to bridge the gap between academic science and community engagement. Spends his free time submerged in chemicals and math/physics.',
    tags: ['Chemistry Demos', 'Program Development'],
  },
  {
    name: 'Bronson Salazar',
    role: '',
    bio: '[bio.]',
    tags: ['[tag.]'],
  },
];

export function OurTeamPage() {
  return (
    <motion.section
      className="our-team"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Founding Team</h1>
      <p>
        We’re a diverse group of passionate students from various scientific
        disciplines, united by our mission to make science accessible and
        exciting for everyone.
      </p>
      <div className="founder-grid">
        {FOUNDERS.map((founder) => (
          <div key={founder.name} className="founder-card">
            <div
              className="founder-photo"
              role="img"
              aria-label={`${founder.name} photo placeholder`}
            />
            <h2>{founder.name}</h2>
            <p className="founder-role">{founder.role}</p>
            <p className="founder-bio">{founder.bio}</p>
            <ul className="founder-tags">
              {founder.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
