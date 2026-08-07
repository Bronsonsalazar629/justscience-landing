import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OurTeamPage } from './OurTeamPage';

describe('OurTeamPage', () => {
  it('renders the heading, bio, and all three founders', () => {
    render(<OurTeamPage />);
    expect(screen.getByText('Founding Team')).toBeInTheDocument();
    expect(screen.getByText(/JustScience began in 2023/)).toBeInTheDocument();
    expect(screen.getByText('Ivan Leong')).toBeInTheDocument();
    expect(screen.getByText('Northwestern University')).toBeInTheDocument();
    expect(screen.getByText('Andrew Liu')).toBeInTheDocument();
    expect(screen.getByText('University of California, Berkeley')).toBeInTheDocument();
    expect(screen.getByText('Ian Peng')).toBeInTheDocument();
    expect(screen.getByText('University of Pennsylvania')).toBeInTheDocument();
  });
});
