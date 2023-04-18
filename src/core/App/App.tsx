import { Box, Container } from '@mui/material';
import './App.css';
import SearchFormUrl from '../../modules/components/SearchFormUrl/SearchFormUrl';
import CardBoard from '../../modules/components/CardBoard/CardBoard';

function App() {
  return (
    <Box>
      <Container>
        <Box>
          <SearchFormUrl />
          <CardBoard />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
