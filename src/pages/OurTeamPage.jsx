import { AnimatedContent } from '../components/AnimatedContent';
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
  {
    name: 'Murtadha Jodhari',
    role: '',
    bio: 'Growing up in a rural town in South Dakota, I experienced firsthand how access to STEM opportunities can be limited compared to larger cities. Through Just Science, I hope to help make hands-on STEM experiences more accessible to young students and inspire the curiosity that can shape their future. I believe every child deserves the opportunity to discover a passion for science, regardless of where they live.',
    tags: [],
  },
];

export function OurTeamPage() {
  return (
    <AnimatedContent as="section" className="our-team">
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
    </AnimatedContent>
  );
}
