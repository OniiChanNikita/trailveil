import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";
import { ThemeProvider } from './providers/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);