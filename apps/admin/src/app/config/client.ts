import {
  ApolloClient,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { message as messageAntd } from 'antd';
import { useHistory } from 'react-router-dom';
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: process.env.NX_GRAPHQL_HOST,
});

export default function useGraphQLClient(): {
  client: ApolloClient<NormalizedCacheObject>;
  contextHolder: React.ReactElement;
} {
  const history = useHistory();
  const [messageApi, contextHolder] = messageAntd.useMessage();
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('access_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        if (message === 'Unauthorized') {
          localStorage.removeItem('access_token');
          history.push('/login');
        }
        messageApi.error(
          `Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const client = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),
    cache,
    defaultOptions: {
      query: { errorPolicy: 'all', fetchPolicy: 'no-cache' },
      mutate: { errorPolicy: 'all' },
      watchQuery: { errorPolicy: 'all' },
    },
    // typeDefs,
  });
  return { client, contextHolder };
}
