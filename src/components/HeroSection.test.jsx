import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  it('renders the headline, both buttons, the body copy, and the illustration placeholder', () => {
    render(<HeroSection />);
    expect(
      screen.getByText('Sparking imagination & innovation one experiment at a time')
    ).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Join our mission to ignite curiosity and creativity through hands-on STEM projects today!'
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
