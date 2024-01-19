import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { User, UserRequest } from '../domain/interfaces/Users'
import { CreateUserRepository } from '../repository/CreateUserRepository'
import { BaseUseCase } from '@shared/common/BaseUseCase'

export default class CreateUserUseCase implements BaseUseCase<UserRequest, Promise<Partial<User>>> {
  async execute(payload: UserRequest): Promise<Partial<User>> {
    const dbConnectionManager = DBConnectionManager.getInstance()
    const createUserRepository = new CreateUserRepository(dbConnectionManager)
    const user = await createUserRepository.execute(payload)
    // delete password property from user object
    delete user.password
    return user
  }
}