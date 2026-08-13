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
    expect(
      screen.getByText(/does not require immense effort/)
    ).toBeInTheDocument();
    expect(screen.getByText('JustScience')).toHaveProperty('tagName', 'STRONG');
    expect(
      screen.getByText(/aims to alleviate the barriers in STEM/)
    ).toBeInTheDocument();
  });
});
