import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the STEMsters wordmark', () => {
    render(<Logo />);
    expect(screen.getByLabelText('STEMsters')).toBeInTheDocument();
    expect(screen.getByLabelText('STEMsters')).toHaveTextContent('STEMsters');
  });
});
