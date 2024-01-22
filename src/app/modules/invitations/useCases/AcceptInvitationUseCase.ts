import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { AcceptInvitationRepository } from '../repository/AcceptInvitationRepository'
import { Invitation } from '../domain/interfaces'

export default class AcceptInvitationUseCase implements BaseUseCase<Partial<Invitation>, Promise<Invitation>> {
  async execute(payload: Partial<Invitation>): Promise<Invitation> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new AcceptInvitationRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}