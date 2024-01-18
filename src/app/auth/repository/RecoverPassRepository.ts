import { User } from '@app/modules/users/domain/interfaces/Users'
import { FindOneBaseRepository } from '@shared/common/repository/index'
import { RecoverPassRepositoryModel } from '../domain/services/RecoverPassRepositoryModel'
import { QueryParams } from '../domain/interfaces/index'
import { UserModel } from '@app/modules/users/data/model'
import { ErrorHandler } from '@/app/shared/error/ErrorHandler'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class RecoverPassRepository extends FindOneBaseRepository<QueryParams, User> implements RecoverPassRepositoryModel {
  async execute(item: QueryParams): Promise<User> {
    const model = await UserModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<QueryParams, User>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}