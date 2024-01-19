import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import GetInvitationsUseCase from '../useCases/GetInvitationsUseCase'
import { UserId } from '../../users/domain/interfaces'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class GetInvitationsController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const userId: UserId = {
      userId: decodedToken.id,
    }

    const useCase = new GetInvitationsUseCase()
    await useCase.execute(userId)
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