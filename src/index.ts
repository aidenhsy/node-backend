import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { currentUser } from '@yousico/common';
import apolloServerConfig from './config/apollo-server.config';
import { AppDataSource } from '@yousico/yousi-orm';

//routers import
//v1
import {
  authRouter,
  departmentsRouter,
  testRouter,
  uploadRouter,
  uploadEmployeePhotoRouter,
  hrDictionaryRouter,
  verificationRouter,
  smsNewEmployeeRouter,
  currentUserRouter,
  feishuMessages,
  verifyFieldsRouter,
  storeDepartmentTreeRouter,
} from './routes/v1';
//v2
import { feishuUploadRoute, verificationRouterV2 } from './routes/v2';

//v3
import { navItemsRouterV3 } from './routes/v3/routes/navitems.route';

// v4
import {
  approvalsRoute,
  newInstancesRoute,
  feishuApprovalInstanceRoute,
} from './routes/v4';

//wechat
import { wechatAttendanceRouter, wechatLoginRouter } from './routes/wechat';

dotenv.config();

const app = express();

const apolloServer = new ApolloServer(apolloServerConfig);

app.use(cors(), express.json());

//v1
app.use(authRouter);
app.use(departmentsRouter);
app.use(smsNewEmployeeRouter);
app.use(testRouter);
app.use(uploadRouter);
app.use(uploadEmployeePhotoRouter);
app.use(hrDictionaryRouter);
app.use(verificationRouter);
app.use(currentUserRouter);
app.use(feishuMessages);
app.use(verifyFieldsRouter);
app.use(storeDepartmentTreeRouter);

//v2
app.use(feishuUploadRoute);
app.use(verificationRouterV2);

//v3
app.use(navItemsRouterV3);

//v4
app.use(approvalsRoute);
app.use(newInstancesRoute);
app.use(feishuApprovalInstanceRoute);

//wechat
app.use(wechatAttendanceRouter);
app.use(wechatLoginRouter);

app.get('/', async (_req, res) => {
  res.send('hello this is working');
});

const start = async () => {
  await apolloServer.start();
  await AppDataSource.initialize();

  app.use(
    '/graphql',
    currentUser,
    apolloMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { user: req.currentUser };
      },
    })
  );
  app.listen(4000, () => {
    console.log('listening on 4000');
  });
};

start();
