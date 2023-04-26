import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import CardBoard from './CardBoard';
import * as reduxHooks from '../../../shared/hooks/redux-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from '@reduxjs/toolkit';
import { IRootState } from '../../../shared/interfaces/repoData.interface';

const mockStore = configureStore<IRootState>([]);

describe('CardBoard', () => {
  let store: Store<IRootState>;

  beforeEach(() => {
    store = mockStore({
      arrRepoData: [],
      currentRepoTitle: '',
    });
  });

  it('render CardBoard with simple store', () => {
    store = mockStore({
      arrRepoData: [
        {
          fullName: 'some/repo',
          stargazersCount: 0,
          todoState: { title: 'To Do', taskList: [] },
          progressState: { title: 'In Progress', taskList: [] },
          doneState: { title: 'Done', taskList: [] },
        },
      ],
      currentRepoTitle: 'some/repo',
    });
    render(
      <Provider store={store}>
        <CardBoard />
      </Provider>
    );
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
