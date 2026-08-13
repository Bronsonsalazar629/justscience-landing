import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ImpactSection } from './ImpactSection';

describe('ImpactSection', () => {
  it('renders the heading and all six stats', () => {
    render(<ImpactSection />);
    expect(screen.getByText('Our Impact')).toBeInTheDocument();
    expect(screen.getByText('Students Reached')).toBeInTheDocument();
    expect(screen.getByText('Communities Visited')).toBeInTheDocument();
    expect(screen.getByText('Positive Feedback')).toBeInTheDocument();
    expect(screen.getByText('Experiments Performed')).toBeInTheDocument();
    expect(screen.getByText('Awards Won')).toBeInTheDocument();
    expect(screen.getByText('Active Volunteers')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
