import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and applies the variant class', () => {
    render(<Button variant="outline">Contact</Button>);
    expect(screen.getByText('Contact')).toHaveClass('btn-outline');
  });

  it('defaults to the primary variant', () => {
    render(<Button>Learn More</Button>);
    expect(screen.getByText('Learn More')).toHaveClass('btn-primary');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Learn More</Button>);
    await userEvent.click(screen.getByText('Learn More'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
