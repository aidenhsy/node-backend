import { unauthorizedError } from '@yousico/common';
import { AppDataSource, Employee, UserAttachment } from '@yousico/yousi-orm';
import { Resolvers, UsersFilter } from '../../codegen/__generated__/graphql';
import { yousiSql } from '../../../config/db';
import { UserAttachmentMap } from '../../../lib/mapping';
import { nanoid } from 'nanoid';
import moment from 'moment';
export const userQueryResolvers: Resolvers = {
  Query: {
    user: async (_root: any, _input: any, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const userinfo = await AppDataSource.getRepository(Employee).findOne({
        where: {
          id: user.id,
        },
      });
      return userinfo;
    },

    userById: async (_root: any, { id }: { id: string }, { user }: any) => {
      const userInfo = await AppDataSource.getRepository(Employee).findOne({
        where: {
          id: id,
        },
        relations: {
          department: true,
        },
      });
      return userInfo;
    },

    userAttachmentsById: async (_root: any, { id }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }

      const usersRes = await AppDataSource.getRepository(Employee)
        .createQueryBuilder('employee')
        .where('employee.id = :id', { id })
        .leftJoinAndSelect('employee.user_attachments', 'user_attachments')
        .orderBy('user_attachments.created_time', 'DESC')
        .getOne();

      const remap = Object.values(UserAttachmentMap).map((item) => {
        const attachmentContents = usersRes.user_attachments.filter(
          (res) => res.kind === item.kind
        );
        return {
          key: item.id.toString(),
          name: item.value,
          kind: item.kind,
          isMulti: item.isMulti,
          attachmentContents,
        };
      });

      return remap;
    },

    users: async (_root: any, { take, skip, filter }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const usersRepo = AppDataSource.getRepository(Employee);

      // Start with a base query
      let query = usersRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'user_roles')
        .leftJoinAndSelect('user.department', 'user_departments')
        .leftJoinAndSelect('user.attendances', 'user_attendances')
        .take(take)
        .skip(skip);

      if (filter?.roles) {
        query = query.andWhere(`user_roles.label IN (:...roles)`, {
          roles: filter.roles,
        });
      }

      if (filter?.birthday_months) {
        const months = filter.birthday_months.join(',');
        query = query.andWhere(`DATE_FORMAT(birthday, '%m') IN (${months})`);
      }

      if (filter?.search_term) {
        query = query.andWhere(
          'user.name LIKE :searchTerm OR user.mobile LIKE :searchTerm',
          { searchTerm: `%${filter.search_term}%` }
        );
      }

      // department filter
      if (filter?.department_id) {
        query = query.andWhere('user.department_id IN (:...department_id)', {
          department_id: filter.department_id,
        });
      }

      // employee_type filter
      if (filter?.employee_type) {
        query = query.andWhere('user.employee_type IN (:...employee_type)', {
          employee_type: filter.employee_type,
        });
      }

      // job_title filter
      if (filter?.job_title) {
        query = query.andWhere('user.job_title IN (:...job_title)', {
          job_title: filter.job_title,
        });
      }

      // status filter
      if (filter?.status) {
        query = query.andWhere('user.status IN (:...status)', {
          status: filter.status,
        });
      }

      if (filter?.gender_id) {
        query = query.andWhere('user.gender_id IN (:...gender_id)', {
          gender_id: filter.gender_id,
        });
      }

      // birthday start && birthday end
      if (filter?.birthday_range) {
        query = query.andWhere(
          `DATE_FORMAT(user.birthday, '%m-%d') BETWEEN :start AND :end`,
          { start: filter.birthday_range[0], end: filter.birthday_range[1] }
        );
      }

      // hire anniversary
      if (filter?.hire_anniversary) {
        query = query.andWhere(
          `DATE_FORMAT(user.hire_date, '%m-%d') BETWEEN :start AND :end`,
          { start: filter.hire_anniversary[0], end: filter.hire_anniversary[1] }
        );
      }

      // hire start && hire end
      if (filter?.hire_dates) {
        query = query.andWhere(
          `user.hire_date BETWEEN :hire_start AND :hire_end`,
          { hire_start: filter.hire_dates[0], hire_end: filter.hire_dates[1] }
        );
      }
      // filter application
      if (filter?.application) {
        query = query.andWhere('user.application IN (:...application)', {
          application: filter.application,
        });
      }
      // filter application_status
      if (filter?.application_status) {
        query = query.andWhere(
          'user.application_status IN (:...application_status)',
          {
            application_status: filter.application_status,
          }
        );
      }
      // filter departure_type
      if (filter?.departure_type) {
        query = query.andWhere('user.departure_type IN (:...departure_type)', {
          departure_type: filter.departure_type,
        });
      }
      // actual_overboard_time start && actual_overboard_time end
      if (filter?.actual_overboard_time) {
        query = query.andWhere(
          `user.actual_overboard_time BETWEEN :start AND :end`,
          {
            start: filter.actual_overboard_time[0],
            end: filter.actual_overboard_time[1],
          }
        );
      }
      // actual_conversion_time start && actual_conversion_time end
      if (filter?.actual_conversion_time) {
        query = query.andWhere(
          `user.actual_conversion_time BETWEEN :start AND :end`,
          {
            start: filter.actual_conversion_time[0],
            end: filter.actual_conversion_time[1],
          }
        );
      }

      // 根据考勤组id过滤
      if (filter?.groupIds && filter?.groupIds.length) {
        query = query.andWhere('user.attendance_group_id IN (:...groupIds)', { groupIds: filter.groupIds });
      }

      const [users, totalCount] = await query.getManyAndCount();

      return { items: users, totalCount };
    },

    usersByDepartmentId: async (
      _root: any,
      { department_id, take, skip },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const [res] = await yousiSql.execute(
        `CALL get_child_departments('${department_id}');`
      );
      const deptIds = res[0].map((e) => e.id);
      const resData = await AppDataSource.getRepository(Employee)
        .createQueryBuilder('employee')
        .leftJoin('employee.department', 'department')
        .where('department.id IN (:...deptIds)', { deptIds })
        .skip(skip)
        .take(take)
        .getManyAndCount();
      const [items, totalCount] = resData;
      return { items, totalCount };
    },
  },

  Mutation: {
    createUser: async (_root: any, { createFields }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const employeeRepo = AppDataSource.getRepository(Employee);

      const id = nanoid();
      const newEmployee = new Employee();
      const fieldsToCreate = [
        'department_id',
        'hire_date',
        'mobile',
        'name',
        'status',
      ];
      newEmployee.id = id;
      for (let field of fieldsToCreate) {
        if (createFields?.[field]) {
          newEmployee[field] = createFields[field];
        }
      }
      await employeeRepo.save(newEmployee);
      return await employeeRepo.findOneBy({ id });
    },

    updateUser: async (_root: any, { id, updateFields }, { user }) => {
      const usersRepo = AppDataSource.getRepository(Employee);

      // Start with a base query
      let updateUser = await usersRepo.findOneBy({ id });

      const fieldsToUpdate = [
        'application',
        'application_status',
        'avatar',
        'actual_conversion_time',
        'actual_overboard_time',
        'bank_account_number',
        'bank_name',
        'basic_salary',
        'basic_salary_monthly',
        'birthday',
        'cancel_onboarding_notes',
        'cancel_onboarding_reason',
        'create_time',
        'department_id',
        'departure_notes',
        'departure_type',
        'email',
        'employee_form_status',
        'employee_no',
        'employee_type',
        'en_name',
        'entered_workforce_date',
        'ethnicity',
        'family_address',
        'gender',
        'health_card_end',
        'health_card_image',
        'health_card_no',
        'health_card_start',
        'hire_date',
        'hukou_location',
        'hukou_type',
        'id',
        'id_number',
        'id_photo',
        'id_photo_em_side',
        'id_photo_po_side',
        'id_type',
        'isAdmin',
        'job_title',
        'last_day',
        'manager_id',
        'martial_status',
        'medical_insurance',
        'mobile',
        'name',
        'native_region',
        'open_id',
        'overboard_note',
        'personal_email',
        'primary_emergency_contact',
        'probation_months',
        'provident_fund_account',
        'salary_account',
        'salary_type',
        'social_security_account',
        'status',
        'title_id',
        'update_time',
        'user_id',
        'work_age_type',
        'work_location',
      ];

      for (let field of fieldsToUpdate) {
        if (updateFields?.[field]) {
          updateUser[field] = updateFields[field];
        }
      }

      const updatedUser = await usersRepo.save(updateUser);
      // added status to updated user
      return updatedUser;
    },

    deleteUser: async (_root: any, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const employeeRepo = await AppDataSource.getRepository(Employee);
      const deleteUser = await employeeRepo.findOneBy({ id });
      if (deleteUser) {
        await employeeRepo.remove(deleteUser);
        return true;
      }
      return false;
    },
    deleteUserAttachment: async (_root: any, { id }, { user }) => {
      const attachmentRepo = await AppDataSource.getRepository(UserAttachment);
      const deleteAttachemnt = await attachmentRepo.findOneBy({ id });
      if (deleteAttachemnt) {
        await attachmentRepo.remove(deleteAttachemnt);
        return true;
      } else {
        return false;
      }
    },
  },

  User: {
    attendances: async (user, { }, { }, { variableValues: { filter } }: any) => {
      const thisUser = await AppDataSource.getRepository(Employee).findOne({
        where: { id: user.id },
        relations: {
          attendances: true,
        },
      });
      if (filter?.attendanceDate) {
        const startDate = filter.attendanceDate
        const endDate = moment(startDate).add(1, 'months').format('YYYY-MM')
        return thisUser.attendances.filter((one) => new Date(one.date) >= new Date(startDate) && new Date(one.date) < new Date(endDate))
      }
      return thisUser.attendances;
    },
  },
  // User: {
  //   application: (user) => {
  //     const applicationid = Number(user.application);
  //     return ApplicationMap[applicationid];
  //   },

  //   application_status: (user) => {
  //     const applicationStatusId = Number(user.application_status);
  //     return ApplicationStatusMap[applicationStatusId];
  //   },

  //   cancel_onboarding_reason: (user) => {
  //     const corId = Number(user.cancel_onboarding_reason);
  //     return CancelOnboardingReasonMap[corId];
  //   },

  //   employee_form_status: (user) => {
  //     const formstatusId = Number(user.employee_form_status);
  //     return EmployeeFormStatusMap[formstatusId];
  //   },

  //   employee_type: (user) => {
  //     const employeeTypeId = Number(user.employee_type);
  //     return EmployeeTypeMap[employeeTypeId];
  //   },

  //   ethnicity: (user) => {
  //     const ethnicityId = Number(user.ethnicity);
  //     return EthnicityMap[ethnicityId];
  //   },

  //   department: async (user) => {
  //     const res = await AppDataSource.getRepository(Employee).findOne({
  //       where: {
  //         id: user.id,
  //       },
  //       relations: {
  //         department: true,
  //       },
  //     });
  //     return res.department;
  //   },

  //   gender: (user) => {
  //     const genderid = Number(user.gender_id);
  //     return GenderMap[genderid];
  //   },

  //   hukou_type: (user) => {
  //     const hukoutypeId = Number(user.hukou_type);
  //     return HukouTypeMap[hukoutypeId];
  //   },

  //   id_type: (user) => {
  //     const idTypeId = Number(user.id_type);
  //     return IdTypeMap[idTypeId];
  //   },

  //   martial_status: (user) => {
  //     const martialStatusId = Number(user.martial_status);
  //     return MartialStatusMap[martialStatusId];
  //   },

  //   roles: async (user) => {
  //     const res = await AppDataSource.getRepository(Employee).findOne({
  //       where: {
  //         id: user.id,
  //       },
  //       relations: {
  //         roles: true,
  //       },
  //     });
  //     // sort() modifies the original array directly
  //     res.roles.sort((a, b) => a.ranking - b.ranking);
  //     return res.roles;
  //   },

  //   status: (user) => {
  //     const statusId = Number(user.status);
  //     return StatusMap[statusId];
  //   },
  // },
};
