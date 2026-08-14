import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { FAQPage } from './FAQPage';

describe('FAQPage', () => {
  it('renders the heading and all three questions, with the first answer open by default', () => {
    render(<FAQPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Who do you teach\?/ })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    expect(
      screen.getByRole('button', { name: /How will the students learn\?/ })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.getByRole('button', { name: /How can I get involved\?/ })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.getByText(/curious aspirers in elementary\/middle school/)
    ).toBeInTheDocument();
  });

  it('expands another question on click and collapses the previous one', async () => {
    render(<FAQPage />);
    const involvedButton = screen.getByRole('button', { name: /How can I get involved\?/ });
    await userEvent.click(involvedButton);
    expect(involvedButton).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: /Who do you teach\?/ })
    ).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Contact Us').closest('a')).toHaveAttribute(
      'href',
      '#/contact'
    );
  });

  it('collapses an open question when clicked again', async () => {
    render(<FAQPage />);
    const teachButton = screen.getByRole('button', { name: /Who do you teach\?/ });
    await userEvent.click(teachButton);
    expect(teachButton).toHaveAttribute('aria-expanded', 'false');
  });
});
