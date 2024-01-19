import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { UpdateInvitationRepository } from '../repository/UpdateInvitationRepository'
import { Invitation } from '../domain/interfaces'

export default class UpdateInvitationUseCase implements BaseUseCase<Partial<Invitation>, Promise<Invitation>> {
  async execute(payload: Partial<Invitation>): Promise<Invitation> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new UpdateInvitationRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}