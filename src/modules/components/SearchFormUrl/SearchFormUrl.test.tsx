import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../utils/test-utils';
import { Provider } from 'react-redux';
import SearchFormUrl from './SearchFormUrl';
import configureStore from 'redux-mock-store';
import { Store } from '@reduxjs/toolkit';
import { IRootState } from '../../../shared/interfaces/repoData.interface';

const mockStore = configureStore<IRootState>([]);

describe('SearchFormUrl', () => {
  let store: Store<IRootState>;

  beforeEach(() => {
    store = mockStore({
      arrRepoData: [],
      currentRepoTitle: '',
    });
  });

  it('Render text field with correct placeholder', () => {
    render(
      <Provider store={store}>
        <SearchFormUrl />
      </Provider>
    );
    const inputElement = screen.getByLabelText('Enter repo URL');
    expect(inputElement).toBeInTheDocument();
  });
  it('Render button whit correct title', () => {
    render(
      <Provider store={store}>
        <SearchFormUrl />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Load issues' });
    expect(button).toBeInTheDocument();
  });
});
