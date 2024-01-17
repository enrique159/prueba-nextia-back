import { Options, Sequelize } from 'sequelize'
import { IDBConnectionManager } from '../interfaces/IDBConnectionManager'
// import MongooseManager from '../integrations/MongooseManager'
import SequelizeManager from '../integrations/SequelizeManager'

// Types
import { DatabaseTypes } from '../interfaces/DatabaseTypes'
import { DBInstance } from '../interfaces/IDBInstance'



export default class DBConnectionManager implements IDBConnectionManager {
  private static instance: DBConnectionManager
  public dbInstance: DBInstance
  public _options: Options = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT as string),
    dialect: 'mysql',
  }

  public static getInstance(): DBConnectionManager {
    if (!DBConnectionManager.instance) {
      DBConnectionManager.instance = new DBConnectionManager()
    }

    return DBConnectionManager.instance
  }

  public async connect(): Promise<void> {
    const dbType = process.env.DATABASE_TYPE
    if (dbType === DatabaseTypes.MYSQL) {
      console.log('[server⚡️]: Database Type: ' + DatabaseTypes.MYSQL)
      console.log('[server⚡️]: Connection to Database: CONNECTING')
      // Get the instance of the class
      this.dbInstance = SequelizeManager.getInstance(this._options)
      await this.dbInstance.connect()
        .then(() => {
          console.log('[server⚡️]: Connection to Database: SUCCESS')
        })
        .catch((error) => {
          console.log('[server⚡️]: Connection to Database: ERROR')
          console.log(error)
        })
    }
  }

  public async disconnect(): Promise<void> {
    const dbType = process.env.DATABASE_TYPE
    // MYSQL
    if (dbType === DatabaseTypes.MYSQL) {
      console.log('Database Type: ' + DatabaseTypes.MYSQL)
      console.log('Connection to Database: DISCONNECTING')

      await this.dbInstance.disconnect()
        .then(() => {
          console.log('Connection to Database: DISCONNECTED')
        })
        .catch((error) => {
          console.log('Connection to Database: ERROR')
          console.log(error)
        })
    }
  }

  public async statusConnection(): Promise<boolean | string> {
    // MYSQL
    if (process.env.DATABASE_TYPE === DatabaseTypes.MYSQL) {
      // Get the instance of the class
      return this.dbInstance.statusConnection()
    }
  }

  public async sync(): Promise<void> {
    // MYSQL
    if (process.env.DATABASE_TYPE === DatabaseTypes.MYSQL) {
      await this.dbInstance.synchronize()
    }
  }
}