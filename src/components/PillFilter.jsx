import { useState } from 'react';
import { motion } from 'framer-motion';
import './PillFilter.css';

const PILLS = [
  {
    id: 'volunteering',
    label: 'Volunteering',
    copy: 'Volunteering: opportunities to help run events and mentor students are posted here soon.',
  },
  {
    id: 'chapters',
    label: 'Our Chapters',
    copy: "Our Chapters: find a local STEMsters chapter near you — details coming soon.",
  },
  {
    id: 'curriculum',
    label: 'Curriculum',
    copy: 'Curriculum: browse the hands-on projects and lesson plans we teach — details coming soon.',
  },
];

export function PillFilter() {
  const [activeId, setActiveId] = useState(PILLS[2].id);
  const active = PILLS.find((pill) => pill.id === activeId);

  return (
    <div className="pill-filter">
      <div className="pill-group" role="tablist">
        {PILLS.map((pill) => (
          <motion.button
            key={pill.id}
            type="button"
            role="tab"
            aria-selected={pill.id === activeId}
            className={`pill ${pill.id === activeId ? 'pill-active' : ''}`}
            onClick={() => setActiveId(pill.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {pill.label}
          </motion.button>
        ))}
      </div>
      <p className="pill-panel">{active.copy}</p>
    </div>
  );
}
