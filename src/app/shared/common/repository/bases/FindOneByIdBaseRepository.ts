import { IDBConnectionManager } from '@shared/database/interfaces/IDBConnectionManager'
import { IFindOneByIdBaseRepository } from '../index'
import { DatabaseTypes } from '@shared/database/interfaces/DatabaseTypes'
import { ModelConstructor } from '../interfaces/IModelConstructor'

export default class FindOneByIdBaseRepository<T, U> implements IFindOneByIdBaseRepository<T, U> {
  protected DBConnectionManager: IDBConnectionManager

  constructor(DBConnectionManager: IDBConnectionManager) {
    this.DBConnectionManager = DBConnectionManager
  }

  public async execute(value: T, model: ModelConstructor<T, U>): Promise<U> {
    if (process.env.DATABASE_TYPE === DatabaseTypes.MYSQL) {
      const response = await model.findByPk(value)
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
