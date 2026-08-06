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
