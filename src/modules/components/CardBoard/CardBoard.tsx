import { Box } from '@mui/material';
import { useAppSelector } from '../../../shared/hooks/redux-hooks';
import CardListIssues from '../CardListIssues/CardListIssues';
import { DragDropContext } from 'react-beautiful-dnd';
const CardBoard = (): JSX.Element => {
  const issuesLists = useAppSelector((state) => state);

  const handleDragEnd = (result) => {
    console.log(result);
  };
  return (
    <>
      {issuesLists.fullName !== '' && (
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
