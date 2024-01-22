import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { Invitation } from '../domain/interfaces'
import AcceptInvitationUseCase from '../useCases/AcceptInvitationUseCase'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class AcceptInvitationController {
  async execute(req: Request, res: Response) {

    const payload: Partial<Invitation> = {
      id: req.params.id,
      status: 'accepted',
    }

    const useCase = new AcceptInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'GET', route: `/invitation/accept/:${payload.id}`, useremail: 'N/A', success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: `/invitation/accept/:${payload.id}`, useremail: 'N/A', success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}