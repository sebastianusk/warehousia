import { InMemoryCache, makeVar } from '@apollo/client';

type DataMe =
  | {
      username: string;
      role: string;
      warehouses: string[];
    }
  | {};

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

export const dataMeVar = makeVar<DataMe>({});

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        dataMe: {
          read() {
            return dataMeVar();
          },
        },
      },
    },
  },
});
