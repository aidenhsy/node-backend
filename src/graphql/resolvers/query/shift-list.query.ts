import { Resolvers, SortOption } from '../../codegen/__generated__/graphql';
import { AppDataSource, ShiftList } from '@yousico/yousi-orm';
import { nanoid } from 'nanoid';
import { unauthorizedError } from '@yousico/common';
// import { AttendanceGroupShifts } from '@yousico/yousimy';

export const shiftListQueryResolvers: Resolvers = {
  Query: {
    shiftLists: async (_root: any, { take, skip, filter }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const shiftListRepo = AppDataSource.getRepository(ShiftList);
      let query = shiftListRepo
        .createQueryBuilder('shiftList')
        .take(take)
        .skip(skip);

      if (filter?.created_by) {
        query.andWhere('shiftList.created_by = :created_by', {
          created_by: `${filter.created_by}`,
        });
      }

      if (filter?.search_term) {
        query.andWhere('shiftList.shift_name LIKE :shift_name', {
          shift_name: `%${filter.search_term}%`,
        });
      }

      if (filter?.sort_by) {
        switch (filter.sort_by) {
          case SortOption.UpdatedAtAsc:
            query.orderBy('shiftList.updated_at', 'ASC');
            break;
          case SortOption.UpdatedAtDesc:
            query.orderBy('shiftList.updated_at', 'DESC');
            break;
          case SortOption.CreatedAtAsc:
            query.orderBy('shiftList.created_at', 'ASC');
            break;
          case SortOption.CreatedAtDesc:
            query.orderBy('shiftList.created_at', 'DESC');
            break;
          default:
            console.log('something went wrong in sort by filter');
        }
      }

      const [shiftList, totalCount] = await query.getManyAndCount();

      return { items: shiftList, totalCount };
    },

    shiftById: async (_root: any, { id }, { user }: any) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const shiftListRepo = AppDataSource.getRepository(ShiftList);

      return await shiftListRepo.findOneBy({ id });
    },
  },

  Mutation: {
    createShift: async (_root: any, { createShiftInput }, { user }: any) => {
      // New Shift
      const newShift = new ShiftList();
      newShift.id = nanoid();
      newShift.shift_name = createShiftInput.shift_name;
      // newShift.is_flexible = false;
      // newShift.no_need_off = createShiftInput.no_need_off;
      // newShift.punch_times = 1;
      newShift.created_by = user.id;
      newShift.updated_at = new Date();

      newShift.early_minutes_as_early =
        createShiftInput?.early_minutes_as_early;

      newShift.early_minutes_as_lack = createShiftInput?.early_minutes_as_lack;

      newShift.late_minutes_as_lack = createShiftInput?.late_minutes_as_lack;

      newShift.late_minutes_as_late = createShiftInput?.late_minutes_as_late;

      // newShift.off_delay_minutes = createShiftInput?.off_delay_minutes;

      newShift.off_time = createShiftInput.off_time;

      newShift.on_time = createShiftInput.on_time;

      let data = await AppDataSource.getRepository(ShiftList).save(newShift);

      // if (!!createShiftInput.attendance_group_id) {
      //   const newGropAndShift = new AttendanceGroupShifts()
      //   newGropAndShift.id = nanoid()
      //   newGropAndShift.attendance_group_id = createShiftInput.attendance_group_id
      //   newGropAndShift.shift_list_id = data.id
      //   await AppDataSource.getRepository(AttendanceGroupShifts).save(newGropAndShift)
      // }
      return newShift;
    },
    deleteShift: async (_root: any, { shift_id }, { user }: any) => {
      const shiftRepo = AppDataSource.getRepository(ShiftList);
      const shift = await shiftRepo.findOneBy({
        id: shift_id,
      });
      await shiftRepo.delete({ id: shift_id });
      return shift;
    },
    updateShift: async (
      _root: any,
      { shift_id, updateFields },
      { user }: any
    ) => {
      if (!user) {
        throw unauthorizedError('Missing authentication');
      }
      const shiftRepo = AppDataSource.getRepository(ShiftList);
      const shift = await shiftRepo.findOneBy({ id: shift_id });

      shift.shift_name = updateFields?.shift_name;
      shift.no_need_off = updateFields?.no_need_off;
      shift.early_minutes_as_early = updateFields?.early_minutes_as_early;
      shift.early_minutes_as_lack = updateFields?.early_minutes_as_lack;
      shift.late_minutes_as_lack = updateFields?.late_minutes_as_lack;
      shift.late_minutes_as_late = updateFields?.late_minutes_as_late;
      shift.off_time = updateFields.off_time;
      shift.on_time = updateFields.on_time;
      const punchFields = [
        'early_minutes_as_early',
        'early_minutes_as_lack',
        'late_minutes_as_lack',
        'late_minutes_as_late',
        'off_delay_minutes',
        'off_time',
        'on_advance_minutes',
        'on_time',
      ];

      shift.updated_at = new Date();

      await shiftRepo.save(shift);
      const newShift = await shiftRepo.findOneBy({ id: shift.id });
      return newShift;
    },
  },
};
