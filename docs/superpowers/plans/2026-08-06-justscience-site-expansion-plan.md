# JustScience Site Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the JustScience single-page site into a routed multi-page site: 13 new routes, a restructured header nav with a second dropdown, a sitewide footer, and two new homepage sections.

**Architecture:** Add `react-router-dom`. `Header` and a new `Footer` move into a `Layout` component (`<Header/><Outlet/><Footer/>`) wrapping every route. Eight content-less pages share one `PlaceholderPage` component instead of eight near-identical files. `NavDropdown` is generalized (label/items props) so it can back both the existing "About" menu and a new "Get Involved" menu.

**Tech Stack:** React + Vite + react-router-dom + framer-motion (existing) + CSS custom-property tokens (existing) + Vitest/RTL (existing).

## Global Constraints

- New dependency: `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`, `Outlet`). No other routing library.
- All copy is given verbatim in this plan's task steps — use it exactly, do not paraphrase.
- Color/spacing/font values come from `src/styles/tokens.css` via `var(--token-name)` only — never hardcode a hex/px value that has a token equivalent (matches every prior task in this project).
- Any component that renders a `Link` or a `NavDropdown` (directly or via `Header`/`Footer`/`Layout`) needs its test wrapped in `MemoryRouter` from `react-router-dom`, or it throws at render time. Components that don't touch routing (e.g. `QuoteSection`, `PlaceholderPage`, `FAQPage`) don't need this.
- Environment: this project's working directory is a WSL filesystem mounted as a Windows UNC path. Run npm/node/vite/vitest commands through `wsl.exe -e bash -lc '<cmd>'`; use plain Bash for git commands (a prior task found the worktree's `.git` file isn't resolvable from real WSL — plain Bash git works fine).
- "JustScience" is the site's name throughout — never "STEMsters" in any new copy, including the Start a Chapter page's mention of "your new JustScience chapter" (the original pasted content said "STEMsters chapter").
- No real content exists yet for: Our Chapters, Programs, Volunteer, Sponsor Us, Request a Visit, Donate Now, Contact (beyond address/email), Volunteer Hours, Gallery images, or FAQ answers. Don't invent any — use exactly the placeholder copy given in each task.

---

### Task 1: Add react-router-dom and wrap the app in BrowserRouter

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `src/main.jsx`

**Interfaces:**
- Produces: the whole app tree is inside a `BrowserRouter`, so any descendant can use `Link`, `useNavigate`, `Routes`, etc.

- [ ] **Step 1: Install react-router-dom**

```bash
wsl.exe -e bash -lc 'cd /home/bronson/tom && npm install react-router-dom'
```

- [ ] **Step 2: Wrap the app in BrowserRouter**

`src/main.jsx`:
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 3: Verify the app still builds and the dev server boots**

```bash
wsl.exe -e bash -lc 'cd /home/bronson/tom && npm run build'
```

Expected: builds with no errors. (No behavior change yet — `App.jsx` doesn't use routing until Task 15.)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/main.jsx
git commit -m "chore: add react-router-dom and wrap app in BrowserRouter"
```

---

### Task 2: Generalize NavDropdown to accept label/items props

**Files:**
- Modify: `src/components/NavDropdown.jsx`
- Modify: `src/components/NavDropdown.test.jsx`

**Interfaces:**
- Consumes: `react-router-dom`'s `Link` (Task 1).
- Produces: `NavDropdown` now takes `{ label: string, items: Array<{ label: string, path: string }> }` — no longer hardcoded to "About" with fixed items. `import { NavDropdown } from './NavDropdown'`.

- [ ] **Step 1: Write the failing tests**

`src/components/NavDropdown.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavDropdown } from './NavDropdown';

const ITEMS = [
  { label: 'Our Mission', path: '/our-mission' },
  { label: 'Our Team', path: '/our-team' },
  { label: 'FAQ', path: '/faq' },
];

function renderDropdown(children = null) {
  return render(
    <MemoryRouter>
      <NavDropdown label="About" items={ITEMS} />
      {children}
    </MemoryRouter>
  );
}

