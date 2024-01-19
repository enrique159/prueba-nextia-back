import { DeleteInvitationRepositoryModel } from '../domain/services/DeleteInvitationRepositoryModel'
import { InvitationModel } from '../data/model'
import { InvitationId } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { DeleteOneBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class DeleteInvitationRepository extends DeleteOneBaseRepository<InvitationId, number> implements DeleteInvitationRepositoryModel {
  async execute(item: InvitationId): Promise<number> {
    const model = await  InvitationModel()
    try {
      return await super.execute(item, model as unknown as ModelConstructor<InvitationId, number>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}