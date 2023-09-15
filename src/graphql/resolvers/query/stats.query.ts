import { Resolvers } from '../../codegen/__generated__/graphql';
import { AppDataSource, Employee } from '@yousico/yousi-orm';
import moment from 'moment';
import { unauthorizedError } from '@yousico/common';

export const statsQueryResolvers: Resolvers = {
  Query: {
    birthdayStats: async (_root: any, { date }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const usersRepo = await AppDataSource.getRepository(Employee);
      const today_date = date ? date : moment().format('YYYY-MM-DD');

      // 今天的生日 Count
      const todayCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.birthday, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          { start: today_date, end: today_date }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 本周一到周日的生日 Count
      const thisWeekCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.birthday, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('week').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('week').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 本月1号到最后一天的生日 Count
      const thisMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.birthday, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('month').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('month').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 上月1号到最后一天的生日 Count
      const lastMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.birthday, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date)
              .subtract(1, 'month')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end: moment(today_date)
              .subtract(1, 'month')
              .endOf('month')
              .format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 下月1号到最后一天的生日 Count
      const nextMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.birthday, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date)
              .add(1, 'month')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end: moment(today_date)
              .add(1, 'month')
              .endOf('month')
              .format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      return {
        todayCount,
        thisWeekCount,
        thisMonthCount,
        lastMonthCount,
        nextMonthCount,
      };
    },

    hireDateStats: async (_root: any, { date }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const usersRepo = await AppDataSource.getRepository(Employee);
      const today_date = date ? date : moment().format('YYYY-MM-DD');

      // 今天的生日 Count
      const todayCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          { start: today_date, end: today_date }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 本周一到周日的生日 Count
      const thisWeekCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('week').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('week').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 本月1号到最后一天的生日 Count
      const thisMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('month').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('month').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 上月1号到最后一天的生日 Count
      const lastMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date)
              .subtract(1, 'month')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end: moment(today_date)
              .subtract(1, 'month')
              .endOf('month')
              .format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      // 下月1号到最后一天的生日 Count
      const nextMonthCount = await usersRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date)
              .add(1, 'month')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end: moment(today_date)
              .add(1, 'month')
              .endOf('month')
              .format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=2')
        .getCount();

      return {
        todayCount,
        thisWeekCount,
        thisMonthCount,
        lastMonthCount,
        nextMonthCount,
      };
    },

    hrStats: async (_root: any, _input: any, { user }) => {
      const userRepo = await AppDataSource.getRepository(Employee);
      const isEmployedCount = await userRepo.countBy({ status: 2 });
      const regularEmployeeCount = await userRepo.countBy({
        status: 2,
        employee_type: 1,
      });
      const internEmployeeCount = await userRepo.countBy({
        status: 2,
        employee_type: 2,
      });
      const outsourcedEmployeeCount = await userRepo.countBy({
        status: 2,
        employee_type: 4,
      });
      const trialEmployeeCount = await userRepo.countBy({
        status: 2,
        application_status: 2
      });
      const awaitUnemployCount = await userRepo.countBy({ status: 4 });
      const notEmployedCount = await userRepo.countBy({ status: 5 });

      return {
        isEmployedCount,
        regularEmployeeCount,
        internEmployeeCount,
        outsourcedEmployeeCount,
        trialEmployeeCount,
        awaitUnemployCount,
        notEmployedCount,
      };
    },
    hrOnboardingStats: async (_root: any, _input: any, { user }) => {
      const userRepo = await AppDataSource.getRepository(Employee);
      const today_date = moment().format('YYYY-MM-DD');

      // 全部待入职数量
      const awaitOnboardingCount = await userRepo.countBy({ status: 1 });

      // 今日待入职数量
      const todayAwaitOnboardingCount = await userRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          { start: today_date, end: today_date }
        )
        .andWhere('employee.status=1')
        .getCount();

      // 本月待入职数量
      const thisMonthAwaitOnboardingCount = await userRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.hire_date, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('month').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('month').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.status=1')
        .getCount();

      return {
        awaitOnboardingCount,
        todayAwaitOnboardingCount,
        thisMonthAwaitOnboardingCount,
      };
    },
    hrConversionStats: async (_root: any, _input: any, { user }) => {
      const userRepo = await AppDataSource.getRepository(Employee);
      const today_date = moment().format('YYYY-MM-DD');

      // 全部待转正
      const awaitRegularizedCount = await userRepo.countBy({ application_status: 2 });

      // 超期未转正
      const overdueRegularizedCount = await userRepo
        .createQueryBuilder('employee')
        .andWhere(`DATE_FORMAT(employee.actual_conversion_time, '%m-%d') > DATE_FORMAT(:targetDate, '%m-%d')`, {
          targetDate: today_date
        })
        .andWhere('employee.application_status=2')
        .getCount();
      // 本月待转正
      const thisMonthAwaitRegularizedCount = await userRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.actual_conversion_time, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date).startOf('month').format('YYYY-MM-DD'),
            end: moment(today_date).endOf('month').format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.application_status=2')
        .getCount();
      // 下月待转正
      const nextMonthAwaitRegularizedCount = await userRepo
        .createQueryBuilder('employee')
        .andWhere(
          `DATE_FORMAT(employee.actual_conversion_time, '%m-%d') BETWEEN DATE_FORMAT(:start, '%m-%d') AND DATE_FORMAT(:end, '%m-%d')`,
          {
            start: moment(today_date)
              .add(1, 'month')
              .startOf('month')
              .format('YYYY-MM-DD'),
            end: moment(today_date)
              .add(1, 'month')
              .endOf('month')
              .format('YYYY-MM-DD'),
          }
        )
        .andWhere('employee.application_status=2')
        .getCount();
      return {
        awaitRegularizedCount,
        overdueRegularizedCount,
        thisMonthAwaitRegularizedCount,
        nextMonthAwaitRegularizedCount
      };
    },
    hrResignStats: async (_root: any, _input: any, { user }) => {
      const userRepo = await AppDataSource.getRepository(Employee);
      // 全部待离职
      const awaitHiredCount = await userRepo.countBy({ status: 4 });
      return {
        awaitHiredCount,
      };
    },
  },
};
