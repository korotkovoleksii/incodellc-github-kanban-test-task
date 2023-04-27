import { describe, it, expect, vi } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import reducer, {
  moveCard,
  retrieveDataRepo,
  setCurrentTitle,
  retrieveIssuesRepo,
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
  it('should retrieveDataRepo with rejected response', async () => {
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
          return res(ctx.status(404), ctx.json(response));
        }
      )
    );
    const thunk = retrieveDataRepo();
    await thunk(dispatch, () => state, undefined);
    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe('repo/retrieveDataRepo/pending');
    expect(end[0].type).toBe('repo/retrieveDataRepo/rejected');
  });
});

describe('Retrieve Issues Repo', () => {
  it('should Retrieve Issues Repo with fulfilled', async () => {
    const dispatch = vi.fn();

    const state: IRootState = {
      currentRepoTitle: 'vitest-dev/vitest',
      arrRepoData: [],
    };
    const response = {
      assignee: null,
      comments: 23,
      number: 123412,
      createdAt: 'test',
      title: 'test',
      state: 'close',
      user: {
        type: 'test',
      },
    };
    const testPayload = {
      doneState: [
        {
          assignee: false,
          comments: 23,
          number: 123412,
          createdAt: 'test',
          title: 'test',
          state: 'close',
          typeUser: 'test',
        },
      ],
      progressState: [],
      todoState: [],
    };

    server.use(
      rest.get(
        `${Endpoints.API_URL}${state.currentRepoTitle}/issues`,
        (req, res, ctx) => {
          return res(ctx.json([response]));
        }
      )
    );
    const thunk = retrieveIssuesRepo();
    await thunk(dispatch, () => state, undefined);
    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('repo/retrieveIssuesRepo/pending');
    expect(end[0].type).toBe('repo/retrieveIssuesRepo/fulfilled');
    expect(end[0].payload).toEqual(testPayload);
  });
  it('should Retrieve Issues Repo with rejected', async () => {
    const dispatch = vi.fn();

    const state: IRootState = {
      currentRepoTitle: 'vitest-dev/vitest',
      arrRepoData: [],
    };
    const response = {
      assignee: null,
      comments: 23,
      number: 123412,
      createdAt: 'test',
      title: 'test',
      state: 'close',
      user: {
        type: 'test',
      },
    };

    server.use(
      rest.get(
        `${Endpoints.API_URL}${state.currentRepoTitle}/issues`,
        (req, res, ctx) => {
          return res(ctx.status(404), ctx.json([response]));
        }
      )
    );
    const thunk = retrieveIssuesRepo();
    await thunk(dispatch, () => state, undefined);
    const { calls } = dispatch.mock;

    const [start, end] = calls;

    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('repo/retrieveIssuesRepo/pending');
    expect(end[0].type).toBe('repo/retrieveIssuesRepo/rejected');
  });
});
