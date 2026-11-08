import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the headline, both buttons, the body copy, and the illustration placeholder', () => {
    render(<HeroSection />);
    expect(
      screen.getByRole('heading', { name: 'Spreading the Love of Science' })
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.hero-title-word')).toHaveLength(5);
    expect(screen.getByText('Learn More').closest('a')).toHaveAttribute(
      'href',
      '#/our-mission'
    );
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Simplifying science and innovation to make education accessible and engaging'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're a passionate group of students bringing hands-on science experiences directly to communities, inspiring the next generation of scientists and innovators."
      )
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Hero illustration placeholder')).toBeInTheDocument();
  });
});
