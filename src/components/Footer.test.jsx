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
