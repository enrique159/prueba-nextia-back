import { Options } from 'sequelize'
import { DBInstance } from './IDBInstance'

export interface IDBConnectionManager {
  dbInstance: DBInstance;
  _options: Options;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  statusConnection(): Promise<boolean | string>;
  sync(): Promise<void>;
}