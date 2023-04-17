import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App/App';
import CssBaseline from '@mui/material/CssBaseline';
import { persistor, store } from './shared/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </>
);
