import { CreateOneBaseRepository } from '@shared/common/repository/index'
import { UserModel } from '../data/model'
import { User, UserRequest } from '../domain/interfaces/Users'
import { CreateUserRepositoryModel } from '../domain/services/CreateUserRepositoryModel'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class CreateUserRepository extends CreateOneBaseRepository<User> implements CreateUserRepositoryModel{
  async execute(item: UserRequest): Promise<User> {
    const model = await UserModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<User>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}