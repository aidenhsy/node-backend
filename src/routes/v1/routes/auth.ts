import { Router } from 'express';
import qs from 'qs';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AppDataSource, Employee } from '@yousico/yousi-orm';
import { NotAuthorizedError } from '@yousico/common';
import prisma from '../../../config/prisma';

const router = Router();

router.get('/auth/login', async (req, res) => {
  const { code } = req.query;
  const query_params = {
    grant_type: 'authorization_code',
    client_id: `${process.env.FEISHU_APP_ID}`,
    client_secret: `${process.env.FEISHU_APP_SECRET}`,
    code: `${code}`,
    redirect_uri: `${process.env.REDIRECT_URL}/api/auth`,
  };
  try {
    const tokens = await axios.post(
      `https://passport.feishu.cn/suite/passport/oauth/token?${qs.stringify(
        query_params
      )}`
    );
    const userInfo = await axios.get(
      'https://passport.feishu.cn/suite/passport/oauth/userinfo',
      { headers: { Authorization: `Bearer ${tokens.data.access_token}` } }
    );

    const user = await AppDataSource.getRepository(Employee).findOne({
      where: {
        id: userInfo.data.open_id,
      },
    });

    const userJwt = jwt.sign(
      {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
      process.env.JWT_SIGN_KEY
    );

    res.json(userJwt);
  } catch (err: any) {
    console.log(err);
    res.status(403).json(err);
  }
});

router.post('/auth/profile', async (req, res) => {
  if (!req.body.token) {
    throw new NotAuthorizedError();
  }
  const token = req.body.token.split(' ')[1];
  const user = jwt.verify(token, process.env.JWT_SIGN_KEY!);
  res.status(200).json(user);
});

router.post('/test/token', async (req, res) => {
  const { phoneNumber } = req.body;
  const employee = await prisma.employees.findFirst({
    where: {
      mobile: phoneNumber,
    },
    select: {
      id: true,
      name: true,
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
  const roles = employee.employees_roles.map((e) => e.roles.label);
  const obj = {
    name: employee.name,
    'https://myapi.yousico.com/graphql': {
      'x-hasura-user-id': employee.id,
      'x-hasura-default-role':
        employee.employees_roles.length > 0
          ? employee.employees_roles[0].roles.label
          : 'regular',
      'x-hasura-allowed-roles': roles,
    },
  };
  const token = jwt.sign(obj, 'bE8xG6jQk2!tU4mZp3rVw0yZa7fSd9lN', {
    algorithm: 'HS256',
  });
  res.send(token);
});

export { router as authRouter };
