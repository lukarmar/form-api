/* eslint-disable no-unsafe-finally */
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQLDB_HOST,
  port: Number(process.env.MYSQLDB_PORT),
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  entities: ['src/infra/database/entities/**/*{.ts,.js}'],
  migrations: ['src/infra/database/migrations/*.ts'],
  synchronize: true,
  logging: false,
});

export async function getDbConnection() {
  try {
    AppDataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.log('Error during Source initialization:', err);
  } finally {
    return AppDataSource;
  }
}
