import { NavXlCategory, Resolvers } from '../../codegen/__generated__/graphql';
import { AppDataSource, Role } from '@yousico/yousi-orm';
import mysql from 'mysql2';
import { unauthorizedError } from '@yousico/common';
import { yousiSql } from '../../../config/db';
import { transformData } from './nav-items.query';
import { nanoid } from 'nanoid';
import { Like } from 'typeorm';

export const roleQueryResolvers: Resolvers = {
  Query: {
    roles: async (_root: any, { name }, { user }: any) => {
      const roles = await AppDataSource.getRepository(Role);
      if (name) {
        return roles.find({
          where: {
            name: Like(`%${name}%`),
          },
          relations: {
            employees: true,
          },
        });
      }
      return roles.find({
        relations: {
          employees: true,
        },
      });
    },
    roleById: async (_root: any, { id }, { user }: any) => {
      const role = await AppDataSource.getRepository(Role).findOne({
        where: {
          id,
        },
        relations: {
          employees: true,
        },
      });
      return role;
    },
  },
  Mutation: {
    createRole: async (_root: any, { name }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const sql = `INSERT INTO roles (id, name) VALUES (?,?);`;
      const formattedSql = mysql.format(sql, [nanoid(), name]);
      await yousiSql.execute(formattedSql);
      const role = await AppDataSource.getRepository(Role).findOne({
        where: {
          name,
        },
        relations: {
          employees: true,
        },
      });
      return role;
    },
    deleteRole: async (_root: any, { role_id }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const rolebyId = await AppDataSource.getRepository(Role);
      const role = rolebyId.findOne({
        where: {
          id: role_id,
        },
        relations: {
          employees: true,
        },
      });
      const deltePromises = ['role_nav_sm_categories', 'employees_roles'].map(
        async (item) => {
          await yousiSql.execute(
            mysql.format(`DELETE FROM ${item} WHERE role_id=?`, [role_id])
          );
        }
      );
      await Promise.all(deltePromises);
      await rolebyId.delete({
        id: role_id,
      });
      return role;
    },
    addEmployee2Roles: async (
      _root: any,
      { role_id, employee_ids },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const insertPromises = employee_ids.map(async (employee_id) => {
        const sql = `INSERT INTO employees_roles (employee_id, role_id) VALUES (?, ?);`;
        const formattedSql = mysql.format(sql, [employee_id, role_id]);
        await yousiSql.execute(formattedSql);
      });

      await Promise.all(insertPromises);
      const role = await AppDataSource.getRepository(Role).findOne({
        where: {
          id: role_id,
        },
        relations: {
          employees: true,
        },
      });

      return role;
    },
    deleteEmployeeRole: async (
      _root: any,
      { role_id, employee_id },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }

      const sql = `DELETE FROM employees_roles WHERE employee_id=? AND role_id=?`;
      const formattedSql = mysql.format(sql, [employee_id, role_id]);
      await yousiSql.execute(formattedSql);

      const role = await AppDataSource.getRepository(Role).findOne({
        where: {
          id: role_id,
        },
        relations: {
          employees: true,
        },
      });
      return role;
    },
    updateRoleNavs: async (
      _root: any,
      { role_id, nav_sm_ids },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const deleteSql = mysql.format(
        'DELETE FROM role_nav_sm_categories WHERE role_id=?',
        [role_id]
      );

      await yousiSql.execute(deleteSql);

      let values = nav_sm_ids.map((id) =>
        mysql.format('(?, ?)', [role_id, id])
      );

      const insertSQL = `INSERT INTO role_nav_sm_categories (role_id, nav_sm_category_id) VALUES ${values.join(
        ','
      )}`;

      await yousiSql.execute(insertSQL);

      const role = await AppDataSource.getRepository(Role).findOne({
        where: {
          id: role_id,
        },
        relations: {
          employees: true,
        },
      });

      return role;
    },
  },
  Role: {
    navs: async (role) => {
      const roleNavs = await AppDataSource.getRepository(Role).findOne({
        where: {
          id: role.id,
        },
        relations: [
          'navSmCategories',
          'navSmCategories.nav_bg_category',
          'navSmCategories.nav_bg_category.nav_xl_category',
        ],
      });
      const transformedNavs = transformData(roleNavs.navSmCategories);
      return transformedNavs as NavXlCategory[];
    },
  },
};
