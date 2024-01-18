import UpdateOneBaseRepository from '@/app/shared/common/repository/bases/UpdateOneBaseRepository'
import { UserModel } from '../data/model'
import { User } from '../domain/interfaces/Users'
import { UpdatePasswordRepositoryModel } from '../domain/services/UpdatePasswordRepositoryModel'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'
import { QueryParams } from '@/app/auth/domain/interfaces'


export class UpdatePasswordRepository extends UpdateOneBaseRepository<QueryParams, User> implements UpdatePasswordRepositoryModel{
  async execute(item: QueryParams): Promise<User> {
    const model = await UserModel()
    const password: QueryParams = { password: item.password }
    const condition = { where: { id: item.id } }
    try {
      return await super.execute(password, condition, model as unknown as ModelConstructor<QueryParams, User>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}