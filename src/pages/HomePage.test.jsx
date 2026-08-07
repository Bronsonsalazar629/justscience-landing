import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the hero, about, quote, and acknowledgements sections', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Sparking imagination & innovation one experiment at a time')
    ).toBeInTheDocument();
    expect(screen.getByText('What is JustScience?')).toBeInTheDocument();
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('Acknowledgements')).toBeInTheDocument();
  });
});
