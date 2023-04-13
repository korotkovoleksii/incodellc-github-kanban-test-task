import { Box, Container } from '@mui/material';
import './App.css';
import SearchFormUrl from '../../modules/components/SearchFormUrl/SearchFormUrl';

function App() {
  return (
    <Box>
      <Container>
        <Box>
          <SearchFormUrl />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
