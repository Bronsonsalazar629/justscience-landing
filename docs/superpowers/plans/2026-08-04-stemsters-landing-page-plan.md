# STEMsters Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the STEMsters landing page (header/nav, hero, logo-strip placeholder, about section with pill filter) as a React + Vite app, matching `docs/superpowers/specs/2026-08-03-stemsters-landing-page-design.md`.

**Architecture:** Single-page React app (Vite scaffold, no router). Plain CSS with a `:root` token file for fonts/colors/spacing. One component per file under `src/components/`, composed by `App.jsx`. `framer-motion` handles page-load, scroll-reveal, and hover/tap animation. Vitest + React Testing Library for interaction tests.

One deliberate simplification vs. the spec's component-tree diagram: the spec shows `PillGroup` and `PillPanel` as separate components with state lifted to `AboutSection`. Nothing else in the tree needs that state, so this plan merges them into one `PillFilter` component that owns its own active-pill state. Same rendered markup and behavior, one less prop-drilling hop. Likewise, `IconAvatar` and `Divider` stay inline (a `<span>` and a styled `<hr>`) rather than becoming their own components — each is one element with no logic.

**Tech Stack:** React 19, Vite, plain CSS custom properties, framer-motion, Vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event.

## Global Constraints

- Stack is React + Vite + plain CSS custom properties — no CSS-in-JS, no Tailwind, no component library.
- No routing library. Nav links (`Home`, `Our Chapters`, `Volunteer Hours`) are `href="#"` placeholders.
- Fredoka One (`fredoka-one/FredokaOne-Regular.ttf`, already in the repo) is the font for **everything** — nav, headings, body, wordmark — not logo-only.
- Color tokens use the exact hex values below as defaults; the user will replace them later via the token file only, so nothing should hardcode a hex value outside `src/styles/tokens.css`.
- Header shares the hero's background color — they render as one continuous block, no separate header color token.
- Hero illustration and logo strip are **placeholder blocks** (flat gray, no real art/logos) — do not source or fake real artwork/brand marks.
- Responsive breakpoint is 768px: nav collapses to a hamburger menu, hero grid collapses to one column.
- Animation is `framer-motion`: page-load entrance on the hero, scroll-reveal (`whileInView`) on the logo strip and about section, hover/tap micro-transitions on every button, pill, and the About dropdown trigger.
- Copy text (headline, body paragraphs, button/pill labels, dropdown items) must match the spec verbatim — see each task's code.
- Interactive components (dropdown, pill filter, mobile nav toggle) get Vitest + RTL interaction tests. The responsive breakpoint gets a manual dev-server check, not a jsdom test — jsdom doesn't do real layout, so a fake viewport-width assertion is worse than useless.

---

### Task 1: Scaffold the Vite + React project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `.gitignore` (all via `npm create vite`, then edited)

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, `npm run preview` scripts. `src/main.jsx` mounts `<App />` into `#root`.

- [ ] **Step 1: Scaffold into a temp dir (avoids collision with existing `docs/`, `fredoka-one/`, `.git`)**

```bash
npm create vite@latest _scaffold_tmp -- --template react
```

- [ ] **Step 2: Merge scaffold into project root and clean up**

```bash
cp -r _scaffold_tmp/. .
rm -rf _scaffold_tmp
```

- [ ] **Step 3: Rename the package and add `.superpowers/` to `.gitignore`**

Edit `package.json`, change `"name": "_scaffold_tmp"` to `"name": "stemsters-landing"`.

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 4: Install dependencies and verify the dev server boots**

```bash
npm install
npm run build
```

Expected: `npm run build` completes with no errors and creates `dist/`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React project"
```

---

### Task 2: Configure Vitest + React Testing Library

**Files:**
- Modify: `vite.config.js`
- Create: `src/setupTests.js`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: Task 1's `vite.config.js`.
- Produces: `npm test` runs Vitest with jsdom + jest-dom matchers (`toBeInTheDocument`, `toHaveClass`, etc.) available in every `*.test.jsx` file without per-file imports of the matchers themselves.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Create the test setup file**

`src/setupTests.js`:
```js
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Add the test config to `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
```

