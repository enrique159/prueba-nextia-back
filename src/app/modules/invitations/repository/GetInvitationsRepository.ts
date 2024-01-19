import { GetInvitationsRepositoryModel } from '../domain/services/GetInvitationsRepositoryModel'
import { InvitationModel } from '../data/model'
import { Invitations } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindBaseRepository } from '@shared/common/repository'
import { UserId } from '../../users/domain/interfaces'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class GetInvitationsRepository extends FindBaseRepository<UserId, Invitations> implements GetInvitationsRepositoryModel {
  async execute(item: UserId): Promise<Invitations> {
    const model = await InvitationModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<UserId, Invitations>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}