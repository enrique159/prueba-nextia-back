import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { GetInvitationRepository } from '../repository/GetInvitationRepository'
import { Invitation, InvitationId } from '../domain/interfaces'
import { UserId } from '../../users/domain/interfaces'
import Exception from '@/app/shared/error/Exception'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import ErrorCode from '@/app/shared/error/errorCode'

export default class GetInvitationUseCase implements BaseUseCase<InvitationId & UserId, Promise<Invitation>> {
  async execute(payload: InvitationId): Promise<Invitation> {
    const { id } = payload
    const connection = await DBConnectionManager.getInstance()
    const repository = new GetInvitationRepository(connection)
    const response = await repository.execute(id)

    if (!response) {
      throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    }

    return response
  }
}