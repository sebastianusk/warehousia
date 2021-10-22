import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

// eslint-disable-next-line import/prefer-default-export
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: {
          read(existing, { args }) {
            if (args) {
              return (
                existing &&
                existing.slice(args.offset, args.offset + args.limit)
              );
            }
            return existing;
          },
          ...offsetLimitPagination(),
        },
        productLog: {
          read(existing, { args }) {
            if (args) {
              return (
                existing &&
                existing.slice(args.offset, args.offset + args.limit)
              );
            }
            return existing;
          },
          ...offsetLimitPagination(),
        },
        adminLogs: {
          read(existing, { args }) {
            if (args) {
              return (
                existing &&
                existing.slice(args.offset, args.offset + args.limit)
              );
            }
            return existing;
          },
          ...offsetLimitPagination(),
        },
      },
    },
  },
});
