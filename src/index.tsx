import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryCt = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <QueryClientProvider client={queryCt}>
      <App />
    </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
