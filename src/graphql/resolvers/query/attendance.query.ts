import { AppDataSource, Attendance, Employee } from '@yousico/yousi-orm';
import { Resolvers } from '../../codegen/__generated__/graphql';
import { nanoid } from 'nanoid';
import { In } from 'typeorm';

export const attendanceQueryResolvers: Resolvers = {
  Query: {
    attendances: async (_root: any, _args: any, { user }: any) => {
      const attendances = await AppDataSource.getRepository(Attendance).find();
      return attendances;
    },
    statisticsDay: async (
      _root: any,
      { statisticsDayInput, take, skip },
      { user }: any
    ) => {
      const attendanceRes = await AppDataSource.getRepository(Attendance);
      const employee = await AppDataSource.getRepository(Employee);
      let query = attendanceRes
        .createQueryBuilder('attendance')
        .take(take)
        .skip(skip);

      if (statisticsDayInput?.date) {
        query = query.andWhere('attendance.date = :date', {
          date: statisticsDayInput.date,
        });
      }

      const [items, totalCount] = await query.getManyAndCount();
      return { items, totalCount };
    },
  },
  Mutation: {
    createAttendances: async (
      _root: any,
      { createAttendanceInput },
      { user }: any
    ) => {
      const attendanceRepo = AppDataSource.getRepository(Attendance);
      try {
        for (let input of createAttendanceInput) {
          const existAttendance = await attendanceRepo.findOne({
            where: { date: input.date, employee_id: input.employee_id },
          });
          if (existAttendance && input.shift_id !== '') {
            existAttendance.shift_id = input.shift_id;
            await attendanceRepo.save(existAttendance);
          } else if (existAttendance && input.shift_id === '') {
            await attendanceRepo.remove(existAttendance);
          } else {
            const newAttendance = new Attendance();
            newAttendance.id = nanoid();
            newAttendance.date = input.date;
            newAttendance.shift_id = input.shift_id;
            newAttendance.employee_id = input.employee_id;
            await attendanceRepo.save(newAttendance);
          }
        }
        return { message: 'success', statusCode: 200 };
      } catch (err) {
        console.log(err);
        return { message: 'failed', statusCode: 400 };
      }
    },
    updateAttendance: async (
      _root: any,
      { updateAttendanceInput },
      { user }: any
    ) => {
      const attendanceRepo = AppDataSource.getRepository(Attendance);
      try {
        const { date, employee_id, clock_in_time, clock_out_time } =
          updateAttendanceInput;
        const updateAddendacne = await attendanceRepo.findOne({
          where: {
            date,
            employee_id,
          },
          relations: {
            shift: true,
          },
        });
        const { shift } = updateAddendacne;
        const {
          on_time,
          off_time,
          late_minutes_as_lack,
          late_minutes_as_late,
          early_minutes_as_lack,
          early_minutes_as_early,
        } = shift;

        const getMinutes = (time: string) => {
          const [hour, minute] = time.split(':').map(Number);
          return hour * 60 + minute;
        };

        if (clock_in_time) {
          // 修改上班打卡时间和结果 1:正常 3:迟到 4:缺卡
          const clockInMinutes =
            getMinutes(clock_in_time) - getMinutes(on_time);
          updateAddendacne.clock_in_time = clock_in_time;
          updateAddendacne.clock_in_result =
            clockInMinutes > late_minutes_as_lack
              ? 4
              : late_minutes_as_late
              ? 3
              : 1;
        }
        if (clock_out_time) {
          // 修改下班打卡时间和结果 1:正常 2:早退 4:缺卡
          const clockOutMinutes =
            getMinutes(off_time) - getMinutes(clock_out_time);
          updateAddendacne.clock_out_time = clock_out_time;
          updateAddendacne.clock_out_result =
            clockOutMinutes > early_minutes_as_lack
              ? 4
              : early_minutes_as_early
              ? 2
              : 1;
        }

        if (updateAddendacne.clock_in_time && updateAddendacne.clock_out_time) {
          // 工作时长
          const workMinutes =
            getMinutes(updateAddendacne.clock_out_time) -
            getMinutes(updateAddendacne.clock_in_time);
          updateAddendacne.hours_of_attendance = Math.floor(workMinutes / 60);
          if (
            updateAddendacne.clock_in_result !== 4 &&
            updateAddendacne.clock_out_result !== 4
          ) {
            // 如果打卡结果正常减少休息一小时
            updateAddendacne.hours_of_attendance -= 1;
          }
        }

        await attendanceRepo.save(updateAddendacne);
        return { message: 'success', statusCode: 200 };
      } catch (err) {
        console.log(err);
        return { message: 'failed', statusCode: 400 };
      }
    },
  },
  Attendance: {
    employee: async (attendance) => {
      const thisAttendance = await AppDataSource.getRepository(
        Attendance
      ).findOne({
        where: {
          id: attendance.id,
        },
        relations: {
          employee: true,
        },
      });
      return thisAttendance.employee;
    },
    clock_in_location: async (attendance) => {
      const thisAttendance = await AppDataSource.getRepository(
        Attendance
      ).findOne({
        where: {
          id: attendance.id,
        },
        relations: {
          clock_in_location: true,
        },
      });
      return thisAttendance.clock_in_location;
    },
    clock_out_location: async (attendance) => {
      const thisAttendance = await AppDataSource.getRepository(
        Attendance
      ).findOne({
        where: {
          id: attendance.id,
        },
        relations: {
          clock_out_location: true,
        },
      });
      return thisAttendance.clock_out_location;
    },
    shift: async (attendance) => {
      const thisAttendance = await AppDataSource.getRepository(
        Attendance
      ).findOne({
        where: {
          id: attendance.id,
        },
        relations: {
          shift: true,
        },
      });
      return thisAttendance.shift;
    },
  },
};
