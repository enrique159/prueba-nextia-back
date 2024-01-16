import { Sequelize, Options } from 'sequelize'
import { IDBConnectionManager } from '../interfaces/IDBConnectionManager'

const BASE_OPTIONS: Options = {
  host: 'localhost',
  database: 'default',
  username: 'root',
  password: '',
  port: 3306,
  dialect: 'mysql',
}

export default class SequelizeManager implements IDBConnectionManager {
  private static instance: SequelizeManager
  private _options: Options
  private _sequelize: Sequelize | undefined

  private constructor(url: Options = BASE_OPTIONS) {
    this._options = url
  }

  // GET THE INSTANCE OF THE CLASS
  public static getInstance(options?: Options): SequelizeManager {
    if (!SequelizeManager.instance) {
      SequelizeManager.instance = new SequelizeManager(options)
    }
    return SequelizeManager.instance
  }

  // CONNECT TO THE DATABASE
  public async connect(): Promise<void> {
    this._sequelize = new Sequelize(this._options)
    await this._sequelize.authenticate()
  }

  // DISCONNECT FROM THE DATABASE
  public async disconnect(): Promise<void> {
    await this._sequelize?.close()
  }

  // GET THE STATUS OF THE CONNECTION
  public async statusConnection(): Promise<boolean> {
    try {
      await this._sequelize?.authenticate()
      return true
    } catch (error) {
      return false
    }
  }
}