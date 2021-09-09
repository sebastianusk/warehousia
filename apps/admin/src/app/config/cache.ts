import { InMemoryCache } from '@apollo/client';

// export const dataMeVar = makeVar<>({});

// eslint-disable-next-line import/prefer-default-export
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // dataMe: {
        //   read() {
        //     return dataMeVar();
        //   },
        // },
      },
    },
  },
});
