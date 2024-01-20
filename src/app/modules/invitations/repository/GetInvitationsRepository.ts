import { GetInvitationsRepositoryModel } from '../domain/services/GetInvitationsRepositoryModel'
import { InvitationModel } from '../data/model'
import { Invitations } from '../domain/interfaces'
import { ErrorHandler } from '@shared/error/ErrorHandler'
import { FindByPaginationBaseRepository } from '@shared/common/repository'
import { ModelConstructor } from '@/app/shared/common/repository/interfaces/IModelConstructor'
import { Op } from 'sequelize'

export class GetInvitationsRepository extends FindByPaginationBaseRepository<Invitations> implements GetInvitationsRepositoryModel {
  async execute(payload): Promise<Invitations> {
    const model = await InvitationModel()

    const { userId, meta } = payload
    const { page, limit, sort, search, order } = meta
    const offset = (page - 1) * limit

    let where = {}
    if (search) {
      where = {
        [Op.and]: [
          { guestName: { [Op.like]: `%${search}%` } },
          { userId: userId.userId },
        ],
      }
    } else {
      where = {
        userId: userId.userId,
      }
    }

    const metaPagination = {
      where,
      offset,
      limit,
      order: [[sort, order]],
    }

    try {
      return await super.execute(metaPagination, model as unknown as ModelConstructor<Invitations>)
    } catch (error) {
      new ErrorHandler(error).handle()
    }
  }
}