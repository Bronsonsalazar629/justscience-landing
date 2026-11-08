import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const ROUTES_AND_HEADINGS = [
  ['/', 'Spreading the Love of Science'],
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

  it('the Contact route shows the email without an address', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );
    const contactSection = screen.getByRole('heading', { name: 'Contact' }).closest('section');
    expect(within(contactSection).getByText('contact@justscience.org')).toBeInTheDocument();
    expect(within(contactSection).queryByText(/600 S San Gabriel Blvd/)).not.toBeInTheDocument();
  });
});
