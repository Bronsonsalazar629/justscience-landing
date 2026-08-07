import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OurMissionPage } from './OurMissionPage';

describe('OurMissionPage', () => {
  it('renders the heading and the mission quote', () => {
    render(<OurMissionPage />);
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('More about our mission coming soon.')).toBeInTheDocument();
  });
});