- [ ] **Step 4: Add test scripts to `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 5: Write and run a throwaway smoke test to confirm the setup works**

Create `src/smoke.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('test setup', () => {
  it('renders and matches with jest-dom', () => {
    render(<div>hello</div>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
```

Run: `npm test`
Expected: 1 passed test.

Delete `src/smoke.test.jsx` — it was only to verify the harness.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: configure Vitest and React Testing Library"
```

---

### Task 3: Design tokens, global styles, and font assets

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `public/fonts/FredokaOne-Regular.woff2`, `public/fonts/FredokaOne-Regular.ttf`, `public/fonts/OFL.txt`
- Modify: `src/main.jsx` (import the two CSS files)

**Interfaces:**
- Produces: global CSS custom properties available to every component: `--font-body`, `--font-heading`, `--font-display`, `--color-bg-hero`, `--color-bg-page`, `--color-text-primary`, `--color-text-secondary`, `--color-btn-primary-bg`, `--color-btn-primary-text`, `--color-btn-outline-border`, `--color-btn-outline-text`, `--color-btn-outline-bg`, `--color-pill-bg`, `--color-pill-border`, `--color-pill-active-bg`, `--color-pill-active-text`, `--color-divider`, `--color-placeholder-bg`, `--color-placeholder-text`, `--color-logo-1..4`, `--space-1..8`, `--text-nav`, `--text-body`, `--text-h1`, `--text-h2`, `--text-button`.

- [ ] **Step 1: Copy font assets and generate the woff2**

```bash
mkdir -p public/fonts
cp fredoka-one/FredokaOne-Regular.ttf public/fonts/FredokaOne-Regular.ttf
cp fredoka-one/OFL.txt public/fonts/OFL.txt
npx --yes ttf2woff2 < fredoka-one/FredokaOne-Regular.ttf > public/fonts/FredokaOne-Regular.woff2
```

Expected: `public/fonts/FredokaOne-Regular.woff2` exists and is non-empty (`ls -la public/fonts/`).

- [ ] **Step 2: Write the tokens file**

`src/styles/tokens.css`:
```css
:root {
  /* Fonts */
  --font-display: 'Fredoka One', system-ui, sans-serif;
  --font-heading: 'Fredoka One', system-ui, sans-serif;
  --font-body: 'Fredoka One', system-ui, sans-serif;

  /* Backgrounds */
  --color-bg-hero: #8FA8E0;
  --color-bg-page: #FFFFFF;

  /* Text */
  --color-text-primary: #14141A;
  --color-text-secondary: #2B2B33;

  /* Buttons */
  --color-btn-primary-bg: #0A0A0A;
  --color-btn-primary-text: #FFFFFF;
  --color-btn-outline-border: #14141A;
  --color-btn-outline-text: #14141A;
  --color-btn-outline-bg: transparent;

  /* Pill buttons */
  --color-pill-bg: #FFFFFF;
  --color-pill-border: #14141A;
  --color-pill-active-bg: #0A0A0A;
  --color-pill-active-text: #FFFFFF;

  /* Dividers */
  --color-divider: #E5E5E5;

  /* Placeholder blocks (hero art, logo strip) */
  --color-placeholder-bg: #D9D9D9;
  --color-placeholder-text: #6B6B6B;

  /* Logo wordmark, per letter */
  --color-logo-1: #E8542A;
  --color-logo-2: #4A7DD4;
  --color-logo-3: #E8B93A;
  --color-logo-4: #4A7DD4;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;
  --space-7: 64px;
  --space-8: 96px;

  /* Type scale */
  --text-nav: 16px;
  --text-body: 18px;
  --text-h1: 56px;
  --text-h2: 40px;
  --text-button: 15px;
}
```

- [ ] **Step 3: Write global styles (font-face, reset, base typography)**

`src/styles/global.css`:
```css
@font-face {
  font-family: 'Fredoka One';
  src: url('/fonts/FredokaOne-Regular.woff2') format('woff2'),
       url('/fonts/FredokaOne-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: var(--color-bg-page);
}

h1, h2, h3 {
  font-family: var(--font-heading);
  margin: 0;
}

.divider {
  border: none;
  border-top: 1px solid var(--color-divider);
  margin: var(--space-6) 0;
}
```

- [ ] **Step 4: Import both files in `src/main.jsx`**

Add near the top of `src/main.jsx`:
```jsx
import './styles/tokens.css';
import './styles/global.css';
```

- [ ] **Step 5: Verify in the browser**

```bash
npm run dev
```

Open the printed local URL. Expected: page background is white, no console errors about the font failing to load (check the Network tab — `FredokaOne-Regular.woff2` should return 200).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, global styles, and font assets"
```

---

### Task 4: Button component

**Files:**
- Create: `src/components/Button.jsx`
- Create: `src/components/Button.css`
- Create: `src/components/Button.test.jsx`

**Interfaces:**
- Consumes: `framer-motion` (new dependency), tokens from Task 3.
- Produces: `Button` component — `import { Button } from './Button'` — props `{ variant?: 'primary' | 'outline', children, onClick?, href? }`. Renders an `<a>` when `href` is given, otherwise a `<button>`.

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Write the failing test**

`src/components/Button.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and applies the variant class', () => {
    render(<Button variant="outline">Contact</Button>);
    expect(screen.getByText('Contact')).toHaveClass('btn-outline');
  });

  it('defaults to the primary variant', () => {
    render(<Button>Learn More</Button>);
    expect(screen.getByText('Learn More')).toHaveClass('btn-primary');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Learn More</Button>);
    await userEvent.click(screen.getByText('Learn More'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- Button`
Expected: FAIL — `Button.jsx` does not exist.

- [ ] **Step 4: Implement the component**

`src/components/Button.jsx`:
```jsx
import { motion } from 'framer-motion';
import './Button.css';

export function Button({ variant = 'primary', children, onClick, href }) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

`src/components/Button.css`:
```css
.btn {
  display: inline-block;
  border-radius: 999px;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-button);
  font-family: var(--font-body);
  cursor: pointer;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: var(--color-btn-primary-bg);
  color: var(--color-btn-primary-text);
}

.btn-outline {
  background: var(--color-btn-outline-bg);
  color: var(--color-btn-outline-text);
  border: 1.5px solid var(--color-btn-outline-border);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- Button`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Button component"
```

---

### Task 5: Logo component

**Files:**
- Create: `src/components/Logo.jsx`
- Create: `src/components/Logo.css`
- Create: `src/components/Logo.test.jsx`

**Interfaces:**
- Produces: `Logo` component — `import { Logo } from './Logo'` — no props, renders the "STEMsters" wordmark with the first four letters colored per the spec.

- [ ] **Step 1: Write the failing test**

`src/components/Logo.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the STEMsters wordmark', () => {
    render(<Logo />);
    expect(screen.getByLabelText('STEMsters')).toBeInTheDocument();
    expect(screen.getByLabelText('STEMsters')).toHaveTextContent('STEMsters');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Logo`
Expected: FAIL — `Logo.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/Logo.jsx`:
```jsx
import './Logo.css';

const LETTERS = [
  { char: 'S', color: 'var(--color-logo-1)' },
  { char: 'T', color: 'var(--color-logo-2)' },
  { char: 'E', color: 'var(--color-logo-3)' },
  { char: 'M', color: 'var(--color-logo-4)' },
  { char: 's', color: 'var(--color-text-primary)' },
  { char: 't', color: 'var(--color-text-primary)' },
  { char: 'e', color: 'var(--color-text-primary)' },
  { char: 'r', color: 'var(--color-text-primary)' },
  { char: 's', color: 'var(--color-text-primary)' },
];

export function Logo() {
  return (
    <span className="logo" aria-label="STEMsters">
      {LETTERS.map((letter, i) => (
        <span key={i} style={{ color: letter.color }}>
          {letter.char}
        </span>
      ))}
    </span>
  );
}
```

`src/components/Logo.css`:
```css
.logo {
  font-family: var(--font-display);
  font-size: 24px;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Logo`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Logo component"
```

---

### Task 6: NavDropdown component

**Files:**
- Create: `src/components/NavDropdown.jsx`
- Create: `src/components/NavDropdown.css`
- Create: `src/components/NavDropdown.test.jsx`

**Interfaces:**
- Consumes: `framer-motion`.
- Produces: `NavDropdown` component — `import { NavDropdown } from './NavDropdown'` — no props. Renders a button labeled "About ▾" that toggles a `role="menu"` list with items "Our Mission", "Our Team", "FAQ".

- [ ] **Step 1: Write the failing tests**

`src/components/NavDropdown.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { NavDropdown } from './NavDropdown';

describe('NavDropdown', () => {
  it('is closed by default', () => {
    render(<NavDropdown />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu on trigger click, with all placeholder items', async () => {
    render(<NavDropdown />);
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Team')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toBeInTheDocument();
  });

  it('closes the menu when clicking outside', async () => {
    render(
      <div>
        <NavDropdown />
        <button>Outside</button>
      </div>
    );
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape', async () => {
    render(<NavDropdown />);
    await userEvent.click(screen.getByText('About ▾'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens on Enter when the trigger is focused', async () => {
    render(<NavDropdown />);
    await userEvent.tab();
    expect(screen.getByText('About ▾')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- NavDropdown`
Expected: FAIL — `NavDropdown.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/NavDropdown.jsx`:
```jsx
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
```

`src/components/NavDropdown.css`:
```css
.nav-dropdown {
  position: relative;
}

.nav-dropdown-trigger {
  font-family: var(--font-body);
  font-size: var(--text-nav);
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}

.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-bg-page);
  border: 1px solid var(--color-divider);
  border-radius: 8px;
  list-style: none;
  padding: var(--space-2) 0;
  margin: var(--space-2) 0 0;
  min-width: 140px;
  z-index: 10;
}

.nav-dropdown-menu li a {
  display: block;
  padding: var(--space-2) var(--space-3);
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav-dropdown-menu li a:hover {
  background: var(--color-bg-hero);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- NavDropdown`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add NavDropdown component"
```

---

### Task 7: Header component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`
- Create: `src/components/Header.test.jsx`

**Interfaces:**
- Consumes: `Logo` (Task 5), `NavDropdown` (Task 6), `Button` (Task 4).
- Produces: `Header` component — `import { Header } from './Header'` — no props.

- [ ] **Step 1: Write the failing tests**

`src/components/Header.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders all nav links and the About dropdown trigger', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Our Chapters')).toBeInTheDocument();
    expect(screen.getByText('Volunteer Hours')).toBeInTheDocument();
    expect(screen.getByText('About ▾')).toBeInTheDocument();
  });

  it('renders the Contact Us button', () => {
    render(<Header />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('toggles the mobile nav open/closed on hamburger click', async () => {
    render(<Header />);
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

Run: `npm test -- Header`
Expected: FAIL — `Header.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/Header.jsx`:
```jsx
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
```

`src/components/Header.css`:
```css
.header {
  background: var(--color-bg-hero);
  padding: var(--space-4) var(--space-6);
}

.header-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.header-hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header-nav-link {
  font-size: var(--text-nav);
  color: var(--color-text-primary);
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.header-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-bg-page);
  display: inline-block;
}

@media (max-width: 768px) {
  .header-hamburger {
    display: block;
  }

  .header-nav {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-bg-hero);
    padding: var(--space-4);
  }

  .header-nav-open {
    display: flex;
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- Header`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Header component"
```

---

### Task 8: HeroSection component

**Files:**
- Create: `src/components/HeroSection.jsx`
- Create: `src/components/HeroSection.css`
- Create: `src/components/HeroSection.test.jsx`

**Interfaces:**
- Consumes: `Button` (Task 4), `framer-motion`.
- Produces: `HeroSection` component — `import { HeroSection } from './HeroSection'` — no props.

- [ ] **Step 1: Write the failing test**

`src/components/HeroSection.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the headline, both buttons, the body copy, and the illustration placeholder', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('Sparking imagination & innovation one experiment at a time')
    ).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join our mission to ignite curiosity and creativity through hands-on STEM projects today!'
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Hero illustration placeholder')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- HeroSection`
Expected: FAIL — `HeroSection.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/HeroSection.jsx`:
```jsx
import { motion } from 'framer-motion';
import { Button } from './Button';
import './HeroSection.css';

export function HeroSection() {
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
}
```

`src/components/HeroSection.css`:
```css
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: var(--space-7);
  padding: var(--space-8) var(--space-7);
  background: var(--color-bg-hero);
}

.hero-text h1 {
  font-size: var(--text-h1);
  margin-bottom: var(--space-4);
}

.hero-buttons {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.hero-text p {
  font-size: var(--text-body);
}

.hero-placeholder {
  background: var(--color-placeholder-bg);
  color: var(--color-placeholder-text);
  border-radius: 16px;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-nav);
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- HeroSection`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add HeroSection component"
```

---

### Task 9: LogoStrip component

**Files:**
- Create: `src/components/LogoStrip.jsx`
- Create: `src/components/LogoStrip.css`
- Create: `src/components/LogoStrip.test.jsx`

**Interfaces:**
- Consumes: `framer-motion`.
- Produces: `LogoStrip` component — `import { LogoStrip } from './LogoStrip'` — no props. Renders 6 placeholder boxes (matching the brief's 6 partner logos), scroll-revealed.

- [ ] **Step 1: Write the failing test**

`src/components/LogoStrip.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LogoStrip } from './LogoStrip';

describe('LogoStrip', () => {
  it('renders 6 placeholder logo boxes', () => {
    render(<LogoStrip />);
    const strip = screen.getByLabelText('Partner logos placeholder');
    expect(strip.children).toHaveLength(6);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- LogoStrip`
Expected: FAIL — `LogoStrip.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/LogoStrip.jsx`:
```jsx
import { motion } from 'framer-motion';
import './LogoStrip.css';

const PLACEHOLDER_COUNT = 6;

export function LogoStrip() {
  return (
    <motion.section
      className="logo-strip"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      aria-label="Partner logos placeholder"
    >
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div key={i} className="logo-strip-item" />
      ))}
    </motion.section>
  );
}
```

`src/components/LogoStrip.css`:
```css
.logo-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-7);
  opacity: 0.85;
}

.logo-strip-item {
  background: var(--color-placeholder-bg);
  border-radius: 8px;
  width: 120px;
  height: 48px;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- LogoStrip`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add LogoStrip placeholder component"
```

---

### Task 10: PillFilter component

**Files:**
- Create: `src/components/PillFilter.jsx`
- Create: `src/components/PillFilter.css`
- Create: `src/components/PillFilter.test.jsx`

**Interfaces:**
- Consumes: `framer-motion`.
- Produces: `PillFilter` component — `import { PillFilter } from './PillFilter'` — no props. Renders 3 pills (Volunteering, Our Chapters, Curriculum) and one paragraph of active-pill copy; Curriculum starts active, matching the spec's markup.

- [ ] **Step 1: Write the failing tests**

`src/components/PillFilter.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { PillFilter } from './PillFilter';

describe('PillFilter', () => {
  it('defaults to Curriculum active', () => {
    render(<PillFilter />);
    expect(screen.getByText('Curriculum')).toHaveClass('pill-active');
    expect(screen.getByText(/Curriculum: browse/)).toBeInTheDocument();
  });

  it('switches active pill and panel copy on click', async () => {
    render(<PillFilter />);
    await userEvent.click(screen.getByText('Volunteering'));
    expect(screen.getByText('Volunteering')).toHaveClass('pill-active');
    expect(screen.getByText('Curriculum')).not.toHaveClass('pill-active');
    expect(screen.getByText(/Volunteering: opportunities/)).toBeInTheDocument();
  });

  it('only ever has one active pill', async () => {
    render(<PillFilter />);
    await userEvent.click(screen.getByText('Our Chapters'));
    const active = screen
      .getAllByRole('tab')
      .filter((el) => el.classList.contains('pill-active'));
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveTextContent('Our Chapters');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- PillFilter`
Expected: FAIL — `PillFilter.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/PillFilter.jsx`:
```jsx
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
```

`src/components/PillFilter.css`:
```css
.pill-group {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.pill {
  border-radius: 999px;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-button);
  font-family: var(--font-body);
  background: var(--color-pill-bg);
  border: 1.5px solid var(--color-pill-border);
  color: var(--color-text-primary);
  cursor: pointer;
}

.pill-active {
  background: var(--color-pill-active-bg);
  color: var(--color-pill-active-text);
}

.pill-panel {
  margin-top: var(--space-4);
  font-size: var(--text-body);
  max-width: 480px;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- PillFilter`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add PillFilter component"
```

---

### Task 11: AboutSection component

**Files:**
- Create: `src/components/AboutSection.jsx`
- Create: `src/components/AboutSection.css`
- Create: `src/components/AboutSection.test.jsx`

**Interfaces:**
- Consumes: `PillFilter` (Task 10), `framer-motion`.
- Produces: `AboutSection` component — `import { AboutSection } from './AboutSection'` — no props.

- [ ] **Step 1: Write the failing test**

`src/components/AboutSection.test.jsx`:
```jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders the heading, body copy, and pill filter', () => {
    render(<AboutSection />);
    expect(screen.getByText('What is STEMsters?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Discover more about STEMsters and our mission to inspire young minds through interactive STEM education!'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Curriculum')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- AboutSection`
Expected: FAIL — `AboutSection.jsx` does not exist.

- [ ] **Step 3: Implement the component**

`src/components/AboutSection.jsx`:
```jsx
import { motion } from 'framer-motion';
import { PillFilter } from './PillFilter';
import './AboutSection.css';

export function AboutSection() {
  return (
    <motion.section
      className="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2>What is STEMsters?</h2>
      <p>
        Discover more about STEMsters and our mission to inspire young minds
        through interactive STEM education!
      </p>
      <PillFilter />
    </motion.section>
  );
}
```

`src/components/AboutSection.css`:
```css
.about {
  padding: var(--space-8) var(--space-7);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.about h2 {
  font-size: var(--text-h2);
}

.about p {
  font-size: var(--text-body);
  max-width: 480px;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- AboutSection`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add AboutSection component"
```

---

### Task 12: Assemble the app and final verification

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Header` (Task 7), `HeroSection` (Task 8), `LogoStrip` (Task 9), `AboutSection` (Task 11).
- Produces: the complete page.

- [ ] **Step 1: Replace the scaffold's `App.jsx` with the real page**

`src/App.jsx`:
```jsx
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoStrip } from './components/LogoStrip';
import { AboutSection } from './components/AboutSection';

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <LogoStrip />
      <hr className="divider" />
      <AboutSection />
    </>
  );
}

export default App;
```

Delete the scaffold's `src/App.css` and any other unused scaffold leftovers (e.g. `src/assets/react.svg`, default logo imports) if `App.jsx` no longer references them.

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: all tests pass (Button, Logo, NavDropdown, Header, HeroSection, LogoStrip, PillFilter, AboutSection).

- [ ] **Step 3: Run the production build**

Run: `npm run build`
Expected: builds with no errors, `dist/` contains the bundled app and `public/fonts/*` copied through.

- [ ] **Step 4: Manual visual check (desktop)**

```bash
npm run dev
```

Open the printed URL. Confirm against the spec: header + hero share one blue block, hero is two columns (text left, gray placeholder right), logo strip shows 6 gray boxes below the hero, About section is centered with 3 pills (Curriculum active by default), clicking a pill swaps the paragraph below it, hovering buttons/pills scales them slightly, hero content fades/slides in on load, logo strip and About section fade in as you scroll to them.

- [ ] **Step 5: Manual visual check (mobile)**

In the browser dev tools, set viewport width to ~375px. Confirm: hamburger icon appears in the header and nav links are hidden until tapped, hero collapses to one column (placeholder block below the text), logo strip and About section content wrap/stack without overflowing horizontally.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: assemble STEMsters landing page"
```
