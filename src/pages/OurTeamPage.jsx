import './OurTeamPage.css';

const FOUNDERS = [
  { name: 'Ivan Leong', role: 'Founder', school: 'Northwestern University' },
  {
    name: 'Andrew Liu',
    role: 'Co-Founder',
    school: 'University of California, Berkeley',
  },
  { name: 'Ian Peng', role: 'Co-Founder', school: 'University of Pennsylvania' },
];

export function OurTeamPage() {
  return (
    <section className="our-team">
      <h1>Founding Team</h1>
      <p>
        JustScience began in 2023 when friends from Arcadia High School
        started hands-on projects for local programs. As more schools and
        students got involved, the work spread nationwide. Today, the
        founding team helps guide direction and scalability.
      </p>
      <div className="founder-grid">
        {FOUNDERS.map((founder) => (
          <div key={founder.name} className="founder-card">
            <h2>{founder.name}</h2>
            <p>{founder.role}</p>
            <p>{founder.school}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
