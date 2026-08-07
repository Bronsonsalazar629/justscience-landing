import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/our-mission' },
  { label: 'Our Chapters', path: '/our-chapters' },
  { label: 'Programs', path: '/programs' },
  { label: 'Start a Chapter', path: '/start-a-chapter' },
  { label: 'Volunteer Hours', path: '/volunteer-hours' },
  { label: 'Contact', path: '/contact' },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <h2>Quick Links</h2>
        <nav>
          {QUICK_LINKS.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-info">
        <p>600 S San Gabriel Blvd, San Gabriel, CA 91776</p>
        <p>contact@justscience.org</p>
        <p className="footer-copyright">
          Copyright © 2026 JustScience - All rights reserved
        </p>
      </div>
    </footer>
  );
}
