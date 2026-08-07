import './OurTeamPage.css';

const FOUNDERS = [
  {
    name: 'Tom Lan',
    role: 'Founder',
    bio: 'Started JustScience to bridge the gap between academic science and community engagement. Spends his free time submerged in chemicals and math/physics.',
    tags: ['Chemistry Demos', 'Program Development'],
  },
  {
    name: 'Engjell Dosti',
    role: 'Founder',
    bio: 'Started JustScience to "Grow my passion for stem inspired to me by my teacher Dr. St. Juste, and I want to share this world of intricate problems with little kids aspiring to be scientists. PS. I\'m a marathoner"',
    tags: ['Physics', 'Marathon Running'],
  },
];

export function OurTeamPage() {
  return (
    <section className="our-team">
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
    </section>
  );
}
