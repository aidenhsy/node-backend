import { Resolvers } from '../../codegen/__generated__/graphql';

export const testQueryResolvers: Resolvers = {
  Query: {
    test: () => {
      return 'hello world!';
    },
  },
};
