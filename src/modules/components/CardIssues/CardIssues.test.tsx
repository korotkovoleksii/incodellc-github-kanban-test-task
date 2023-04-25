import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import { IIssuesItem } from '../../../shared/interfaces/repoData.interface';
import CardIssues from './CardIssues';

describe('CardIssues', () => {
  it('renders CardIssues with correct props', () => {
    const props: Omit<IIssuesItem, 'assignee' | 'state'> = {
      title: 'test',
      number: 1,
      createdAt: Date(),
      typeUser: 'Amin',
      comments: 0,
    };
    render(<CardIssues {...props} />);

    expect(screen.getByText(/Amin/i)).toBeInTheDocument();
    // expect(screen.getByText(/#1/i)).toBeInTheDocument();
    // expect(screen.getByText(/0 comments/i)).toBeInTheDocument();
  });
});
