import { describe, it, expect, vi } from 'vitest';
import configureStore from 'redux-mock-store';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import thunk from '@reduxjs/toolkit';
import reducer, {
  moveCard,
  retrieveDataRepo,
  setCurrentTitle,
} from './repoDataSlice';
import { IRootState } from '../../interfaces/repoData.interface';
import { Endpoints } from '../../enums/Endpoints';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

describe('Retrieve Data Repo', () => {
  it('dispatches the correct actions when successful', async () => {
    const dispatch = vi.fn();
    const state: IRootState = {
      currentRepoTitle: 'vitest-dev/vitest',
      arrRepoData: [],
    };
    const response = {
      fullName: 'vitest-dev/vitest',
      stargazersCount: 8809,
    };

    server.use(
      rest.get(
        `${Endpoints.API_URL}${state.currentRepoTitle}`,
        (req, res, ctx) => {
          return res(ctx.json(response));
        }
      )
    );
    const thunk = retrieveDataRepo();
    await thunk(dispatch, () => state, undefined);
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('repo/retrieveDataRepo/pending');
    expect(end[0].type).toBe('repo/retrieveDataRepo/fulfilled');
    expect(end[0].payload).toEqual(response);
  });
});
