import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { User, UserRequest } from '../domain/interfaces/Users'
import { CreateUserRepository } from '../repository/CreateUserRepository'
import { BaseUseCase } from '@shared/common/BaseUseCase'

export default class CreateUserUseCase implements BaseUseCase<UserRequest, Promise<User>> {
  async execute(payload: UserRequest): Promise<User> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const createUserRepository = new CreateUserRepository(dbConnectionManager)
    const user = await createUserRepository.execute(payload)
    return user
  }
}