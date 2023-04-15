import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App/App';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './shared/store';
import { Provider } from 'react-redux';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
