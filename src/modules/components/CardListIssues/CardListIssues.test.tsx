import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../utils/test-utils';

import CardListIssues from './CardListIssues';
import { IIssuesItem } from '../../../shared/interfaces/repoData.interface';
import { DragDropContext } from 'react-beautiful-dnd';

describe('CardListIssues', () => {
  it('renders CardListIssues with correct props then include two cards', () => {
    const props: { todoState: IIssuesItem[]; titleList: string } = {
      titleList: 'ToDo',
      todoState: [
        {
          title: 'test',
          number: 3255,
          createdAt: '2023-04-25T11:10:25Z',
          typeUser: 'User',
          comments: 0,
          state: 'open',
          assignee: false,
        },
        {
          title: 'test',
          number: 3254,
          createdAt: '2023-04-25T10:43:15Z',
          typeUser: 'User',
          comments: 1,
          state: 'open',
          assignee: false,
        },
      ],
    };
    render(
      <>
        <DragDropContext onDragEnd={vi.fn}>
          <CardListIssues {...props} />
        </DragDropContext>
      </>
    );

    expect(screen.getAllByText('test').length).equal(2);
    expect(screen.getByText('ToDo')).toBeInTheDocument();
  });
});
