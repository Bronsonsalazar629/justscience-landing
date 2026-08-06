import { useState } from 'react';
import { Logo } from './Logo';
import { NavDropdown } from './NavDropdown';
import { Button } from './Button';
import './Header.css';

const NAV_LINKS = ['Home', 'Our Chapters', 'Volunteer Hours'];

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
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="header-nav-link">
              {link}
            </a>
          ))}
          <NavDropdown />
        </nav>
        <div className="header-actions">
          <Button variant="outline">Contact Us</Button>
          <span className="header-avatar" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
