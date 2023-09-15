import { Resolvers } from '../../codegen/__generated__/graphql';
import { AppDataSource, Department, Employee } from '@yousico/yousi-orm';
import { yousiSql } from '../../../config/db';
import { unauthorizedError } from '@yousico/common';

export const departmentQueryResolvers: Resolvers = {
  Query: {
    departments: async (_root: any, { take, skip, filter }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const departmentRepo = AppDataSource.getRepository(Department);
      let query = departmentRepo
        .createQueryBuilder('department')
        .take(take)
        .skip(skip);

      if (filter?.name) {
        query = query.andWhere(`department.name LIKE :deptName`, {
          deptName: `%${filter.name}%`,
        });
      }

      const [departments, totalCount] = await query.getManyAndCount();

      return { items: departments, totalCount };
    },

    departmentById: async (_root: any, { id }, { user }: any) => {
      const department = await AppDataSource.getRepository(
        Department
      ).findOneBy({ id });
      return department;
    },
  },

  Department: {
    employees: async (department) => {
      const res = await AppDataSource.getRepository(Employee)
        .createQueryBuilder('employee')
        .innerJoinAndSelect('employee.department', 'department')
        .where('department.id = :department_id', {
          department_id: department.id,
        })
        .getMany();
      return res;
    },
    parent_department: async (department) => {
      const parentDepartment = await AppDataSource.getRepository(
        Department
      ).findOneBy({ id: department.parent_department_id });
      return parentDepartment;
    },
    child_departments: async (department) => {
      const direct_children = await AppDataSource.getRepository(
        Department
      ).find({
        where: {
          parent_department_id: department.id,
        },
        order: {
          ranking: 'ASC',
        },
      });
      return direct_children;
    },
    all_employees: async (department) => {
      const [res] = await yousiSql.execute(
        `CALL get_child_departments('${department.id}');`
      );
      const deptIds = res[0].map((e) => e.id);
      const users = await AppDataSource.getRepository(Employee)
        .createQueryBuilder('employee')
        .leftJoin('employee.department', 'department')
        .where('department.id IN (:...deptIds)', { deptIds })
        .getMany();

      return { items: users, totalCount: users.length };
    },
  },
};
