import { unauthorizedError } from '@yousico/common';
import { yousiSql } from '../../../config/db';
import numeral from 'numeral';
import { Resolvers } from '../../codegen/__generated__/graphql';

interface SalesData {
  name: string;
  amount: string;
  children?: SalesData[];
}

interface SalesSummaryQueryResult {
  salesData: SalesData[];
}

export const salesSummaryQueryResolvers: Resolvers = {
  Query: {
    salesSummary: async (
      _root: any,
      input: any,
      { user }: any
    ): Promise<SalesSummaryQueryResult> => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const { shop_ids, start_date, end_date } = input;
      const [resData] = await yousiSql.execute(
        `CALL GetDailySalesSummary('${shop_ids}', '${start_date}', '${end_date}')`
      );
      const data: any[] = resData[0];

      // 总收入 = 外卖总额 + 堂食总额
      const 总收入 = data.reduce(
        (acc: number, cur: any) => acc + Number(cur.total_revenue),
        0
      );
      const 外卖总额 = data
        .filter((e) => e.de_from === '11' || e.de_from === '13')
        .reduce((acc, cur) => acc + Number(cur.total_revenue), 0);
      const 堂食总收入 = data
        .filter((e) => e.de_from !== '11' && e.de_from !== '13')
        .reduce((acc, cur) => acc + Number(cur.total_revenue), 0);

      // 实际收入 = 堂食净收入 + 外卖净额
      const 实际收入 = data.reduce(
        (acc, cur) => acc + Number(cur.total_income),
        0
      );
      const 外卖净额 = data
        .filter((e) => e.de_from === '11' || e.de_from === '13')
        .reduce((acc, cur) => acc + Number(cur.total_income), 0);
      const 堂食净收入 = 实际收入 - 外卖净额;

      // 活动收入 = 美团点评活动 + 抖音活动 + 招行活动 + 交行活动 + 建行活动 + 大厦活动额
      const 美团点评活动 = data
        .filter((e) => e.payway_name.includes('美团'))
        .filter(
          (e) =>
            e.payway_name !== '美团外卖补贴' &&
            e.payway_name !== '美团外卖' &&
            e.payway_name !== '美团外卖支付'
        )
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 抖音活动 = data
        .filter((e) => e.payway_name.includes('抖音'))
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 招行活动 = data
        .filter((e) => e.payway_name.includes('招'))
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 交行活动 = data
        .filter((e) => e.payway_name.includes('交通'))
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 建行活动 = data
        .filter((e) => e.payway_name.includes('建'))
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 大厦活动额 = data
        .filter(
          (e) =>
            e.payway_name.includes('大厦') ||
            e.payway_name.includes('安盛') ||
            e.payway_name.includes('亿合城') ||
            e.payway_name.includes('时代')
        )
        .reduce((acc, cur) => acc + Number(cur.income_money), 0);
      const 活动金额 =
        大厦活动额 + 交行活动 + 建行活动 + 抖音活动 + 招行活动 + 美团点评活动;
      return {
        // [BUG] 总折扣金额， 现金收入， 总刷卡额， CRM会员消费， 微信收入， 支付宝收入 没有写入
        salesData: [
          {
            name: '总收入',
            amount: numeral(总收入).format('0,0.00'),
            children: [
              {
                name: '堂食总收入',
                amount: numeral(堂食总收入).format('0,0.00'),
              },
              { name: '外卖总额', amount: numeral(外卖总额).format('0,0.00') },
            ],
          },
          {
            name: '实际收入',
            amount: numeral(实际收入).format('0,0.00'),
            children: [
              {
                name: '堂食净收入',
                amount: numeral(堂食净收入).format('0,0.00'),
              },
              {
                name: '外卖净额',
                amount: numeral(外卖净额).format('0,0.00'),
              },
            ],
          },
          {
            name: '活动金额',
            amount: numeral(活动金额).format('0,0.00'),
            children: [
              {
                name: '美团点评活动',
                amount: numeral(美团点评活动).format('0,0.00'),
              },
              {
                name: '抖音活动',
                amount: numeral(抖音活动).format('0,0.00'),
              },
              {
                name: '招行活动',
                amount: numeral(招行活动).format('0,0.00'),
              },
              {
                name: '交行活动',
                amount: numeral(交行活动).format('0,0.00'),
              },
              {
                name: '建行活动',
                amount: numeral(建行活动).format('0,0.00'),
              },
              {
                name: '大厦活动额',
                amount: numeral(大厦活动额).format('0,0.00'),
              },
            ],
          },
        ],
      };
    },
  },
};
