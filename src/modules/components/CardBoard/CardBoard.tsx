import { Box } from '@mui/material';
import { useAppSelector } from '../../../shared/hooks/redux-hooks';
import CardListIssues from '../CardListIssues/CardListIssues';

const CardBoard = (): JSX.Element => {
  const issuesLists = useAppSelector((state) => state);

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
          <CardListIssues todoState={issuesLists.todoState} titleList="ToDo" />
          <CardListIssues
            todoState={issuesLists.progressState}
            titleList="In Progress"
          />
          <CardListIssues todoState={issuesLists.doneState} titleList="Done" />
        </Box>
      )}
    </>
  );
};
export default CardBoard;
