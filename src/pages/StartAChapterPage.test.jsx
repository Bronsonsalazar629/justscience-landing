import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StartAChapterPage } from './StartAChapterPage';

describe('StartAChapterPage', () => {
  it('renders the heading and all 4 step headings', () => {
    render(<StartAChapterPage />);
    expect(screen.getByText('Start A Chapter')).toBeInTheDocument();
    expect(screen.getByText('Why Start a Chapter?')).toBeInTheDocument();
    expect(
      screen.getByText('Apply to Become a Chapter at Your High School or College')
    ).toBeInTheDocument();
    expect(screen.getByText('Build Your Team')).toBeInTheDocument();
    expect(screen.getByText('Establishing a Successful Chapter')).toBeInTheDocument();
  });

  it('mentions JustScience, not STEMsters, when promoting a chapter', () => {
    render(<StartAChapterPage />);
    expect(screen.getByText(/your new JustScience chapter/)).toBeInTheDocument();
  });
});
