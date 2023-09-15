import { AppDataSource, Employee } from '@yousico/yousi-orm';
// import { AppDataSource, Employee } from '@yousico/yousimy';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

// 小程序登陆
router.post('/wechat/login', async (req: Request, res: Response) => {
  const { phoneNumber, verificationCode } = req.body;

  const employee = await AppDataSource.getRepository(Employee).findOne({
    where: {
      mobile: phoneNumber,
    },
  });
  if (!employee) {
    res.status(400).json({
      code: 4001,
      msg: '员工不存在',
      data: null,
    });
  }

  if (employee.verification_code === verificationCode) {
    res.status(200).json({
      code: 2000,
      msg: '成功',
      data: {
        id: employee.id,
        name: employee.name,
        mobile: phoneNumber,
      },
    });
  } else {
    res.status(403).json({
      code: 4000,
      msg: '验证码错误',
      data: null,
    });
  }
});
router.get('/wechat/user', async (req, res) => {
  const { employee_id } = req.query;
  const employee = await AppDataSource.getRepository(Employee).findOne({
    where: {
      id: employee_id as string,
    },
    relations: ['department', 'department.attendance_group'],
  });
  if (employee) {
    console.log(employee.department);
    res.status(200).json({
      name: employee.name,
      avatar: employee.avatar,
      department: employee.department.name,
      groupName: employee.department.attendance_group?.name,
    });
  } else {
    res.status(400).json({ msg: '未找到该员工' });
  }
});
export { router as wechatLoginRouter };
