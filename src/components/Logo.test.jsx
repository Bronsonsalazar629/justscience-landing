import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the JustScience logo image', () => {
    render(<Logo />);
    expect(screen.getByAltText('JustScience')).toBeInTheDocument();
    expect(screen.getByAltText('JustScience').tagName).toBe('IMG');
  });
});
