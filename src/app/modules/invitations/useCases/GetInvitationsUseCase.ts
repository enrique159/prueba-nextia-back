import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { GetInvitationsRepository } from '../repository/GetInvitationsRepository'
import { Invitations } from '../domain/interfaces'
import { UserId } from '../../users/domain/interfaces'

export default class GetInvitationsUseCase implements BaseUseCase<UserId, Promise<Invitations>> {
  async execute(payload: UserId): Promise<Invitations> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new GetInvitationsRepository(connection)
    const response = await repository.execute(payload)
    return response
  }
}