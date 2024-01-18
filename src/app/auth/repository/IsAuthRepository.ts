import { UserModel } from '@app/modules/users/data/model'
import { User } from '@app/modules/users/domain/interfaces/Users'
import { FindOneBaseRepository } from '@shared/common/repository/index'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import ErrorCode from '@shared/error/errorCode'
import { IsAuthRepositoryModel, QueryParams } from '../domain/services/IsAuthRepositoryModel'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class IsAuthRepository extends FindOneBaseRepository<QueryParams, User> implements IsAuthRepositoryModel {
  async execute(item: QueryParams): Promise<User> {
    const model = await UserModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<QueryParams, User>)
    } catch (error) {
      throw new Exception(HttpStatusCode.BAD_REQUEST, ErrorCode.ERR0008)
    }
  }
}