import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './NavDropdown.css';

const ITEMS = ['Our Mission', 'Our Team', 'FAQ'];

export function NavDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="nav-dropdown" ref={ref}>
      <motion.button
        type="button"
        className="nav-dropdown-trigger"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        About ▾
      </motion.button>
      {open && (
        <ul className="nav-dropdown-menu" role="menu">
          {ITEMS.map((item) => (
            <li key={item} role="menuitem">
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
