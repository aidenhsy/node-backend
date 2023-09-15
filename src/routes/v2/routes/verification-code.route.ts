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

router.post(
  '/v2/send-verification-code',
  async (req: Request, res: Response) => {
    try {
      const { phoneNumber } = req.body;
      const sendNumber = phoneNumber.replace(/ +/g, '');
      const verificationCode = generateVerificationCode();
      const employee = await prisma.employees.findFirst({
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
      await prisma.employees.updateMany({
        where: {
          mobile: phoneNumber,
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
  }
);

router.post(
  '/v2/verify-verification-code',
  async (req: Request, res: Response) => {
    try {
      if (!req.body.phoneNumber || !req.body.verificationCode) {
        return res.status(400).json({ message: 'no phone or verification' });
      }
      const { phoneNumber, verificationCode } = req.body;
      const employee = await prisma.employees.findFirst({
        where: {
          mobile: phoneNumber,
        },
        select: {
          id: true,
          name: true,
          department_id: true,
          verification_code: true,
          avatar: true,
          brands_employees: {
            select: {
              brands: {
                select: {
                  department_id: true,
                },
              },
            },
          },
          departments_employees: {
            select: {
              department_id: true,
            },
          },
          employees_roles: {
            orderBy: {
              roles: {
                ranking: 'asc',
              },
            },
            select: {
              roles: {
                select: {
                  label: true,
                },
              },
            },
          },
        },
      });

      const department_ids =
        employee.departments_employees.length > 0
          ? `{${employee.departments_employees
            .map((e) => e.department_id)
            .join(',')}}`
          : '{}';

      if (employee.verification_code !== verificationCode) {
        return res.status(400).json({ message: 'wrong verification code' });
      }
      const roles = employee.employees_roles.map((e) => e.roles.label);

      const departmentIds = employee.brands_employees.map(
        (e) => e.brands.department_id
      );

      const childDepartments: any[] = await prisma.$queryRaw`
  SELECT * FROM get_child_departments(${departmentIds})
`;
      const brand_department_ids =
        childDepartments.length > 0
          ? `{${childDepartments.map((c) => c.department_id).join(',')}}`
          : '{}';

      const obj = {
        id: employee.id,
        avatar: employee.avatar,
        name: employee.name,
        'https://myapi.yousico.com/graphql': {
          'x-hasura-user-id': employee.id,
          'x-hasura-department-id': employee.department_id,
          'x-hasura-department-ids': department_ids,
          'x-hasura-brand-department-ids': brand_department_ids,
          'x-hasura-default-role':
            employee.employees_roles.length > 0
              ? employee.employees_roles[0].roles.label
              : 'regular',
          'x-hasura-allowed-roles': Boolean(roles.length) ? roles : ['regular'],
        },
      };
      const userJwt = jwt.sign(obj, 'bE8xG6jQk2!tU4mZp3rVw0yZa7fSd9lN', {
        algorithm: 'HS256',
      });
      res.json(userJwt);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'something went wrong' });
    }
  }
);

export { router as verificationRouterV2 };
