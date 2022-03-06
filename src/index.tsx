import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryCt = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryCt}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
