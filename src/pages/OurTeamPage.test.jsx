import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OurTeamPage } from './OurTeamPage';

describe('OurTeamPage', () => {
  it('renders the heading, intro bio, and both founders with photo placeholders', () => {
    render(<OurTeamPage />);
    expect(screen.getByText('Founding Team')).toBeInTheDocument();
    expect(
      screen.getByText(/We’re a diverse group of passionate students/)
    ).toBeInTheDocument();

    expect(screen.getByText('Tom Lan')).toBeInTheDocument();
    expect(
      screen.getByText(/bridge the gap between academic science/)
    ).toBeInTheDocument();
    expect(screen.getByText('Chemistry Demos')).toBeInTheDocument();
    expect(screen.getByText('Program Development')).toBeInTheDocument();
    expect(screen.getByLabelText('Tom Lan photo placeholder')).toBeInTheDocument();

    expect(screen.getByText('Engjell Dosti')).toBeInTheDocument();
    expect(screen.getByText(/Grow my passion for stem/)).toBeInTheDocument();
    expect(screen.getByText('Physics')).toBeInTheDocument();
    expect(screen.getByText('Marathon Running')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Engjell Dosti photo placeholder')
    ).toBeInTheDocument();
  });
});
