import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import createApolloClient from './apolloClient';
import App from './App';
import './index.css';

const renderApp = async () => {
  const client = await createApolloClient();
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

renderApp();