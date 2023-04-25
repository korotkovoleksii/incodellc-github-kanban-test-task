import { Box, Container } from '@mui/material';
import './App.css';
import SearchFormUrl from '../../modules/components/SearchFormUrl/SearchFormUrl';
import CardBoard from '../../modules/components/CardBoard/CardBoard';
import { persistor, store } from '../../shared/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Box>
            <Container>
              <Box>
                <SearchFormUrl />
                <CardBoard />
              </Box>
            </Container>
          </Box>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
