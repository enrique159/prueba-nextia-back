import { GetInvitationRepositoryModel } from '../domain/services/GetInvitationRepositoryModel'
import { InvitationModel } from '../data/model'
import { Invitation } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindOneByIdBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'

export class GetInvitationRepository extends FindOneByIdBaseRepository<string, Invitation> implements GetInvitationRepositoryModel {
  async execute(item: string): Promise<Invitation> {
    const model = await InvitationModel()
    console.log('model', model, item)
    try {
      return await super.execute(item, model as unknown as ModelConstructor<string, Invitation>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}