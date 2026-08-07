import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QuoteSection } from './QuoteSection';

describe('QuoteSection', () => {
  it('renders the quote and attribution', () => {
    render(<QuoteSection />);
    expect(
      screen.getByText(/Science is not meant to be kept in the lab/)
    ).toBeInTheDocument();
    expect(screen.getByText('— Tahmid H.')).toBeInTheDocument();
  });
});
