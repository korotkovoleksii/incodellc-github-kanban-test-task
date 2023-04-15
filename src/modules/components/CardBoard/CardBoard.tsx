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
              todoState={issuesLists.todoState}
              titleList="ToDo"
            />
            <CardListIssues
              todoState={issuesLists.progressState}
              titleList="In Progress"
            />
            <CardListIssues
              todoState={issuesLists.doneState}
              titleList="Done"
            />
          </DragDropContext>
        </Box>
      )}
    </>
  );
};
export default CardBoard;
