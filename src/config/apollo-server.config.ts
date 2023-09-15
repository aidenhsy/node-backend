import { ApolloServerOptions, BaseContext } from '@apollo/server';
import { readFileSync } from 'fs';
// import { resolvers } from '../resolvers/resolvers';
import { merge } from 'lodash';
import {
  attGroupQueryResolvers,
  attendanceQueryResolvers,
  brandQueryResolvers,
  departmentQueryResolvers,
  naviQueryResolvers,
  optionQueryResolvers,
  roleQueryResolvers,
  salesSummaryQueryResolvers,
  shiftListQueryResolvers,
  soldItemQueryResolvers,
  statsQueryResolvers,
  storeQueryResolvers,
  testQueryResolvers,
  userQueryResolvers,
} from '../graphql/resolvers';

const attendanceSchema = readFileSync(
  './src/graphql/schema/attendance.schema.graphql',
  {
    encoding: 'utf-8',
  }
);

const attendanceLocationSchema = readFileSync(
  './src/graphql/schema/attendanceLocation.schema.graphql',
  {
    encoding: 'utf-8',
  }
);

const attGroupSchema = readFileSync(
  './src/graphql/schema/attGroupSchema.graphql',
  {
    encoding: 'utf-8',
  }
);

const brandSchema = readFileSync('./src/graphql/schema/brandSchema.graphql', {
  encoding: 'utf-8',
});

const departmentSchema = readFileSync(
  './src/graphql/schema/departmentSchema.graphql',
  {
    encoding: 'utf-8',
  }
);

const navSchema = readFileSync('./src/graphql/schema/navSchema.graphql', {
  encoding: 'utf-8',
});

const optionsSchema = readFileSync(
  './src/graphql/schema/optionsSchema.graphql',
  {
    encoding: 'utf-8',
  }
);

const resSchema = readFileSync('./src/graphql/schema/res.schema.graphql', {
  encoding: 'utf-8',
});

const roleSchema = readFileSync('./src/graphql/schema/roleSchema.graphql', {
  encoding: 'utf-8',
});

const salesSchema = readFileSync('./src/graphql/schema/salesSchema.graphql', {
  encoding: 'utf-8',
});

const shiftSchema = readFileSync('./src/graphql/schema/shiftSchema.graphql', {
  encoding: 'utf-8',
});

const soldItemSchema = readFileSync(
  './src/graphql/schema/soldItem.schema.graphql',
  {
    encoding: 'utf-8',
  }
);

const statsSchema = readFileSync('./src/graphql/schema/statsSchema.graphql', {
  encoding: 'utf-8',
});

const storeSchema = readFileSync('./src/graphql/schema/storeSchema.graphql', {
  encoding: 'utf-8',
});

const testSchema = readFileSync('./src/graphql/schema/testSchema.graphql', {
  encoding: 'utf-8',
});

const userSchema = readFileSync('./src/graphql/schema/userSchema.graphql', {
  encoding: 'utf-8',
});

const typeDefs = [
  attendanceSchema,
  attendanceLocationSchema,
  attGroupSchema,
  brandSchema,
  departmentSchema,
  navSchema,
  optionsSchema,
  resSchema,
  roleSchema,
  salesSchema,
  shiftSchema,
  soldItemSchema,
  statsSchema,
  storeSchema,
  testSchema,
  userSchema,
];

const resolvers = merge(
  attGroupQueryResolvers,
  attendanceQueryResolvers,
  brandQueryResolvers,
  departmentQueryResolvers,
  naviQueryResolvers,
  optionQueryResolvers,
  roleQueryResolvers,
  salesSummaryQueryResolvers,
  shiftListQueryResolvers,
  soldItemQueryResolvers,
  statsQueryResolvers,
  storeQueryResolvers,
  testQueryResolvers,
  userQueryResolvers
);

const apolloServerConfig: ApolloServerOptions<BaseContext> = {
  typeDefs,
  resolvers,
};

export default apolloServerConfig;
