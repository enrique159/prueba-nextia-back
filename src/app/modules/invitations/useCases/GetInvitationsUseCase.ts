import DBConnectionManager from '@shared/database/services/DBConnectionManager'
import { BaseUseCase } from '@shared/common/BaseUseCase'
import { GetInvitationsRepository } from '../repository/GetInvitationsRepository'
import { Invitations } from '../domain/interfaces'
import { UserId } from '../../users/domain/interfaces'
import { IMetaPagination } from '@/app/shared/common/domain/IMetaPagination'
import Exception from '@/app/shared/error/Exception'
import ErrorCode from '@/app/shared/error/errorCode'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export interface IGetInvitationsRequest {
  userId: UserId
  meta?: IMetaPagination
}

export default class GetInvitationsUseCase implements BaseUseCase<IGetInvitationsRequest, Promise<Invitations>> {
  async execute(payload: { userId: UserId, meta: IMetaPagination }): Promise<Invitations> {
    const connection = await DBConnectionManager.getInstance()
    const repository = new GetInvitationsRepository(connection)
    const response = await repository.execute(payload)

    if(!response) throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000)
    return response
  }
}