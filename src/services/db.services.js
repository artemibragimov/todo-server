import { Sequelize } from 'sequelize';
import { env } from '../utils/helper.js';

export const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USER_NAME,
  env.DB_PASSWORD,
  {
    host: env.HOST,
    dialect: env.DIALECT,
  }
);
