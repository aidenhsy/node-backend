import { Resolvers, SortOption } from '../../codegen/__generated__/graphql';
import {
  AppDataSource,
  AttendanceGroup,
  AttendanceLocation,
  Department,
  Employee,
  ShiftList,
} from '@yousico/yousi-orm';
import { unauthorizedError } from '@yousico/common';
import { nanoid } from 'nanoid';
import { In } from 'typeorm';

export const attGroupQueryResolvers: Resolvers = {
  Query: {
    attGroups: async (_root: any, { take, skip, filter }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }

      const attGroupRepo = AppDataSource.getRepository(AttendanceGroup);
      const query = attGroupRepo
        .createQueryBuilder('attendanceGroup')
        .take(take)
        .skip(skip);

      if (filter?.attendance_group_name) {
        query.andWhere('attendanceGroup.name LIKE :attGroupName', {
          attGroupName: `%${filter.attendance_group_name}%`,
        });
      }

      if (filter?.employee_id) {
        query
          .leftJoin('attendanceGroup.leaders', 'leader')
          .leftJoin('attendanceGroup.sub_leaders', 'subleader')
          .where('leader.id = :employee_id OR subleader.id = :employee_id', {
            employee_id: filter.employee_id,
          });
      }
      query.orderBy('attendanceGroup.updated_at', 'DESC');

      if (filter?.sort_by) {
        switch (filter.sort_by) {
          case SortOption.UpdatedAtAsc:
            query.orderBy('attendanceGroup.updated_at', 'ASC');
            break;
          case SortOption.UpdatedAtDesc:
            query.orderBy('attendanceGroup.updated_at', 'DESC');
            break;
          case SortOption.CreatedAtAsc:
            query.orderBy('attendanceGroup.created_at', 'ASC');
            break;
          case SortOption.CreatedAtDesc:
            query.orderBy('attendanceGroup.created_at', 'DESC');
            break;
          default:
            console.log('something went wrong in sort by filter');
        }
      }

      const [attGroups, totalCount] = await query.getManyAndCount();

      return { items: attGroups, totalCount };
    },

    attGroupById: async (_root: any, { id }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const attGroup = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOneBy({ id });
      return attGroup;
    },
  },

  Mutation: {
    addAttendanceLocation: async (
      _root: any,
      { attendance_group_id, new_location },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const newLocation = new AttendanceLocation();
      newLocation.id = nanoid();
      newLocation.name = new_location.name;
      newLocation.latitude = new_location.latitude;
      newLocation.longitude = new_location.longitude;
      newLocation.attendance_group_id = attendance_group_id;
      await AppDataSource.getRepository(AttendanceLocation).save(newLocation);

      const attendance = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: { id: attendance_group_id },
        relations: { locations: true },
      });
      return attendance.locations;
    },

    createAttendanceGroup: async (_root: any, { attGroupFields }, { user }) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const attRepo = AppDataSource.getRepository(AttendanceGroup);
      let newAttGroup = new AttendanceGroup();

      const attFields = [
        'allow_out_punch',
        'allow_pc_punch',
        'calendar_id',
        'clockIn_need_photo',
        'effect_time',
        'face_punch',
        'gps_range',
        'group_type',
        'hide_staff_punch_time',
        'name',
        'out_punch_allowed_hide_addr',
        'out_punch_need_approval',
        'out_punch_need_photo',
        'out_punch_need_remark',
        'punch_type',
        'rest_clockIn_need_approval',
        'show_cumulative_time',
        'show_over_time',
        'time_zone',
      ];

      for (let field of attFields) {
        if (attGroupFields?.[field]) {
          newAttGroup[field] = attGroupFields[field];
        }
      }

      // bind departments and users
      if (attGroupFields?.members) {
        const dept_ids = attGroupFields.members
          .filter((item) => item.type === 1)
          .map((e) => e.id);

        const employee_ids = attGroupFields.members
          .filter((item) => item.type === 2)
          .map((e) => e.id);

        if (dept_ids.length > 0) {
          const departments = await AppDataSource.getRepository(
            Department
          ).findBy({
            id: In(dept_ids),
          });
          newAttGroup.departments = departments;
        }
      }

      // leaders
      const leaders = await AppDataSource.getRepository(Employee).findBy({
        id: In(attGroupFields.leader_ids),
      });

      newAttGroup.leaders = leaders;

      // sub leaders
      if (attGroupFields?.sub_leader_ids) {
        const sub_leaders = await AppDataSource.getRepository(Employee).findBy({
          id: In(attGroupFields.sub_leader_ids),
        });
        newAttGroup.sub_leaders = sub_leaders;
      }

      newAttGroup.id = nanoid();

      await attRepo.save(newAttGroup);
      // locations
      let att = await attRepo.save(newAttGroup);
      if (att && attGroupFields?.locations) {
        const attLocation = AppDataSource.getRepository(AttendanceLocation);
        attGroupFields?.locations.forEach(async (item: any) => {
          let location = new AttendanceLocation();
          location.address = item.address;
          location.id = nanoid();
          location.attendance_group_id = att.id;
          location.latitude = item.latitude;
          location.longitude = item.longitude;
          location.gps_range = item.gps_range;
          location.name = attGroupFields.name;
          await attLocation.save(location);
        });
      }
      return newAttGroup;
    },

    deleteAttendanceLocation: async (
      _root: any,
      { attendance_location_id },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const attendanceLocationRepo =
        AppDataSource.getRepository(AttendanceLocation);
      const location2Remove = await attendanceLocationRepo.findOneBy({
        id: attendance_location_id,
      });
      await attendanceLocationRepo.remove(location2Remove);
      const attendaceGroup = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: {
          id: location2Remove.attendance_group_id,
        },
        relations: {
          locations: true,
        },
      });
      return attendaceGroup.locations;
    },

    updateAttendanceGroup: async (
      _root: any,
      { attendance_group_id, attGroupFields },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const attRepo = AppDataSource.getRepository(AttendanceGroup);
      let updateAttGroup = await attRepo.findOne({
        where: { id: attendance_group_id },
        relations: { shift_lists: true },
      });

      const attFields = [
        'allow_out_punch',
        'allow_pc_punch',
        'calendar_id',
        'clockIn_need_photo',
        'effect_time',
        'face_punch',
        'gps_range',
        'group_type',
        'hide_staff_punch_time',
        'name',
        'out_punch_allowed_hide_addr',
        'out_punch_need_approval',
        'out_punch_need_photo',
        'out_punch_need_remark',
        'punch_type',
        'rest_clockIn_need_approval',
        'show_cumulative_time',
        'show_over_time',
        'time_zone',
      ];

      for (let field of attFields) {
        if (attGroupFields?.[field]) {
          updateAttGroup[field] = attGroupFields[field];
        }
      }

      // bind departments and users
      if (attGroupFields?.members) {
        const dept_ids = attGroupFields.members
          .filter((item) => item.type === 1)
          .map((e) => e.id);

        const employee_ids = attGroupFields.members
          .filter((item) => item.type === 2)
          .map((e) => e.id);

        if (dept_ids.length > 0) {
          const departments = await AppDataSource.getRepository(
            Department
          ).findBy({
            id: In(dept_ids),
          });
          updateAttGroup.departments = departments;
        } else {
          updateAttGroup.departments = null;
        }
      }

      // leaders
      if (attGroupFields?.leader_ids) {
        const leaders = await AppDataSource.getRepository(Employee).findBy({
          id: In(attGroupFields.leader_ids),
        });

        updateAttGroup.leaders = leaders;
      }

      // sub leaders
      if (attGroupFields?.sub_leader_ids) {
        const sub_leaders = await AppDataSource.getRepository(Employee).findBy({
          id: In(attGroupFields.sub_leader_ids),
        });
        updateAttGroup.sub_leaders = sub_leaders;
      }

      if (attGroupFields?.shift_ids) {
        let newShifts = [];
        for (let shift_id of attGroupFields.shift_ids) {
          const shift = await AppDataSource.getRepository(ShiftList).findOneBy({
            id: shift_id,
          });
          newShifts.push(shift);
        }
        updateAttGroup.shift_lists = newShifts;
      }

      await attRepo.save(updateAttGroup);
      //locations
      if (attGroupFields?.locations) {
        const attLocation = AppDataSource.getRepository(AttendanceLocation);
        attGroupFields?.locations.forEach(async (item: any) => {
          let location = new AttendanceLocation();
          location.attendance_group_id = attendance_group_id;
          location.latitude = item.latitude;
          location.longitude = item.longitude;
          location.gps_range = item.gps_range;
          location.name = attGroupFields.name;
          location.address = item.address;
          if (item.id) {
            location.id = item.id;
          } else {
            location.id = nanoid();
          }
          await attLocation.save(location);
        });
      }
      return updateAttGroup;
    },

    deleteAttendanceGroup: async (
      _root: any,
      { attendance_group_id },
      { user }
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const attGroupRepo = AppDataSource.getRepository(AttendanceGroup);
      const attGroup = await attGroupRepo.findOneBy({
        id: attendance_group_id,
      });
      await attGroupRepo.delete({
        id: attendance_group_id,
      });
      return attGroup;
    },
  },

  AttGroup: {
    bind_head_count: async (attGroup) => {
      let count = 0;
      const departments = await AppDataSource.getRepository(Department).find({
        where: {
          attendance_group_id: attGroup.id,
        },
      });
      if (departments) {
        for (let dept of departments) {
          const departmentHead = await AppDataSource.getRepository(
            Employee
          ).count({
            where: {
              department_id: dept.id,
            },
          });
          count += departmentHead;
        }
      }
      return count;
    },

    leaders: async (attGroup) => {
      const attGroupRes = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: {
          id: attGroup.id,
        },
        relations: {
          leaders: {
            department: true,
          },
        },
      });
      return attGroupRes.leaders;
    },

    sub_leaders: async (attGroup) => {
      const attGroupRes = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: {
          id: attGroup.id,
        },
        relations: {
          sub_leaders: {
            department: true,
          },
        },
      });
      return attGroupRes.sub_leaders;
    },

    locations: async (attGroup) => {
      const attGroupRes = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: {
          id: attGroup.id,
        },
        relations: {
          locations: true,
        },
      });
      return attGroupRes.locations;
    },

    bind_departments: async (attGroup) => {
      const attGroupRes = await AppDataSource.getRepository(
        AttendanceGroup
      ).findOne({
        where: {
          id: attGroup.id,
        },
        relations: {
          departments: true,
        },
      });
      return attGroupRes.departments;
    },

    members: async (attGroup) => {
      const membersFromEmpl = [];
      const membersFromDept = await AppDataSource.getRepository(
        Department
      ).find({
        where: { attendance_group_id: attGroup.id },
        relations: { employees: true },
      });
      if (membersFromDept.length > 0) {
        for (let dept of membersFromDept) {
          membersFromEmpl.push(...dept.employees);
        }
      }

      return membersFromEmpl;
    },

    shift_lists: async (attGroup) => {
      const shifts = await AppDataSource.getRepository(AttendanceGroup).findOne(
        { where: { id: attGroup.id }, relations: { shift_lists: true } }
      );
      return shifts.shift_lists;
    },
  },
};
