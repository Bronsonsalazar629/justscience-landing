import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  });

  it('the Contact route also shows the address and email', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    const contactSection = screen.getByRole('heading', { name: 'Contact' }).closest('section');
    const contactInfo = within(contactSection).getByText(/contact@justscience\.org/).closest('p');
    expect(contactInfo).toHaveTextContent('600 S San Gabriel Blvd, San Gabriel, CA 91776');
    expect(contactInfo).toHaveTextContent('contact@justscience.org');
  });
});
