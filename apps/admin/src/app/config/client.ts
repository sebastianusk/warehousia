import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { cache } from './cache';

export const typeDefs = gql`
  type DataMe {
    username: String
    role: String
    warehouses: [String]
  }
  extend type Query {
    isLoggedIn: Boolean!
    me: DataMe
  }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache,
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  typeDefs,
});
export default client;
