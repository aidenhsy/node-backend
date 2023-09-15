import { AppDataSource, Employee } from '@yousico/yousi-orm';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import { createClient } from '../../../config/sms.config';
import * as $Dysmsapi from '@alicloud/dysmsapi20170525';
import { RuntimeOptions } from '@alicloud/tea-util';

const router = Router();

router.post('/sms-newemployee', async (req, res) => {
  const { name, mobile, hire_date, employee_type, job_title, department_id, manager_id } =
    req.body;
  const employeeRepo = AppDataSource.getRepository(Employee);
  const existMobile = await employeeRepo.findOne({
    where: { mobile: `+86 ${mobile}` },
  });
  if (existMobile) {
    return res.status(400).json({ error: '该手机号码已被注册' });
  }

  const employee_id = nanoid();
  const newEmployee = new Employee();
  newEmployee.id = employee_id;
  newEmployee.name = name;
  newEmployee.mobile = `+86 ${mobile}`;
  newEmployee.hire_date = hire_date;
  newEmployee.employee_type = employee_type;
  newEmployee.job_title = job_title;
  newEmployee.department_id = department_id;
  newEmployee.manager_id = manager_id;
  newEmployee.status = 6;

  try {
    await AppDataSource.getRepository(Employee).save(newEmployee);
    // sms
    const smsClient = createClient(
      'LTAI5t5ieoenJagCb4328EUi',
      '0Y8DFftWD4wdg5SOy0ksYClGLDLBgs'
    );
    const sendSmsRequest = new $Dysmsapi.SendSmsRequest({
      phoneNumbers: `${mobile}`,
      signName: '大连火炙餐饮管理有限公司',
      templateCode: 'SMS_462045133',
      templateParam: `{"name":"${name}","query":"?${employee_id}"}`,
    });
    const runtime = new RuntimeOptions({});
    const smsRes = await smsClient.sendSmsWithOptions(sendSmsRequest, runtime);
    console.log(smsRes);
    return res.status(200).json(newEmployee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: '新员工数据不符合标准' });
  }
});

export { router as smsNewEmployeeRouter };
