import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import {jwtDecode} from 'jwt-decode';

const fetchConfig = () => {
  return fetch('/config.js')
    .then(response => response.text())
    .then(text => {
      eval(text); // Evaluates the config.js script and populates window.APP_CONFIG
      return window.APP_CONFIG;
    });
};

const fetchToken = async (config) => {
  const response = await fetch(config.TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET
    })
  });
  const data = await response.json();
  return data.access_token;
};

const createApolloClient = async () => {
  const config = await fetchConfig();
  let token = await fetchToken(config);

  const httpLink = new HttpLink({ uri: config.GRAPHQL_ENDPOINT });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const isTokenValidOrUndefined = async () => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000;
  };

  const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'access_token',
    isTokenValidOrUndefined,
    fetchAccessToken: () => fetchToken(config),
    handleFetch: (newToken) => {
      token = newToken;
    },
    handleError: (err) => {
      console.warn('Your refresh token is invalid. Try to relogin');
      console.error(err);
    }
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([tokenRefreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;