import ICreateOneBaseRepository from '@shared/common/repository/interfaces/ICreateOneBaseRepository'

// import { Model } from 'mongoose'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'
import { ModelConstructor } from '../interfaces/IModelConstructor'

export default class CreateOneBaseRepository<T> implements ICreateOneBaseRepository<T> {
  protected DBConnectionManager: DBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: Partial<T>, model: ModelConstructor<T>): Promise<T> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MYSQL) {
      const response = await model.create(item)
      return response
    }
    else if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
      // if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
      //   const model = modelClass
      //   const result = await model.create(item)
      //   return result
      // } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
      //   throw new Error('Database is disconnected')
      // }
    }
    else {
      throw new Error('Database type not found')
    }
  }
}