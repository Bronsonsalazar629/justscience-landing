import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders Quick Links, email, and copyright', () => {
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
    expect(screen.getByText('contact@justscience.us')).toBeInTheDocument();
    expect(
      screen.getByText('Copyright © 2026 JustScience - All rights reserved')
    ).toBeInTheDocument();
  });
});