describe('NavDropdown', () => {
  it('is closed by default', () => {
    renderDropdown();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu on trigger click, with all items as links', async () => {
    renderDropdown();
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Our Mission').closest('a')).toHaveAttribute('href', '/our-mission');
    expect(screen.getByText('Our Team').closest('a')).toHaveAttribute('href', '/our-team');
    expect(screen.getByText('FAQ').closest('a')).toHaveAttribute('href', '/faq');
  });

  it('closes the menu when clicking outside', async () => {
    renderDropdown(<button>Outside</button>);
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape', async () => {
    renderDropdown();
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on Enter when the trigger is focused', async () => {
    renderDropdown();
    await userEvent.tab();
    expect(screen.getByText('About ▾')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders a different label and item set for a second instance', async () => {
    render(
      <MemoryRouter>
        <NavDropdown
          label="Get Involved"
          items={[{ label: 'Donate Now', path: '/donate' }]}
        />
      </MemoryRouter>
    );
    await userEvent.click(screen.getByText('Get Involved ▾'));
    expect(screen.getByText('Donate Now').closest('a')).toHaveAttribute('href', '/donate');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- NavDropdown'`
Expected: FAIL — current `NavDropdown` ignores props and renders hardcoded "About ▾" / plain `<a href="#">` items.

- [ ] **Step 3: Generalize the component**

`src/components/NavDropdown.jsx`:
```jsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './NavDropdown.css';

export function NavDropdown({ label, items }) {
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
        {label} ▾
      </motion.button>
      {open && (
        <ul className="nav-dropdown-menu" role="menu">
          {items.map((item) => (
            <li key={item.path} role="menuitem">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

`src/components/NavDropdown.css` is unchanged — no edits needed (the `.nav-dropdown-menu li a` selector already matches `Link`'s rendered `<a>`).

- [ ] **Step 4: Run the tests to verify they pass**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- NavDropdown'`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/NavDropdown.jsx src/components/NavDropdown.test.jsx
git commit -m "refactor: generalize NavDropdown to accept label/items props"
```

---

### Task 3: PlaceholderPage component

**Files:**
- Create: `src/components/PlaceholderPage.jsx`
- Create: `src/components/PlaceholderPage.css`
- Create: `src/components/PlaceholderPage.test.jsx`

**Interfaces:**
- Produces: `PlaceholderPage` — `import { PlaceholderPage } from './PlaceholderPage'` — props `{ title: string, children?: ReactNode }`. Renders `title` as an `<h1>`, a fixed coming-soon message, then optional `children` below (used by the Contact route in Task 15 to add address/email).

- [ ] **Step 1: Write the failing tests**

`src/components/PlaceholderPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlaceholderPage } from './PlaceholderPage';

describe('PlaceholderPage', () => {
  it('renders the title and coming-soon message', () => {
    render(<PlaceholderPage title="Programs" />);
    expect(screen.getByText('Programs')).toBeInTheDocument();
    expect(
      screen.getByText('This page is coming soon — check back for updates!')
    ).toBeInTheDocument();
  });

  it('renders optional children below the message', () => {
    render(
      <PlaceholderPage title="Contact">
        <p>Extra info</p>
      </PlaceholderPage>
    );
    expect(screen.getByText('Extra info')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- PlaceholderPage'`
Expected: FAIL — `PlaceholderPage.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/PlaceholderPage.jsx`:
```jsx
import './PlaceholderPage.css';

export function PlaceholderPage({ title, children }) {
  return (
    <section className="placeholder-page">
      <h1>{title}</h1>
      <p>This page is coming soon — check back for updates!</p>
      {children}
    </section>
  );
}
```

`src/components/PlaceholderPage.css`:
```css
.placeholder-page {
  padding: var(--space-8) var(--space-7);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.placeholder-page h1 {
  font-size: var(--text-h2);
}

.placeholder-page p {
  font-size: var(--text-body);
  color: var(--color-text-primary);
  max-width: 480px;
  margin: 0;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- PlaceholderPage'`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/PlaceholderPage.jsx src/components/PlaceholderPage.css src/components/PlaceholderPage.test.jsx
git commit -m "feat: add PlaceholderPage component"
```

---

### Task 4: Footer component

**Files:**
- Create: `src/components/Footer.jsx`
- Create: `src/components/Footer.css`
- Create: `src/components/Footer.test.jsx`

**Interfaces:**
- Consumes: `react-router-dom`'s `Link`.
- Produces: `Footer` — `import { Footer } from './Footer'` — no props.

- [ ] **Step 1: Write the failing test**

`src/components/Footer.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders Quick Links, address, email, and copyright', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Start a Chapter').closest('a')).toHaveAttribute(
      'href',
      '/start-a-chapter'
    );
    expect(
      screen.getByText('600 S San Gabriel Blvd, San Gabriel, CA 91776')
    ).toBeInTheDocument();
    expect(screen.getByText('contact@justscience.org')).toBeInTheDocument();
    expect(
      screen.getByText('Copyright © 2026 JustScience - All rights reserved')
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Footer'`
Expected: FAIL — `Footer.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/Footer.jsx`:
```jsx
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
```

`src/components/Footer.css`:
```css
.footer {
  background: var(--color-bg-hero);
  padding: var(--space-7) var(--space-6);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-6);
}

.footer-links h2 {
  font-size: var(--text-nav);
  margin: 0 0 var(--space-3);
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.footer-links nav a {
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: var(--text-nav);
}

.footer-info p {
  margin: 0 0 var(--space-2);
  font-size: var(--text-nav);
  color: var(--color-text-primary);
}

.footer-copyright {
  opacity: 0.8;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Footer'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx src/components/Footer.css src/components/Footer.test.jsx
git commit -m "feat: add Footer component"
```

---

### Task 5: Layout component

**Files:**
- Create: `src/layouts/Layout.jsx`
- Create: `src/layouts/Layout.test.jsx`

**Interfaces:**
- Consumes: `Header` (existing, will be restructured in Task 6 but usable now), `Footer` (Task 4), `react-router-dom`'s `Outlet`.
- Produces: `Layout` — `import { Layout } from './layouts/Layout'` — no props, rendered as a parent `<Route element={<Layout />}>` wrapping child routes (Task 15).

- [ ] **Step 1: Write the failing test**

`src/layouts/Layout.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders the header, the routed page content, and the footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<div>Page content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Layout'`
Expected: FAIL — `Layout.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/layouts/Layout.jsx`:
```jsx
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Layout'`
Expected: PASS.

Note: this test currently exercises the *existing* `Header` (still hardcoded `href="#"` links, single "About ▾" dropdown) — that's expected until Task 6. The assertion only checks for "Contact Us" (present in Header regardless of its internal nav structure), so it doesn't need updating when Task 6 lands.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.jsx src/layouts/Layout.test.jsx
git commit -m "feat: add Layout component (Header + Outlet + Footer)"
```

---

### Task 6: Restructure Header — real routes, two dropdowns

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.test.jsx`

**Interfaces:**
- Consumes: `NavDropdown` (Task 2, generalized), `react-router-dom`'s `Link`.
- Produces: `Header` unchanged externally (`import { Header } from './Header'`, no props) but internally renders real `Link`s and two `NavDropdown` instances ("About" and "Get Involved") instead of one hardcoded one.

- [ ] **Step 1: Write the failing tests**

`src/components/Header.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe('Header', () => {
  it('renders all top-level nav links and both dropdown triggers', () => {
    renderHeader();
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Our Chapters').closest('a')).toHaveAttribute(
      'href',
      '/our-chapters'
    );
    expect(screen.getByText('Programs').closest('a')).toHaveAttribute('href', '/programs');
    expect(screen.getByText('Gallery').closest('a')).toHaveAttribute('href', '/gallery');
    expect(screen.getByText('Volunteer Hours').closest('a')).toHaveAttribute(
      'href',
      '/volunteer-hours'
    );
    expect(screen.getByText('About ▾')).toBeInTheDocument();
    expect(screen.getByText('Get Involved ▾')).toBeInTheDocument();
  });

  it('the About dropdown links to Our Mission, Our Team, and FAQ', async () => {
    renderHeader();
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByText('Our Mission').closest('a')).toHaveAttribute('href', '/our-mission');
    expect(screen.getByText('Our Team').closest('a')).toHaveAttribute('href', '/our-team');
    expect(screen.getByText('FAQ').closest('a')).toHaveAttribute('href', '/faq');
  });

  it('the Get Involved dropdown links to all 5 items', async () => {
    renderHeader();
    await userEvent.click(screen.getByText('Get Involved ▾'));
    expect(screen.getByText('Start a Chapter').closest('a')).toHaveAttribute(
      'href',
      '/start-a-chapter'
    );
    expect(screen.getByText('Volunteer').closest('a')).toHaveAttribute('href', '/volunteer');
    expect(screen.getByText('Sponsor Us').closest('a')).toHaveAttribute('href', '/sponsor');
    expect(screen.getByText('Request a Visit').closest('a')).toHaveAttribute(
      'href',
      '/request-a-visit'
    );
    expect(screen.getByText('Donate Now').closest('a')).toHaveAttribute('href', '/donate');
  });

  it('renders the Contact Us button', () => {
    renderHeader();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('toggles the mobile nav open/closed on hamburger click', async () => {
    renderHeader();
    const nav = screen.getByText('Home').closest('nav');
    expect(nav).not.toHaveClass('header-nav-open');
    await userEvent.click(screen.getByLabelText('Toggle navigation'));
    expect(nav).toHaveClass('header-nav-open');
    await userEvent.click(screen.getByLabelText('Toggle navigation'));
    expect(nav).not.toHaveClass('header-nav-open');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Header'`
Expected: FAIL — current `Header` has only one dropdown ("About ▾" with hardcoded items) and plain `href="#"` links.

- [ ] **Step 3: Implement the restructured component**

`src/components/Header.jsx`:
```jsx
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
```

`src/components/Header.css` is unchanged — no edits needed (`.header-nav-link` already applies to `Link`'s rendered `<a>`, same as before).

- [ ] **Step 4: Run the tests to verify they pass**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- Header'`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.jsx src/components/Header.test.jsx
git commit -m "feat: restructure Header with real routes and a second dropdown"
```

---

### Task 7: QuoteSection component

**Files:**
- Create: `src/components/QuoteSection.jsx`
- Create: `src/components/QuoteSection.css`
- Create: `src/components/QuoteSection.test.jsx`

**Interfaces:**
- Consumes: `framer-motion` (existing dependency).
- Produces: `QuoteSection` — `import { QuoteSection } from './QuoteSection'` — no props. Used by both `HomePage` (Task 9) and `OurMissionPage` (Task 10).

- [ ] **Step 1: Write the failing test**

`src/components/QuoteSection.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuoteSection } from './QuoteSection';

describe('QuoteSection', () => {
  it('renders the quote and attribution', () => {
    render(<QuoteSection />);
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('— Tahmid H.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- QuoteSection'`
Expected: FAIL — `QuoteSection.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/QuoteSection.jsx`:
```jsx
import { motion } from 'framer-motion';
import './QuoteSection.css';

export function QuoteSection() {
  return (
    <motion.section
      className="quote"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <blockquote>
        "Science is not meant to be kept in the lab; it's the toolbox for
        citizenship. To make it accessible is to empower every mind to
        question, understand, and shape the world they live in."
      </blockquote>
      <cite>— Tahmid H.</cite>
    </motion.section>
  );
}
```

`src/components/QuoteSection.css`:
```css
.quote {
  padding: var(--space-8) var(--space-7);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.quote blockquote {
  font-size: var(--text-h2);
  font-style: normal;
  max-width: 720px;
  margin: 0;
  color: var(--color-text-primary);
}

.quote cite {
  font-size: var(--text-body);
  font-style: normal;
  color: var(--color-text-primary);
  opacity: 0.8;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- QuoteSection'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/QuoteSection.jsx src/components/QuoteSection.css src/components/QuoteSection.test.jsx
git commit -m "feat: add QuoteSection component"
```

---

### Task 8: Add hero subtext

**Files:**
- Modify: `src/components/HeroSection.jsx`
- Modify: `src/components/HeroSection.test.jsx`

**Interfaces:**
- No change to `HeroSection`'s external interface — still `import { HeroSection } from './HeroSection'`, no props.

- [ ] **Step 1: Update the test to expect the new paragraph**

Add this assertion to the existing test in `src/components/HeroSection.test.jsx` (inside the existing `it` block, alongside the current assertions — do not remove any existing assertion):
```jsx
    expect(
      screen.getByText(
        "We're a passionate group of students bringing hands-on science experiences directly to communities, inspiring the next generation of scientists and innovators."
      )
    ).toBeInTheDocument();
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- HeroSection'`
Expected: FAIL — the new paragraph doesn't exist yet.

- [ ] **Step 3: Add the paragraph**

In `src/components/HeroSection.jsx`, add a second `<p>` immediately after the existing one (inside the same `motion.div`, before the closing `</motion.div>`):
```jsx
        <p>
          We're a passionate group of students bringing hands-on science
          experiences directly to communities, inspiring the next
          generation of scientists and innovators.
        </p>
```

The full updated return block:
```jsx
  return (
    <section className="hero">
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Sparking imagination &amp; innovation one experiment at a time</h1>
        <div className="hero-buttons">
          <Button variant="primary">Learn More</Button>
          <Button variant="outline">Contact</Button>
        </div>
        <p>
          Join our mission to ignite curiosity and creativity through
          hands-on STEM projects today!
        </p>
        <p>
          We're a passionate group of students bringing hands-on science
          experiences directly to communities, inspiring the next
          generation of scientists and innovators.
        </p>
      </motion.div>
      <div
        className="hero-placeholder"
        role="img"
        aria-label="Hero illustration placeholder"
      >
        Illustration placeholder
      </div>
    </section>
  );
```

No CSS changes needed — `.hero-text p` styling in `HeroSection.css` already applies to both paragraphs.

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- HeroSection'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroSection.jsx src/components/HeroSection.test.jsx
git commit -m "feat: add hero subtext paragraph"
```

---

### Task 9: HomePage — assemble homepage sections

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/HomePage.test.jsx`

**Interfaces:**
- Consumes: `HeroSection`, `LogoStrip`, `AboutSection`, `QuoteSection` (Task 7), `AcknowledgementsSection` — all existing components, imported from `../components/`.
- Produces: `HomePage` — `import { HomePage } from './pages/HomePage'` — no props. This replaces the section-composition role `App.jsx` used to have (Header moves to `Layout`, so it's not part of `HomePage`).

- [ ] **Step 1: Write the failing test**

`src/pages/HomePage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the hero, about, quote, and acknowledgements sections', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Sparking imagination & innovation one experiment at a time')
    ).toBeInTheDocument();
    expect(screen.getByText('What is JustScience?')).toBeInTheDocument();
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('Acknowledgements')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- HomePage'`
Expected: FAIL — `src/pages/` and `HomePage.jsx` don't exist.

- [ ] **Step 3: Implement the page**

`src/pages/HomePage.jsx`:
```jsx
import { HeroSection } from '../components/HeroSection';
import { LogoStrip } from '../components/LogoStrip';
import { AboutSection } from '../components/AboutSection';
import { QuoteSection } from '../components/QuoteSection';
import { AcknowledgementsSection } from '../components/AcknowledgementsSection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
      <QuoteSection />
      <hr className="divider" />
      <AcknowledgementsSection />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- HomePage'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.jsx src/pages/HomePage.test.jsx
git commit -m "feat: add HomePage, composing existing sections plus QuoteSection"
```

---

### Task 10: OurMissionPage

**Files:**
- Create: `src/pages/OurMissionPage.jsx`
- Create: `src/pages/OurMissionPage.css`
- Create: `src/pages/OurMissionPage.test.jsx`

**Interfaces:**
- Consumes: `QuoteSection` (Task 7).
- Produces: `OurMissionPage` — `import { OurMissionPage } from './pages/OurMissionPage'` — no props.

- [ ] **Step 1: Write the failing test**

`src/pages/OurMissionPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OurMissionPage } from './OurMissionPage';

describe('OurMissionPage', () => {
  it('renders the heading and the mission quote', () => {
    render(<OurMissionPage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('More about our mission coming soon.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- OurMissionPage'`
Expected: FAIL — `OurMissionPage.jsx` does not exist.

- [ ] **Step 3: Implement the page**

`src/pages/OurMissionPage.jsx`:
```jsx
import { QuoteSection } from '../components/QuoteSection';
import './OurMissionPage.css';

export function OurMissionPage() {
  return (
    <section className="our-mission">
      <h1>Our Mission</h1>
      <QuoteSection />
      <p>More about our mission coming soon.</p>
    </section>
  );
}
```

`src/pages/OurMissionPage.css`:
```css
.our-mission {
  padding-top: var(--space-8);
  text-align: center;
}

.our-mission > h1 {
  font-size: var(--text-h2);
}

.our-mission > p {
  font-size: var(--text-body);
  color: var(--color-text-primary);
  padding: 0 var(--space-7) var(--space-8);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- OurMissionPage'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/OurMissionPage.jsx src/pages/OurMissionPage.css src/pages/OurMissionPage.test.jsx
git commit -m "feat: add OurMissionPage"
```

---

### Task 11: OurTeamPage

**Files:**
- Create: `src/pages/OurTeamPage.jsx`
- Create: `src/pages/OurTeamPage.css`
- Create: `src/pages/OurTeamPage.test.jsx`

**Interfaces:**
- Produces: `OurTeamPage` — `import { OurTeamPage } from './pages/OurTeamPage'` — no props.

- [ ] **Step 1: Write the failing test**

`src/pages/OurTeamPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OurTeamPage } from './OurTeamPage';

describe('OurTeamPage', () => {
  it('renders the heading, bio, and all three founders', () => {
    render(<OurTeamPage />);
    expect(screen.getByText('Founding Team')).toBeInTheDocument();
    expect(screen.getByText(/JustScience began in 2023/)).toBeInTheDocument();
    expect(screen.getByText('Ivan Leong')).toBeInTheDocument();
    expect(screen.getByText('Northwestern University')).toBeInTheDocument();
    expect(screen.getByText('Andrew Liu')).toBeInTheDocument();
    expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument();
    expect(screen.getByText('Ian Peng')).toBeInTheDocument();
    expect(screen.getByText('University of Pennsylvania')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- OurTeamPage'`
Expected: FAIL — `OurTeamPage.jsx` does not exist.

- [ ] **Step 3: Implement the page**

`src/pages/OurTeamPage.jsx`:
```jsx
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
```

`src/pages/OurTeamPage.css`:
```css
.our-team {
  padding: var(--space-8) var(--space-7);
  text-align: center;
}

.our-team > h1 {
  font-size: var(--text-h2);
  margin-bottom: var(--space-4);
}

.our-team > p {
  max-width: 640px;
  margin: 0 auto var(--space-6);
  font-size: var(--text-body);
  color: var(--color-text-primary);
}

.founder-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-6);
}

.founder-card {
  background: var(--color-placeholder-bg);
  border-radius: 16px;
  padding: var(--space-5);
  min-width: 200px;
}

.founder-card h2 {
  font-size: var(--text-nav);
  margin: 0 0 var(--space-1);
}

.founder-card p {
  margin: 0;
  font-size: var(--text-nav);
  color: var(--color-text-primary);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- OurTeamPage'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/OurTeamPage.jsx src/pages/OurTeamPage.css src/pages/OurTeamPage.test.jsx
git commit -m "feat: add OurTeamPage"
```

---

### Task 12: FAQPage

**Files:**
- Create: `src/pages/FAQPage.jsx`
- Create: `src/pages/FAQPage.css`
- Create: `src/pages/FAQPage.test.jsx`

**Interfaces:**
- Produces: `FAQPage` — `import { FAQPage } from './pages/FAQPage'` — no props.

- [ ] **Step 1: Write the failing test**

`src/pages/FAQPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQPage } from './FAQPage';

describe('FAQPage', () => {
  it('renders the heading and all three questions with placeholder answers', () => {
    render(<FAQPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('What age groups do you teach?')).toBeInTheDocument();
    expect(screen.getByText('What is project based learning?')).toBeInTheDocument();
    expect(screen.getByText('How long is a lesson?')).toBeInTheDocument();
    expect(screen.getAllByText('Answer coming soon.')).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- FAQPage'`
Expected: FAIL — `FAQPage.jsx` does not exist.

- [ ] **Step 3: Implement the page**

`src/pages/FAQPage.jsx`:
```jsx
import './FAQPage.css';

const FAQS = [
  { question: 'What age groups do you teach?', answer: 'Answer coming soon.' },
  { question: 'What is project based learning?', answer: 'Answer coming soon.' },
  { question: 'How long is a lesson?', answer: 'Answer coming soon.' },
];

export function FAQPage() {
  return (
    <section className="faq">
      <h1>Frequently Asked Questions</h1>
      <dl>
        {FAQS.map((faq) => (
          <div key={faq.question} className="faq-item">
            <dt>{faq.question}</dt>
            <dd>{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
```

`src/pages/FAQPage.css`:
```css
.faq {
  padding: var(--space-8) var(--space-7);
  max-width: 720px;
  margin: 0 auto;
}

.faq h1 {
  font-size: var(--text-h2);
  text-align: center;
  margin-bottom: var(--space-6);
}

.faq-item {
  margin-bottom: var(--space-5);
}

.faq-item dt {
  font-size: var(--text-body);
  font-weight: bold;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.faq-item dd {
  margin: 0;
  font-size: var(--text-body);
  color: var(--color-text-primary);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- FAQPage'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/FAQPage.jsx src/pages/FAQPage.css src/pages/FAQPage.test.jsx
git commit -m "feat: add FAQPage"
```

---

### Task 13: GalleryPage

**Files:**
- Create: `src/pages/GalleryPage.jsx`
- Create: `src/pages/GalleryPage.css`
- Create: `src/pages/GalleryPage.test.jsx`

**Interfaces:**
- Produces: `GalleryPage` — `import { GalleryPage } from './pages/GalleryPage'` — no props.

- [ ] **Step 1: Write the failing test**

`src/pages/GalleryPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage', () => {
  it('renders the heading and 6 placeholder grid items', () => {
    render(<GalleryPage />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    const grid = screen.getByLabelText('Project gallery placeholder');
    expect(grid.children).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- GalleryPage'`
Expected: FAIL — `GalleryPage.jsx` does not exist.

- [ ] **Step 3: Implement the page**

`src/pages/GalleryPage.jsx`:
```jsx
import './GalleryPage.css';

const PLACEHOLDER_COUNT = 6;

export function GalleryPage() {
  return (
    <section className="gallery">
      <h1>Gallery</h1>
      <div className="gallery-grid" aria-label="Project gallery placeholder">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div key={i} className="gallery-item" />
        ))}
      </div>
    </section>
  );
}
```

`src/pages/GalleryPage.css`:
```css
.gallery {
  padding: var(--space-8) var(--space-7);
  text-align: center;
}

.gallery h1 {
  font-size: var(--text-h2);
  margin-bottom: var(--space-6);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 900px;
  margin: 0 auto;
}

.gallery-item {
  background: var(--color-placeholder-bg);
  border-radius: 8px;
  aspect-ratio: 4 / 3;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- GalleryPage'`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/GalleryPage.jsx src/pages/GalleryPage.css src/pages/GalleryPage.test.jsx
git commit -m "feat: add GalleryPage"
```

---

### Task 14: StartAChapterPage

**Files:**
- Create: `src/pages/StartAChapterPage.jsx`
- Create: `src/pages/StartAChapterPage.css`
- Create: `src/pages/StartAChapterPage.test.jsx`

**Interfaces:**
- Produces: `StartAChapterPage` — `import { StartAChapterPage } from './pages/StartAChapterPage'` — no props.

- [ ] **Step 1: Write the failing tests**

`src/pages/StartAChapterPage.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StartAChapterPage } from './StartAChapterPage';

describe('StartAChapterPage', () => {
  it('renders the heading and all 4 step headings', () => {
    render(<StartAChapterPage />);
    expect(screen.getByText('Start A Chapter')).toBeInTheDocument();
    expect(screen.getByText('Why Start a Chapter?')).toBeInTheDocument();
    expect(
      screen.getByText('Apply to Become a Chapter at Your High School or College')
    ).toBeInTheDocument();
    expect(screen.getByText('Build Your Team')).toBeInTheDocument();
    expect(screen.getByText('Establishing a Successful Chapter')).toBeInTheDocument();
  });

  it('mentions JustScience, not STEMsters, when promoting a chapter', () => {
    render(<StartAChapterPage />);
    expect(screen.getByText(/your new JustScience chapter/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- StartAChapterPage'`
Expected: FAIL — `StartAChapterPage.jsx` does not exist.

- [ ] **Step 3: Implement the page**

`src/pages/StartAChapterPage.jsx`:
```jsx
import './StartAChapterPage.css';

export function StartAChapterPage() {
  return (
    <section className="start-a-chapter">
      <h1>Start A Chapter</h1>

      <div className="chapter-step">
        <span className="chapter-step-number">01</span>
        <h2>Why Start a Chapter?</h2>
        <ul>
          <li>Gain valuable leadership experience</li>
          <li>Enhance your college application</li>
          <li>Making a difference in your community.</li>
          <li>Earn service hours</li>
          <li>
            Develop skills that will benefit both your personal growth and
            future opportunities.
          </li>
        </ul>
      </div>

      <div className="chapter-step">
        <span className="chapter-step-number">02</span>
        <h2>Apply to Become a Chapter at Your High School or College</h2>
        <p>
          Fill out our Chapter Interest Form to set up an online interview
          with our team! Once we contact you, gather at least 5 enthusiastic
          members from your school to join your chapter and become part of
          your team! We look forward to helping you get started!
        </p>
      </div>

      <div className="chapter-step">
        <span className="chapter-step-number">03</span>
        <h2>Build Your Team</h2>
        <ul>
          <li>
            <strong>President:</strong> Lead the chapter &amp; oversee
            operations! Ensure all sign-ups are filled out. Lead officer
            meetings.
          </li>
          <li>
            <strong>Vice President:</strong> Support the President, manage
            the spreadsheet for volunteer hours, ensuring proper recording
            of hours.
          </li>
          <li>
            <strong>Secretary:</strong> Manage Google Classroom &amp; send
            meeting reminders and recaps.
          </li>
          <li>
            <strong>Public Relations:</strong> Manage Instagram by posting
            reminders and updates!
          </li>
        </ul>
      </div>

      <div className="chapter-step">
        <span className="chapter-step-number">04</span>
        <h2>Establishing a Successful Chapter</h2>
        <ul>
          <li>
            <strong>Attend Training:</strong> Coordinate with our corporate
            board to set up and participate in training sessions, available
            both in person and virtually, to effectively prepare for
            running your chapter.
          </li>
          <li>
            <strong>Promote Your Chapter:</strong> Share information about
            your new JustScience chapter with your school and community to
            build awareness and attract interest.
          </li>
          <li>
            <strong>Engage Volunteers:</strong> Actively reach out to
            potential volunteers, encouraging their involvement to
            strengthen your chapter.
          </li>
        </ul>
      </div>
    </section>
  );
}
```

`src/pages/StartAChapterPage.css`:
```css
.start-a-chapter {
  padding: var(--space-8) var(--space-7);
  max-width: 720px;
  margin: 0 auto;
}

.start-a-chapter > h1 {
  font-size: var(--text-h2);
  text-align: center;
  margin-bottom: var(--space-7);
}

.chapter-step {
  margin-bottom: var(--space-7);
}

.chapter-step-number {
  display: block;
  font-size: var(--text-h2);
  color: var(--color-placeholder-text);
  margin-bottom: var(--space-2);
}

.chapter-step h2 {
  font-size: var(--text-body);
  margin: 0 0 var(--space-3);
}

.chapter-step p,
.chapter-step li {
  font-size: var(--text-body);
  color: var(--color-text-primary);
}

.chapter-step ul {
  padding-left: var(--space-4);
  margin: 0;
}

.chapter-step li {
  margin-bottom: var(--space-2);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- StartAChapterPage'`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/pages/StartAChapterPage.jsx src/pages/StartAChapterPage.css src/pages/StartAChapterPage.test.jsx
git commit -m "feat: add StartAChapterPage"
```

---

### Task 15: Wire up all routes in App.jsx

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.test.jsx`

**Interfaces:**
- Consumes: `Layout` (Task 5), `HomePage` (Task 9), `OurMissionPage` (Task 10), `OurTeamPage` (Task 11), `FAQPage` (Task 12), `GalleryPage` (Task 13), `StartAChapterPage` (Task 14), `PlaceholderPage` (Task 3).
- Produces: the full route table for the app.

- [ ] **Step 1: Write the failing routing test**

`src/App.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const ROUTES_AND_HEADINGS = [
  ['/', 'Sparking imagination & innovation one experiment at a time'],
  ['/our-mission', 'Our Mission'],
  ['/our-team', 'Founding Team'],
  ['/faq', 'Frequently Asked Questions'],
  ['/our-chapters', 'Our Chapters'],
  ['/programs', 'Programs'],
  ['/gallery', 'Gallery'],
  ['/start-a-chapter', 'Start A Chapter'],
  ['/volunteer', 'Volunteer'],
  ['/sponsor', 'Sponsor Us'],
  ['/request-a-visit', 'Request a Visit'],
  ['/donate', 'Donate Now'],
  ['/contact', 'Contact'],
  ['/volunteer-hours', 'Volunteer Hours'],
];

describe('App routing', () => {
  it.each(ROUTES_AND_HEADINGS)('renders %s with heading "%s"', (path, heading) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  it('the Contact route also shows the address and email', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByText('600 S San Gabriel Blvd, San Gabriel, CA 91776')
    ).toBeInTheDocument();
    expect(screen.getByText('contact@justscience.org')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- App.test'`
Expected: FAIL — `App.jsx` still renders the old flat homepage-only tree, no routes exist.

- [ ] **Step 3: Implement the route table**

`src/App.jsx`:
```jsx
import { Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { HomePage } from './pages/HomePage';
import { OurMissionPage } from './pages/OurMissionPage';
import { OurTeamPage } from './pages/OurTeamPage';
import { FAQPage } from './pages/FAQPage';
import { GalleryPage } from './pages/GalleryPage';
import { StartAChapterPage } from './pages/StartAChapterPage';
import { PlaceholderPage } from './components/PlaceholderPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-mission" element={<OurMissionPage />} />
        <Route path="/our-team" element={<OurTeamPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/our-chapters" element={<PlaceholderPage title="Our Chapters" />} />
        <Route path="/programs" element={<PlaceholderPage title="Programs" />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/start-a-chapter" element={<StartAChapterPage />} />
        <Route path="/volunteer" element={<PlaceholderPage title="Volunteer" />} />
        <Route path="/sponsor" element={<PlaceholderPage title="Sponsor Us" />} />
        <Route
          path="/request-a-visit"
          element={<PlaceholderPage title="Request a Visit" />}
        />
        <Route path="/donate" element={<PlaceholderPage title="Donate Now" />} />
        <Route
          path="/contact"
          element={
            <PlaceholderPage title="Contact">
              <p>
                600 S San Gabriel Blvd, San Gabriel, CA 91776
                <br />
                contact@justscience.org
              </p>
            </PlaceholderPage>
          }
        />
        <Route
          path="/volunteer-hours"
          element={<PlaceholderPage title="Volunteer Hours" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test -- App.test'`
Expected: PASS (15 tests — 14 routes + 1 Contact-specific check).

- [ ] **Step 5: Run the full suite**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test'`
Expected: all test files pass (every component/page test file from Tasks 1-15).

- [ ] **Step 6: Commit**

```bash
git add src/App.jsx src/App.test.jsx
git commit -m "feat: wire up all routes in App.jsx"
```

---

### Task 16: Final verification

**Files:**
- None (verification only).

**Interfaces:**
- N/A.

- [ ] **Step 1: Run the full test suite**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm test'`
Expected: all test files pass, 0 failures.

- [ ] **Step 2: Run the production build**

Run: `wsl.exe -e bash -lc 'cd /home/bronson/tom && npm run build'`
Expected: builds with no errors.

- [ ] **Step 3: Manual browser check — desktop**

```bash
wsl.exe -e bash -lc 'cd /home/bronson/tom && npm run dev'
```

Open the printed local URL. Confirm:
- Both header dropdowns ("About ▾" and "Get Involved ▾") open independently and each links to the right pages.
- Clicking every top-level nav link (Home, Our Chapters, Programs, Gallery, Volunteer Hours) and every dropdown item navigates to a real page with the right heading — no blank pages, no console errors.
- The homepage shows the new hero subtext and the quote block in the right place (after "What is JustScience?", before "Acknowledgements").
- The footer appears on every page (not just the homepage), with working Quick Links, the address, the email, and the copyright line.
- The Our Team page shows all three founders. The Start a Chapter page shows all 4 numbered steps with correct copy (spot-check for the JustScience mention in step 4, and that no stray `‍` characters made it into the rendered text).

- [ ] **Step 4: Manual browser check — mobile**

In the browser dev tools, set viewport width to ~375px. Confirm:
- The hamburger menu opens and shows all nav items including both dropdown triggers.
- Both dropdowns are independently clickable/openable within the mobile menu without visually breaking the layout. If either dropdown's menu renders somewhere clearly broken (e.g. off-screen, overlapping unreadably), note it — this is the one spot the plan didn't fully pre-specify (see the design spec's "Out of scope" note on mobile nav with two dropdowns) and may need a small follow-up CSS fix, but do not over-engineer a fix speculatively if it already looks acceptable.

- [ ] **Step 5: Report**

Summarize what was checked and any issues found. If Step 4 surfaced a real visual problem, describe it precisely (which dropdown, what breaks, at what viewport) so it can be triaged as a follow-up rather than guessed at.
