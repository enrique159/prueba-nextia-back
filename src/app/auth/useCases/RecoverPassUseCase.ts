import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { RecoverPassRepository } from '../repository/RecoverPassRepository'
import { sendRecoverPassEmail } from '@/plugins/sendGrid/sendEmail'
import { RecoverPassResponse } from '../domain/interfaces/Auth'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import ErrorCode from '@/app/shared/error/errorCode'
import { QueryParams } from '../domain/interfaces'
import Exception from '@shared/error/Exception'
import { generateToken } from '@/plugins/jwt/generateToken'
import { User } from '@/app/modules/users/domain/interfaces'


export default class RecoverPassUseCase implements BaseUseCase<QueryParams, Promise<RecoverPassResponse>> {
  async execute(payload: QueryParams): Promise<RecoverPassResponse> {
    // Dependency Injection
    const dbConnectionManager = DBConnectionManager.getInstance()
    const recoverPassRepository = new RecoverPassRepository(dbConnectionManager)
    // Query
    const query: QueryParams = { email: payload.email }
    // Execute
    const user = await recoverPassRepository.execute(query)
    if (!user) {
      throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    }

    const userAuth: Partial<User> = { id: user.id }
    const token = generateToken<Partial<User>>(userAuth, true)


    // Send email
    const response = await sendRecoverPassEmail(user.email, token)
    if (!response) {
      throw new Exception(HttpStatusCode.FAILED_DEPENDENCY, ErrorCode.ERR0020)
    }

    const recoverPassResponse: RecoverPassResponse = {
      emailSent: true,
    }
    // Return
    return recoverPassResponse
  }
}