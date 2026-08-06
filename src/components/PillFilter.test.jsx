import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { PillFilter } from './PillFilter';

describe('PillFilter', () => {
  it('defaults to Curriculum active', () => {
    render(<PillFilter />);
    expect(screen.getByText('Curriculum')).toHaveClass('pill-active');
    expect(screen.getByText(/Curriculum: browse/)).toBeInTheDocument();
  });

  it('switches active pill and panel copy on click', async () => {
    render(<PillFilter />);
    await userEvent.click(screen.getByText('Volunteering'));
    expect(screen.getByText('Volunteering')).toHaveClass('pill-active');
    expect(screen.getByText('Curriculum')).not.toHaveClass('pill-active');
    expect(screen.getByText(/Volunteering: opportunities/)).toBeInTheDocument();
  });

  it('only ever has one active pill', async () => {
    render(<PillFilter />);
    await userEvent.click(screen.getByText('Our Chapters'));
    const active = screen
      .getAllByRole('tab')
      .filter((el) => el.classList.contains('pill-active'));
    expect(active).toHaveLength(1);
    expect(active[0]).toHaveTextContent('Our Chapters');
  });
});
