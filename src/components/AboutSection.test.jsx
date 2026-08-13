import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders the heading, mission copy, and all four value cards', () => {
    render(<AboutSection />);
    expect(screen.getByText('Our Vision & Values')).toBeInTheDocument();
    expect(
      screen.getByText(/To make science education accessible/)
    ).toBeInTheDocument();

    expect(screen.getByText('Passion for Science')).toBeInTheDocument();
    expect(screen.getByText('Community First')).toBeInTheDocument();
    expect(screen.getByText('Hands-On Learning')).toBeInTheDocument();
    expect(screen.getByText('Student Leadership')).toBeInTheDocument();
  });
});
