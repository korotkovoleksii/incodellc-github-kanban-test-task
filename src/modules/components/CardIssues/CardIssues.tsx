import { Card, CardContent, Typography } from '@mui/material';
import { IIssuesItem } from '../../../shared/interfaces/repoData.interface';

const CardIssues = ({
  title,
  number,
  createdAt,
  typeUser,
  comments,
}: Omit<IIssuesItem, 'assignee' | 'state'>): JSX.Element => {
  const openedDaysAgo = Math.ceil(
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 3600 * 24)
  );
  return (
    <Card>
      <CardContent>
        <Typography>{title}</Typography>
        <Typography>
          {`#${number} opened ${openedDaysAgo} ${
            openedDaysAgo > 1 ? 'days' : 'day'
          } ago `}
        </Typography>
        <Typography></Typography>
        <Typography>{`${typeUser}| Comments: ${comments}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default CardIssues;
