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
