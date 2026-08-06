import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AcknowledgementsSection } from './AcknowledgementsSection';

describe('AcknowledgementsSection', () => {
  it('renders the heading and the acknowledged logo', () => {
    render(<AcknowledgementsSection />);
    expect(screen.getByText('Acknowledgements')).toBeInTheDocument();
    expect(
      screen.getByAltText(
        'Carnegie Mellon University Center for Student Diversity and Inclusion'
      )
    ).toBeInTheDocument();
  });
});
