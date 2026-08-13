import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the hero, about, quote, and acknowledgements sections', () => {
    render(<HomePage />);
    expect(
      screen.getByText('Spreading the Love of Science')
    ).toBeInTheDocument();
    expect(screen.getByText('Our Vision & Values')).toBeInTheDocument();
    expect(screen.getByText('Our Impact')).toBeInTheDocument();
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('Acknowledgements')).toBeInTheDocument();
  });
});
