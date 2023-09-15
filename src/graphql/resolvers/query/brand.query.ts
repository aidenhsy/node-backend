import { AppDataSource, Brand, Store } from '@yousico/yousi-orm';
import { Resolvers } from '../../codegen/__generated__/graphql';
import { Like } from 'typeorm';
import { unauthorizedError } from '@yousico/common';

export const brandQueryResolvers: Resolvers = {
  Query: {
    brands: async (_root: any, { brandName }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      if (brandName) {
        return await AppDataSource.getRepository(Brand).find({
          where: {
            name: Like(`%${brandName}%`),
          },
          relations: ['stores', 'stores.managers'],
        });
      }
      const brands = await AppDataSource.getRepository(Brand).find({
        relations: ['stores', 'stores.managers'],
      });
      return brands;
    },
  },
};
