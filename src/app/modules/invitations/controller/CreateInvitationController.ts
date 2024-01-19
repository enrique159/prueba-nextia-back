import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { InvitationRequest } from '../domain/interfaces'
import CreateInvitationUseCase from '../useCases/CreateInvitationUseCase'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class CreateInvitationController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const payload: InvitationRequest = {
      ...req.body,
      status: 'pending',
      userId: decodedToken.id,
    }

    const useCase = new CreateInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'POST', route: '/invitations', useremail: decodedToken.email, success: true })
        res.status(HttpStatusCode.CREATED).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/invitations', useremail: decodedToken.email, success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}