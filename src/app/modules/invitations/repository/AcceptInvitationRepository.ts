import { AcceptInvitationRepositoryModel } from '../domain/services/AcceptInvitationRepositoryModel'
import { InvitationModel } from '../data/model'
import { Invitation } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { UpdateOneBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class AcceptInvitationRepository extends UpdateOneBaseRepository<Partial<Invitation>, Invitation> implements AcceptInvitationRepositoryModel {
  async execute(item: Partial<Invitation>): Promise<Invitation> {
    const model = await InvitationModel()
    const condition = { where: { id: item.id } }
    try {
      return await super.execute(item, condition, model as unknown as ModelConstructor<Partial<Invitation>, Invitation>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}