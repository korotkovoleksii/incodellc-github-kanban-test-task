import { Box } from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../shared/hooks/redux-hooks';
import CardListIssues from '../CardListIssues/CardListIssues';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { moveCard } from '../../../shared/store/RepoData/repoDataSlice';

const CardBoard = (): JSX.Element => {
  const issuesLists = useAppSelector((state) =>
    state.arrRepoData.find((item) => item.fullName === state.currentRepoTitle)
  );
  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (destination && source) {
      dispatch(moveCard({ destination, source }));
    }
  };

  return (
    <>
      {issuesLists && issuesLists.fullName !== '' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <CardListIssues
              todoState={issuesLists.todoState.taskList}
              titleList={issuesLists.todoState.title}
            />
            <CardListIssues
              todoState={issuesLists.progressState.taskList}
              titleList={issuesLists.progressState.title}
            />
            <CardListIssues
              todoState={issuesLists.doneState.taskList}
              titleList={issuesLists.doneState.title}
            />
          </DragDropContext>
        </Box>
      )}
    </>
  );
};

export default CardBoard;
