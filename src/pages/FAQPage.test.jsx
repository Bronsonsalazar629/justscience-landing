import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQPage } from './FAQPage';

describe('FAQPage', () => {
  it('renders the heading and all three questions with placeholder answers', () => {
    render(<FAQPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('What age groups do you teach?')).toBeInTheDocument();
    expect(screen.getByText('What is project based learning?')).toBeInTheDocument();
    expect(screen.getByText('How long is a lesson?')).toBeInTheDocument();
    expect(screen.getAllByText('Answer coming soon.')).toHaveLength(3);
  });
});
