import { Router } from 'express';
import { createClient } from '../../../config/sms.config';
import * as $Dysmsapi from '@alicloud/dysmsapi20170525';
import { RuntimeOptions } from '@alicloud/tea-util';
import { AppDataSource, Employee } from '@yousico/yousi-orm';

const router = Router();

router.post('/resend-sms', async (req, res) => {
  const { employee_id } = req.body;
  try {
    const employee = await AppDataSource.getRepository(Employee).findOneBy({
      id: employee_id,
    });
    // sms
    const smsClient = createClient(
      'LTAI5t5ieoenJagCb4328EUi',
      '0Y8DFftWD4wdg5SOy0ksYClGLDLBgs'
    );
    const sendSmsRequest = new $Dysmsapi.SendSmsRequest({
      phoneNumbers: employee.mobile.split(' ')[1],
      signName: '大连火炙餐饮管理有限公司',
      templateCode: 'SMS_462045133',
      templateParam: `{"name":"${employee.name}","query":"?${employee_id}"}`,
    });
    const runtime = new RuntimeOptions({});
    await smsClient.sendSmsWithOptions(sendSmsRequest, runtime);
    return res.status(200).json({ message: '重新发送成功' });
  } catch (error) {
    return res.status(400).json({ message: '重新发送失败' });
  }
});

export { router as reSendSmsRouter };
