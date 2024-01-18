import { GetMeRepositoryModel } from '../domain/services/GetMeRepositoryModel'
import { UserModel } from '../data/model'
import { User } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindOneBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'
import { QueryParams } from '@/app/auth/domain/interfaces'

export class GetMeRepository extends FindOneBaseRepository<QueryParams,User> implements GetMeRepositoryModel {
  async execute(userId: QueryParams): Promise<User> {
    const model = await UserModel()
    try {
      return await super.execute(userId, model as unknown as ModelConstructor<QueryParams, User>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}