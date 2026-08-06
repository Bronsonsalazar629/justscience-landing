import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LogoStrip } from './LogoStrip';

describe('LogoStrip', () => {
  it('renders 6 placeholder logo boxes', () => {
    render(<LogoStrip />);
    const strip = screen.getByLabelText('Partner logos placeholder');
    expect(strip.children).toHaveLength(6);
  });
});
