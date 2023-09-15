import { AppDataSource, Employee, Store } from '@yousico/yousi-orm';
import { Resolvers } from '../../codegen/__generated__/graphql';
import { In } from 'typeorm';
import { unauthorizedError } from '@yousico/common';

export const storeQueryResolvers: Resolvers = {
  Query: {
    stores: async (_root: any, _args: any, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const stores = await AppDataSource.getRepository(Store).find({
        relations: {
          managers: true,
        },
      });
      return stores;
    },
    storesByEmployee: async (_root: any, { id }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const employeeRepo = AppDataSource.getRepository(Employee);
      const employee = await employeeRepo.findOne({
        where: { id },
        relations: {
          managed_stores: {
            department: true
          },
        }
      });

      return employee.managed_stores;
    },
  },

  Mutation: {
    addAdminsStores: async (
      _root: any,
      { employee_ids, store_ids },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      // 获取 Employee 和 Store 的 repository
      const employeeRepo = AppDataSource.getRepository(Employee);
      const storeRepo = AppDataSource.getRepository(Store);
      // 查找 id 为 employee_id 的员工，并加载其管理的门店
      const employees = await employeeRepo.find({
        where: { id: In(employee_ids) },
      });
      // 查找 store_ids 数组中的所有门店
      const stores = await storeRepo.find({
        where: { shop_id: In(store_ids) },
        relations: {
          managers: true,
        },
      });
      await Promise.all(
        employees.map(async (employee) => {
          employee.managed_stores = stores;
          await employeeRepo.save(employee);
        })
      );
      // 返回更新后员工管理的门店列表
      return stores;
    },
    addStoreAdmins: async (
      _root: any,
      { store_id, employee_ids },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const store = await AppDataSource.getRepository(Store).findOne({
        where: {
          shop_id: store_id,
        },
        relations: {
          managers: true,
        },
      });

      const employees = await AppDataSource.getRepository(Employee).find({
        where: {
          id: In(employee_ids),
        },
      });

      store.managers.push(...employees);
      await AppDataSource.getRepository(Store).save(store);

      return store;
    },
    deleteStoreAdmins: async (
      _root: any,
      { store_id, employee_ids },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const store = await AppDataSource.getRepository(Store).findOne({
        where: {
          shop_id: store_id,
        },
        relations: {
          managers: true,
        },
      });

      const employeesToDelete = await AppDataSource.getRepository(
        Employee
      ).find({
        where: {
          id: In(employee_ids),
        },
      });

      store.managers = store.managers.filter((manager) => {
        return !employeesToDelete.some(
          (employee) => employee.id === manager.id
        );
      });

      await AppDataSource.getRepository(Store).save(store);
      return store;
    },
  },
};
