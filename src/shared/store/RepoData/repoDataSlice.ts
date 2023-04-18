import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IIssuesItem,
  IRepoData,
  IIssuesListTask,
  IRootState,
} from '../../interfaces/repoData.interface';
import { Endpoints } from '../../enums/Endpoints';
import { convertKeys } from '../../helpers/convertKey';
import { IResponseIssues } from '../../interfaces/responseIssues.interface';
import { DraggableLocation } from 'react-beautiful-dnd';

const initialState: IRootState = {
  currentRepoTitle: '',
  arrRepoData: [],
};

export const retrieveDataRepo = createAsyncThunk(
  'repo/retrieveDataRepo',
  async (_, { getState }) => {
    const state = getState() as IRootState;

    try {
      const res = await fetch(`${Endpoints.API_URL}${state.currentRepoTitle}`);

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
  async (_, { getState }) => {
    const state = getState() as IRootState;

    try {
      const res = await fetch(
        `${Endpoints.API_URL}${state.currentRepoTitle}/issues`
      );

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
      const currentBoard = state.arrRepoData.find(
        (item) => item.fullName === state.currentRepoTitle
      );
      if (currentBoard) {
        const sourceRow = Object.values(currentBoard).find(
          (item): item is IIssuesListTask =>
            (item as IIssuesListTask).title ===
            action.payload.source.droppableId
        );

        const destinationRow = Object.values(currentBoard).find(
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
      }
    },
    setCurrentTitle(state, action: PayloadAction<{ currentTitle: string }>) {
      state.currentRepoTitle = action.payload.currentTitle;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveDataRepo.fulfilled, (state, action) => {
      if (action.payload) {
        const rez = state.arrRepoData.findIndex(
          (item) => item.fullName === state.currentRepoTitle
        );
        if (rez === -1) {
          const newRepo = {
            fullName: state.currentRepoTitle,
            stargazersCount: action.payload.stargazersCount,
            todoState: { taskList: [], title: 'ToDo' },
            progressState: { taskList: [], title: 'In Progress' },
            doneState: { taskList: [], title: 'Done' },
          };

          state.arrRepoData.push(newRepo);
        }
      }
    });
    builder.addCase(retrieveIssuesRepo.fulfilled, (state, action) => {
      if (action.payload) {
        const rez = state.arrRepoData.find(
          (item) => item.fullName === state.currentRepoTitle
        );
        if (rez) {
          rez.doneState.taskList = action.payload.doneState;
          rez.progressState.taskList = action.payload.progressState;
          rez.todoState.taskList = action.payload.todoState;
        }
      }
    });
  },
});

export const { moveCard, setCurrentTitle } = repoDataSlice.actions;

export default repoDataSlice.reducer;
