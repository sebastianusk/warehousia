import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

// eslint-disable-next-line import/prefer-default-export
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        productLog: {
          read(existing, { args: { offset, limit } }) {
            return existing && existing.slice(offset, offset + limit);
          },
          ...offsetLimitPagination(),
        },
      },
    },
  },
});
