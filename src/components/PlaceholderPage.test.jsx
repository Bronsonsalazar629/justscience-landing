import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PlaceholderPage } from './PlaceholderPage';

describe('PlaceholderPage', () => {
  it('renders the title and coming-soon message', () => {
    render(<PlaceholderPage title="Programs" />);
    expect(screen.getByText('Programs')).toBeInTheDocument();
    expect(
      screen.getByText('This page is coming soon — check back for updates!')
    ).toBeInTheDocument();
  });

  it('renders optional children below the message', () => {
    render(
      <PlaceholderPage title="Contact">
        <p>Extra info</p>
      </PlaceholderPage>
    );
    expect(screen.getByText('Extra info')).toBeInTheDocument();
  });
});
