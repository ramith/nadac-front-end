import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const fetchConfig = () => {
  return fetch('/config.js')
    .then(response => response.text())
    .then(text => {
      eval(text); // Evaluates the config.js script and populates window.APP_CONFIG
      return window.APP_CONFIG;
    });
};

const createApolloClient = async () => {
  const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

  const httpLink = new HttpLink({ uri: apiUrl });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;