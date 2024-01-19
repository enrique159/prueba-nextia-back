import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { InvitationId } from '../domain/interfaces'
import DeleteInvitationUseCase from '../useCases/DeleteInvitationUseCase'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import { UserId } from '../../users/domain/interfaces'

export default class DeleteInvitationController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: InvitationId & UserId = {
      id: req.params.id,
      userId: decodedToken.id,
    }

    const useCase = new DeleteInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'DELETE', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'DELETE', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}