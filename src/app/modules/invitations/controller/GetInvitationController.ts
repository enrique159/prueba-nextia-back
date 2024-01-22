import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { InvitationId } from '../domain/interfaces'
import GetInvitationUseCase from '../useCases/GetInvitationUseCase'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class GetInvitationController {
  async execute(req: Request, res: Response) {
    const payload: InvitationId = {
      id: req.params.id,
    }

    const useCase = new GetInvitationUseCase()
    await useCase.execute(payload)
      .then((response) => {
        logger({ HttpType: 'GET', route: `/invitations/${payload.id}`, useremail: 'N/A', success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: `/invitations/${payload.id}`, useremail: 'N/A', success: false, error: err.errors[0].description })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}