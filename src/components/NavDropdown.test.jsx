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
