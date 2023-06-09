import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './core/App/App';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <CssBaseline />
    <App />
  </>
);
