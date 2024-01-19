import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import IUpdateOneBaseRepository from '../interfaces/IUpdateOneBaseRepository'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'
import { ModelConstructor } from '../interfaces/IModelConstructor'

export default class UpdateOneBaseRepository<T, U> implements IUpdateOneBaseRepository<T, U> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(item: T, condition, model: ModelConstructor<T, U>): Promise<U> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MYSQL) {
      console.log('item', item)
      const response = await model.update(item, condition)
      return response
    }
    // if (process.env.DATABASE_TYPE === DatabaseTypes.MONGO) {
    //   if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[1]) {
    //     const model = modelClass
    //     const result = await model.findOne(item)
    //     return result
    //   } else if (this.DBConnectionManager.statusConnection === MongooseConnectionStatus[0]) {
    //     throw new Error('Database is disconnected')
    //   }
    // }
    else {
      throw new Error('Database type not found')
    }
  }
}
