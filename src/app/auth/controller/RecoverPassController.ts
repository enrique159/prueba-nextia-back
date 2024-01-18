import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import { QueryParams } from '../domain/interfaces'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import RecoverPassUseCase from '../useCases/RecoverPassUseCase'

export default class RecoverPassController {
  async execute(req: Request, res: Response) {
    const email: QueryParams = {
      email: req.params.email,
    }

    const recoverPassUseCase = new RecoverPassUseCase()
    await recoverPassUseCase.execute(email)
      .then((response) => {
        logger({ HttpType: 'GET', route: '/auth/recover', useremail: response.user.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'GET', route: '/auth/recover', useremail: email.toString(), error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}