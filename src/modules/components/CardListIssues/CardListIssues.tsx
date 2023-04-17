import { Box } from '@mui/material';
import { IIssuesItem } from '../../../shared/interfaces/repoData.interface';
import CardIssues from '../CardIssues/CardIssues';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const CardListIssues = ({
  todoState,
  titleList,
}: {
  todoState: IIssuesItem[];
  titleList: string;
}): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {titleList}
      <Droppable droppableId={titleList}>
        {(provider) => (
          <Box
            {...provider.droppableProps}
            ref={provider.innerRef}
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
              {todoState.map((item, index) => {
                return (
                  <Draggable
                    key={item.number}
                    draggableId={item.number.toString()}
                    index={index}
                  >
                    {(provider) => (
                      <Box
                        key={item.number}
                        ref={provider.innerRef}
                        {...provider.draggableProps}
                        {...provider.dragHandleProps}
                      >
                        <CardIssues {...item} />
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provider.placeholder}
            </Box>
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default CardListIssues;
