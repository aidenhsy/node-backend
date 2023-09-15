import { unauthorizedError } from '@yousico/common';
import { Resolvers } from '../../codegen/__generated__/graphql';
import { AppDataSource, Employee } from '@yousico/yousi-orm';

interface SoldItem {
  itemName: string;
  quantity: number;
  income: number;
  lastTotal: number;
}

export const soldItemQueryResolvers: Resolvers = {
  Query: {
    soldItems: async (_root: any, { startDate, endDate }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const currentUser = await AppDataSource.getRepository(Employee).findOne({
        where: { id: user.id },
        relations: { managed_stores: true },
      });
      const shopIds = currentUser.managed_stores.map((info) => info.shop_id);
      const soldItems: SoldItem[] = await AppDataSource.createQueryBuilder()
        .select('si.item_name', 'itemName')
        .addSelect('SUM(si.last_qty)', 'quantity')
        .addSelect('SUM(si.income_money)', 'income')
        .addSelect('SUM(si.last_total)', 'lastTotal')
        .from('solditems', 'si')
        .innerJoin('bills', 'b', 'b.bs_id = si.bs_id')
        .where('b.settle_biz_date BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .andWhere('b.shop_id IN (:...shopIds)', { shopIds })
        .andWhere('si.small_class_name != :className', { className: '备品' })
        .groupBy('si.item_name')
        .getRawMany();
      return soldItems;
    },
  },
};
