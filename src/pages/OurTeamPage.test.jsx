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

    expect(screen.getByText('Bronson Salazar')).toBeInTheDocument();
    expect(screen.getByText('[bio.]')).toBeInTheDocument();
    expect(screen.getByText('[tag.]')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Bronson Salazar photo placeholder')
    ).toBeInTheDocument();
  });
});
