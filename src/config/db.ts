import mysql from 'mysql2';
import { Pool } from 'pg';

const pgPool = new Pool({
  host: 'pgm-uf6b5m4bq9lx73i7xo.pg.rds.aliyuncs.com',
  user: 'aidenhsy',
  database: 'yousi',
  password: 'Jones88888!',
  port: 5432,
});

const pool = mysql.createPool({
  host: 'rm-uf6tvsxfs1u26w464co.mysql.rds.aliyuncs.com',
  user: 'aidenhsy',
  database: 'yousi',
  password: 'Bob42802!',
});

export const yousiSql = pool.promise();
export const pgSql = pgPool;
