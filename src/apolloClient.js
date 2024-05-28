import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';


const createApolloClient = async () => {
  const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

  const httpLink = new HttpLink({ uri: apiUrl });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;