import { host, port, user, password, database } from '../config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Market } from './entity/Market';
import { Currency } from './entity/Currency';
import { ExchangeRate } from './entity/ExchangeRate';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: host,
  port: Number(port),
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [Market, Currency, ExchangeRate],
  migrations: [],
  subscribers: [],
});
