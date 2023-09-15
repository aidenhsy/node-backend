import {
  AppDataSource,
  Attendance,
  AttendanceGroup,
  Department,
  Employee,
} from '@yousico/yousi-orm';
import { Request, Response, Router } from 'express';

const router = Router();

/**
 * 小程序获取考勤信息
 * 主要获取应该打卡的时间地点
 *
 */
router.get('/wechat/attendance', async (req: Request, res: Response) => {
  const { employee_id, date } = req.query;

  const attendance = await AppDataSource.getRepository(Attendance).findOne({
    where: {
      employee_id: employee_id as string,
      date: date as any,
    },
    relations: ['shift', 'attendance_location'],
  });

  const employee = await AppDataSource.getRepository(Employee).findOne({
    where: {
      id: employee_id as string,
    },
    relations: [
      'department',
      'department.attendance_group',
      'department.attendance_group.locations',
    ],
  });

  if (!attendance) {
    return res.status(400).json({ message: '此用户今天没有排班' });
  }
  if (employee.department.attendance_group) {
    return res.status(200).json({
      shift: attendance,
      locations: employee.department.attendance_group.locations,
    });
  }
  res.status(400).json({ message: '此用户不属于任何考勤组' });
});
/**
 * 小程序 打卡动作
 * attType代表打卡是上班还是下班 1 上班  2下班yarn
 * date是打卡日期与时间
 * mobile 打卡手机号
 */
router.post('/wechat/att', async (req: Request, res: Response) => {
  const {
    id,
    clock_in_time,
    clock_out_time,
    date,
    employee_id,
    clock_in_location,
    clock_out_location,
    clock_in_result,
    clock_out_result,
  } = req.body;
  console.log(req.body);
  const attendance = await AppDataSource.getRepository(Attendance).findOne({
    where: { id: id, date: date, employee_id: employee_id },
  });
  if (attendance) {
    attendance.clock_in_time = clock_in_time;
    attendance.clock_out_time = clock_out_time;
    attendance.clock_out_time = clock_out_time;
    attendance.clock_in_location_id = clock_in_location;
    attendance.clock_out_location_id = clock_out_location;
    attendance.clock_in_result = clock_in_result;
    attendance.clock_out_result = clock_out_result;
    if (clock_in_time && clock_out_time) {
      // 将上班时间和下班时间转换为分钟数
      const [startHour, startMinute] = clock_in_time.split(':').map(Number);
      const [endHour, endMinute] = clock_out_time.split(':').map(Number);
      const startTimestamp = startHour * 60 + startMinute;
      const endTimestamp = endHour * 60 + endMinute;
      // 计算时间差（以分钟为单位）
      let workMinutes = endTimestamp - startTimestamp;
      // 忽略分钟部分，只保留小时部分; 如果打卡记录不为缺卡 减少一小时中午休息
      if (
        clock_in_result &&
        clock_in_result !== 4 &&
        clock_out_result &&
        clock_out_result !== 4
      ) {
        attendance.hours_of_attendance = Math.floor(workMinutes / 60) - 1;
      } else {
        attendance.hours_of_attendance = Math.floor(workMinutes / 60);
      }
    }
    try {
      await AppDataSource.getRepository(Attendance).save(attendance);
      res.status(200).json({ msg: 'success' });
    } catch (error) {
      res.status(400).json({ msg: 'fail' });
    }
  } else {
    res.status(400).json({ msg: '未找到匹配班次' });
  }
});

export { router as wechatAttendanceRouter };
