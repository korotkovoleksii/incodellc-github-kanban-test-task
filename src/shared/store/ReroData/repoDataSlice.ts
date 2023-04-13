import { createSlice } from '@reduxjs/toolkit';
import { IRepoData } from '../../interfaces/repoData.interface';

const initialState: IRepoData = {
  fullName: '',
  starGazersCount: 0,
  todoState: [],
  progressState: [],
  doneState: [],
};

const repoDataSlice = createSlice({
  name: '@@repo',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default repoDataSlice.reducer;
