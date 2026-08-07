import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NavDropdown } from './NavDropdown';
import { Button } from './Button';
import './Header.css';

const ABOUT_ITEMS = [
  { label: 'Our Mission', path: '/our-mission' },
  { label: 'Our Team', path: '/our-team' },
  { label: 'FAQ', path: '/faq' },
];

const GET_INVOLVED_ITEMS = [
  { label: 'Start a Chapter', path: '/start-a-chapter' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Sponsor Us', path: '/sponsor' },
  { label: 'Request a Visit', path: '/request-a-visit' },
  { label: 'Donate Now', path: '/donate' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-bar">
        <Logo />
        <button
          type="button"
          className="header-hamburger"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
        <nav className={`header-nav ${mobileOpen ? 'header-nav-open' : ''}`}>
          <Link to="/" className="header-nav-link">
            Home
          </Link>
          <NavDropdown label="About" items={ABOUT_ITEMS} />
          <Link to="/our-chapters" className="header-nav-link">
            Our Chapters
          </Link>
          <Link to="/programs" className="header-nav-link">
            Programs
          </Link>
          <Link to="/gallery" className="header-nav-link">
            Gallery
          </Link>
          <NavDropdown label="Get Involved" items={GET_INVOLVED_ITEMS} />
          <Link to="/volunteer-hours" className="header-nav-link">
            Volunteer Hours
          </Link>
        </nav>
        <div className="header-actions">
          <Button variant="outline">Contact Us</Button>
          <span className="header-avatar" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
