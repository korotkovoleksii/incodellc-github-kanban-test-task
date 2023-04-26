import { describe, it, expect } from 'vitest';
import reducer, { moveCard, setCurrentTitle } from './repoDataSlice';
import { IRootState } from '../../interfaces/repoData.interface';

describe('RepoDataSlice', () => {
  it('should return the init state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      currentRepoTitle: '',
      arrRepoData: [],
    });
  });
  it('should set a current title', () => {
    expect(
      reducer(undefined, setCurrentTitle({ currentTitle: 'test' }))
    ).toEqual({
      currentRepoTitle: 'test',
      arrRepoData: [],
    });
  });
  it('move card to other state', () => {
    const previousState: IRootState = {
      currentRepoTitle: 'vitest-dev/vitest',
      arrRepoData: [
        {
          fullName: 'vitest-dev/vitest',
          stargazersCount: 8796,
          todoState: {
            title: 'ToDo',
            taskList: [
              {
                title:
                  'Workspace - all `globalSetup` from all projects are executed when a single test is executed',
                number: 3255,
                createdAt: '2023-04-25T11:10:25Z',
                typeUser: 'User',
                comments: 0,
                state: 'open',
                assignee: false,
              },
            ],
          },
          progressState: { title: 'In Progress', taskList: [] },
          doneState: { title: 'Done', taskList: [] },
        },
      ],
    };
    const doneState: IRootState = {
      currentRepoTitle: 'vitest-dev/vitest',
      arrRepoData: [
        {
          fullName: 'vitest-dev/vitest',
          stargazersCount: 8796,
          todoState: {
            title: 'ToDo',
            taskList: [],
          },
          progressState: {
            title: 'In Progress',
            taskList: [
              {
                title:
                  'Workspace - all `globalSetup` from all projects are executed when a single test is executed',
                number: 3255,
                createdAt: '2023-04-25T11:10:25Z',
                typeUser: 'User',
                comments: 0,
                state: 'open',
                assignee: false,
              },
            ],
          },
          doneState: { title: 'Done', taskList: [] },
        },
      ],
    };

    expect(
      reducer(
        previousState,
        moveCard({
          source: {
            droppableId: previousState.arrRepoData[0].todoState.title,
            index: 0,
          },
          destination: {
            droppableId: previousState.arrRepoData[0].progressState.title,
            index: 0,
          },
        })
      )
    ).toEqual(doneState);
  });
});
