import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GalleryPage } from './GalleryPage';

describe('GalleryPage', () => {
  it('renders the heading and 6 placeholder grid items', () => {
    render(<GalleryPage />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    const grid = screen.getByLabelText('Project gallery placeholder');
    expect(grid.children).toHaveLength(6);
  });
});
