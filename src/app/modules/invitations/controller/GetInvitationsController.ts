import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetInvitationsUseCase from '../useCases/GetInvitationsUseCase'
import { UserId } from '../../users/domain/interfaces'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import { IMetaPagination } from '@/app/shared/common/domain/IMetaPagination'

export default class GetInvitationsController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const userId: UserId = {
      userId: decodedToken.id,
    }

    const metaPagination: IMetaPagination = {
      page: parseInt(req.query.page?.toString()) || 1,
      limit: parseInt(req.query.limit?.toString()) || 10,
      sort: req.query.sort?.toString() || 'createdAt',
      search: req.query.search?.toString() || '',
      order: req.query.order?.toString() || 'DESC',
    }

    const useCase = new GetInvitationsUseCase()
    await useCase.execute({ userId, meta: metaPagination })
      .then((response) => {
        logger({ HttpType: 'GET', route: '/invitations', useremail: decodedToken.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/invitations', useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}