import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { CreateInvitationRepository } from '../repository/CreateInvitationRepository'
import { Invitation, InvitationRequest } from '../domain/interfaces'

export default class CreateInvitationUseCase implements BaseUseCase<InvitationRequest, Promise<Invitation>> {
  async execute(payload: InvitationRequest): Promise<Invitation> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new CreateInvitationRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}