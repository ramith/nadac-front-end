import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apolloClient';
import App from './App';
import './index.css';

const renderApp = async () => {
  const client = await createApolloClient();
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

renderApp();