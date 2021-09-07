import { InMemoryCache, makeVar } from '@apollo/client';

type DataMe =
  | {
      username: string;
      role: string;
      warehouses: string[];
    }
  | {};

export const dataMeVar = makeVar<DataMe>({});

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        dataMe: {
          read() {
            return dataMeVar();
          },
        },
      },
    },
  },
});
