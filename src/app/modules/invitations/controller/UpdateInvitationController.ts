import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { Invitation } from '../domain/interfaces'
import UpdateInvitationUseCase from '../useCases/UpdateInvitationUseCase'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class UpdateInvitationController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: Invitation = {
      id: req.params.id,
      ...req.body,
      userId: decodedToken.id,
    }

    const useCase = new UpdateInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'PUT', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'PUT', route: `/invitations/${payload.id}`, useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}