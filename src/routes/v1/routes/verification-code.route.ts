import { Request, Response, Router } from 'express';
import Dysmsapi, * as $Dysmsapi from '@alicloud/dysmsapi20170525';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import { RuntimeOptions } from '@alicloud/tea-util';
import { AppDataSource, Employee } from '@yousico/yousi-orm';
import jwt from 'jsonwebtoken';
import prisma from '../../../config/prisma';

const router = Router();

const createClient = (
  accessKeyId: string,
  accessKeySecret: string
): Dysmsapi => {
  let config = new $OpenApi.Config({
    // 必填，您的 AccessKey ID
    accessKeyId: accessKeyId,
    // 必填，您的 AccessKey Secret
    accessKeySecret: accessKeySecret,
  });
  // 访问的域名
  config.endpoint = `dysmsapi.aliyuncs.com`;
  return new Dysmsapi(config);
};

const generateVerificationCode = (): string => {
  const codeLength = 6; // Length of the verification code
  let code = '';

  for (let i = 0; i < codeLength; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    code += randomDigit.toString();
  }

  return code;
};

router.post('/send-verification-code', async (req: Request, res: Response) => {
  const employeeRepo = await prisma.employees
  try {
    const { phoneNumber } = req.body;
    const sendNumber = phoneNumber.replace(/ +/g, '');
    const verificationCode = generateVerificationCode();
    const employee = await employeeRepo.findFirst({
      where: {
        mobile: {
          equals: phoneNumber
        }
      }
    });
    if (!employee) {
      return res.status(400).json({ message: 'user not found' });
    }
    const client = createClient(
      'LTAI5t5ieoenJagCb4328EUi',
      '0Y8DFftWD4wdg5SOy0ksYClGLDLBgs'
    );

    const sendSmsRequest = new $Dysmsapi.SendSmsRequest({
      signName: '上海煲库企业管理有限公司',
      templateCode: 'SMS_211810288',
      phoneNumbers: sendNumber,
      templateParam: `{"code":"${verificationCode}"}`,
    });

    const runtime = new RuntimeOptions({});
    await client.sendSmsWithOptions(sendSmsRequest, runtime);
    await employeeRepo.update({
      where: {
        mobile: phoneNumber
      },
      data: {
        verification_code: verificationCode
      }
    })
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send('failed');
  }
});

router.post(
  '/verify-verification-code',
  async (req: Request, res: Response) => {
    const employeeRepo = AppDataSource.getRepository(Employee);
    try {
      if (!req.body.phoneNumber || !req.body.verificationCode) {
        return res.status(400).json({ message: 'no phone or verification' });
      }
      const { phoneNumber, verificationCode } = req.body;
      const employee = await employeeRepo.findOneBy({ mobile: phoneNumber });
      if (employee.verification_code !== verificationCode) {
        return res.status(400).json({ message: 'wrong verification code' });
      }
      const userJwt = jwt.sign(
        { id: employee.id, avatar: employee.avatar, name: employee.name },
        process.env.JWT_SIGN_KEY
      );
      res.json(userJwt);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'something went wrong' });
    }
  }
);

export { router as verificationRouter };
