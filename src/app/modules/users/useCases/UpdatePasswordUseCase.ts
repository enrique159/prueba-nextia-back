import { BaseUseCase } from '@shared/common/BaseUseCase'
import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import Exception from '@shared/error/Exception'
import ErrorCode from '@shared/error/errorCode'
import { QueryParams } from '@/app/auth/domain/interfaces'
import { User } from '../domain/interfaces'
import { GetMeRepository } from '../repository/GetMeRepository'
import { UpdatePasswordRepository } from '../repository/UpdatePasswordRepository'
import { encryptPassword } from '@/utils/encryptPassword'

export default class UpdatePasswordUseCase implements BaseUseCase<QueryParams, Promise<Partial<User>>> {
  async execute(params: QueryParams): Promise<Partial<User>> {
    // Dependency Injection
    const dbConnectionManager = DBConnectionManager.getInstance()
    const getMeRepository = new GetMeRepository(dbConnectionManager)
    const updatePasswordRepository = new UpdatePasswordRepository(dbConnectionManager)
    // Execute
    const query: QueryParams = { id: params.id }
    const user = await getMeRepository.execute(query)
    if(!user) throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)

    const encryptedPassword = encryptPassword(params.password)
    // Update password
    const payload: QueryParams = { id: params.id, password: encryptedPassword }
    const userUpdated = await updatePasswordRepository.execute(payload)
    if(!userUpdated) throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)

    console.log('userUpdated', userUpdated)

    const userAuth: Partial<User> = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      department: user.department,
    }

    return userAuth
  }
}