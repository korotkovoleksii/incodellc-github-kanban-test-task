import { Box, Typography } from '@mui/material';
import { IIssuesItem } from '../../../shared/interfaces/repoData.interface';
import CardIssues from '../CardIssues/CardIssues';

const CardListIssues = ({
  todoState,
  titleList,
}: {
  todoState: IIssuesItem[];
  titleList: string;
}): JSX.Element => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {titleList}
      <Box
        sx={{
          width: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#CED4DA',
          pt: '15px',
          pb: '15px',
          minHeight: 600,
          maxHeight: 600,
          overflow: 'hidden',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Box
          sx={{
            width: 215,
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {todoState.map((item) => (
            <CardIssues {...item} key={item.number} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardListIssues;
