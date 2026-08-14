import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage', () => {
  it('renders the heading, all 6 numbered slides, and 6 pagination dots with the first active', () => {
    render(<GalleryPage />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    expect(screen.getByLabelText('Project gallery placeholder')).toBeInTheDocument();
    for (let n = 1; n <= 6; n += 1) {
      expect(screen.getByText(String(n))).toBeInTheDocument();
    }
    expect(screen.getByText('1').closest('.gallery-item')).toHaveAttribute(
      'aria-current',
      'true'
    );
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(6);
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('advances to the next slide on next-button click and wraps around', async () => {
    render(<GalleryPage />);
    const dots = screen.getAllByRole('tab');
    await userEvent.click(screen.getByLabelText('Next slide'));
    expect(dots[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('2').closest('.gallery-item')).toHaveAttribute(
      'aria-current',
      'true'
    );

    await userEvent.click(screen.getByLabelText('Previous slide'));
    await userEvent.click(screen.getByLabelText('Previous slide'));
    expect(dots[5]).toHaveAttribute('aria-selected', 'true');
  });

  it('jumps directly to a slide when its pagination dot is clicked', async () => {
    render(<GalleryPage />);
    const dots = screen.getAllByRole('tab');
    await userEvent.click(screen.getByLabelText('Go to slide 4'));
    expect(dots[3]).toHaveAttribute('aria-selected', 'true');
  });
});
