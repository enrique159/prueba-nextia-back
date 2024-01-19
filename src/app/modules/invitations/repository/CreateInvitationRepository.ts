import { CreateInvitationRepositoryModel } from '../domain/services/CreateInvitationRepositoryModel'
import { InvitationModel } from '../data/model'
import { Invitation, InvitationRequest } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { CreateOneBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class CreateInvitationRepository extends CreateOneBaseRepository<Invitation> implements CreateInvitationRepositoryModel {
  async execute(item: InvitationRequest): Promise<Invitation> {
    const model = await InvitationModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<Invitation>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}