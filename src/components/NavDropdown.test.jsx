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
