import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import CardIssues from './CardIssues';

describe('CardIssues', () => {
  it('renders CardIssues with correct props', () => {
    const props = {
      title: 'Test issue',
      number: 123,
      createdAt: new Date().toISOString(),
      typeUser: 'Amin',
      comments: 0,
    };
    render(<CardIssues {...props} />);

    expect(screen.getByText(/Test issue/i)).toBeInTheDocument();
    expect(screen.getByText(/#123 opened.*ago/i)).toBeInTheDocument();
    expect(screen.getByText(/Amin\| Comments: 0/i)).toBeInTheDocument();
  });
});
