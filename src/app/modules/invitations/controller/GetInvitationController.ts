import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { InvitationId } from '../domain/interfaces'
import GetInvitationUseCase from '../useCases/GetInvitationUseCase'
import { UserId } from '../../users/domain/interfaces'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class GetInvitationController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: InvitationId & UserId = {
      id: req.params.id,
      userId: decodedToken.id,
    }

    const useCase = new GetInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'GET', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}