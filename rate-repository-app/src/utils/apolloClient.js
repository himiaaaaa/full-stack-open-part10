import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';

console.log(Constants.expoConfig.extra)

const httpLink = createHttpLink({
   uri: Constants.expoConfig.extra.apolloUri,
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;