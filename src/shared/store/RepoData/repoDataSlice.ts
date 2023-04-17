import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IIssuesItem,
  IRepoData,
  IIssuesListTask,
} from '../../interfaces/repoData.interface';
import { Endpoints } from '../../enums/Endpoints';
import { convertKeys } from '../../helpers/convertKey';
import { IResponseIssues } from '../../interfaces/responseIssues.interface';
import { DraggableLocation } from 'react-beautiful-dnd';

const initialState: IRepoData = {
  fullName: '',
  stargazersCount: 0,
  todoState: { taskList: [], title: 'ToDo' },
  progressState: { taskList: [], title: 'In Progress' },
  doneState: { taskList: [], title: 'Done' },
};

export const retrieveDataRepo = createAsyncThunk(
  'repo/retrieveDataRepo',
  async (fullNameRepo: string, {}) => {
    console.log(fullNameRepo, 'retrieveDataRepo');
    try {
      const res = await fetch(`${Endpoints.API_URL}${fullNameRepo}`);

      if (res.ok) {
        const data = await res.json();
        const formattedData = convertKeys(data) as Omit<
          IRepoData,
          'todoState' | 'progressState' | 'doneState'
        >;
        return formattedData;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const retrieveIssuesRepo = createAsyncThunk(
  'repo/retrieveIssuesRepo',
  async (fullNameRepo: string, {}) => {
    console.log(fullNameRepo, 'retrieveDataRepo');
    try {
      const res = await fetch(`${Endpoints.API_URL}${fullNameRepo}/issues`);

      if (res.ok) {
        const data = await res.json();

        const formattedData = convertKeys(data) as IResponseIssues[];
        const selectedData: IIssuesItem[] = formattedData.map((item) => {
          return {
            title: item.title,
            number: item.number,
            createdAt: item.createdAt,
            typeUser: item.user.type,
            comments: item.comments,
            state: item.state,
            assignee: item.assignee ? true : false,
          };
        });

        const doneState = selectedData.filter((item) => {
          return item.state === 'close';
        });

        const progressState = selectedData.filter((item) => {
          return item.state === 'open' && item.assignee;
        });
        const todoState = selectedData.filter((item) => {
          return item.state === 'open' && !item.assignee;
        });

        return { doneState, progressState, todoState };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const repoDataSlice = createSlice({
  name: '@@repo',
  initialState,
  reducers: {
    moveCard(
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        destination: DraggableLocation;
      }>
    ) {
      const sourceRow = Object.values(state).find(
        (item): item is IIssuesListTask =>
          (item as IIssuesListTask).title === action.payload.source.droppableId
      );

      const destinationRow = Object.values(state).find(
        (item): item is IIssuesListTask =>
          (item as IIssuesListTask).title ===
          action.payload.destination.droppableId
      );

      if (sourceRow && destinationRow) {
        const selectedCard = sourceRow.taskList[action.payload.source.index];
        const arrWithoutCard = sourceRow.taskList.filter(
          (item, index) => index !== action.payload.source.index
        );
        sourceRow.taskList = arrWithoutCard;
        destinationRow.taskList.splice(
          action.payload.destination.index,
          0,
          selectedCard
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveDataRepo.fulfilled, (state, action) => {
      if (action.payload) {
        state.fullName = action.payload.fullName;
        state.stargazersCount = action.payload.stargazersCount;
      }
    });
    builder.addCase(retrieveIssuesRepo.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          todoState: { ...state.todoState, taskList: action.payload.todoState },
          progressState: {
            ...state.progressState,
            taskList: action.payload.progressState,
          },
          doneState: { ...state.doneState, taskList: action.payload.doneState },
        };
      }
    });
  },
});

export const { moveCard } = repoDataSlice.actions;

export default repoDataSlice.reducer;
