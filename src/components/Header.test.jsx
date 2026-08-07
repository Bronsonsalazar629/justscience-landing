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
  it('the logo links to home', () => {
    renderHeader();
    expect(screen.getByLabelText('JustScience home')).toHaveAttribute('href', '/');
  });

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
