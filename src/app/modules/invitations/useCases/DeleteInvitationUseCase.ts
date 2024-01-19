import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { DeleteInvitationRepository } from '../repository/DeleteInvitationRepository'
import { GetInvitationRepository } from '../repository/GetInvitationRepository'
import { InvitationId } from '../domain/interfaces'
import { UserId } from '../../users/domain/interfaces'
import ErrorCode from '@/app/shared/error/errorCode'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import Exception from '@/app/shared/error/Exception'

export default class DeleteInvitationUseCase implements BaseUseCase<InvitationId, Promise<number>> {
  async execute(payload: InvitationId & UserId): Promise<number> {
    const connection = await DBConnectionManager.getInstance()
    const deleteInvitationRepository = new DeleteInvitationRepository(connection)
    const getInvitationRepository = new GetInvitationRepository(connection)

    const invitation = await getInvitationRepository.execute(payload.id)
    if (!invitation) throw new Exception(HttpStatusCode.NOT_FOUND, ErrorCode.ERR0001)
    if (invitation.userId !== payload.userId) throw new Exception(HttpStatusCode.UNAUTHORIZED, ErrorCode.ERR0021)

    console.log('payload.id', { userId: payload.userId, invitationUserId: invitation.userId})

    const invitationId: InvitationId = {
      id: payload.id,
    }

    const response = await deleteInvitationRepository.execute(invitationId)
    return response
  }
}