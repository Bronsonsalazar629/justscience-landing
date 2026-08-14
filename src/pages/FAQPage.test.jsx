import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FAQPage } from './FAQPage';

describe('FAQPage', () => {
  it('renders the heading, all three questions, and their answers', () => {
    render(<FAQPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Who do you teach?')).toBeInTheDocument();
    expect(
      screen.getByText(/curious aspirers in elementary\/middle school/)
    ).toBeInTheDocument();
    expect(screen.getByText('How will the students learn?')).toBeInTheDocument();
    expect(
      screen.getByText(/Through simplified demonstrations and personal kits/)
    ).toBeInTheDocument();
    expect(screen.getByText('How can I get involved?')).toBeInTheDocument();
    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute(
      'href',
      '#/contact'
    );
  });
});
