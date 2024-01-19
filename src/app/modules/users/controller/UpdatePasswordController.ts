import { Request, Response } from 'express'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import { logger } from '@shared/log/logger'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'
import { QueryParams } from '@/app/auth/domain/interfaces'
import UpdatePasswordUseCase from '../useCases/UpdatePasswordUseCase'
import ErrorCode from '@/app/shared/error/errorCode'

export default class UpdatePasswordController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    const params: QueryParams = {
      id: decodedToken.id,
      password: req.body?.password,
    }

    if (!params.password) {
      logger({ HttpType: 'POST', route: '/users/update-password', useremail: decodedToken.email, error: 'Missing required fields', success: false })
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: [ErrorCode.ERR0008] })
    }

    const updatePasswordUseCase = new UpdatePasswordUseCase()

    await updatePasswordUseCase.execute(params)
      .then((response) => {
        logger({ HttpType: 'POST', route: '/users/update-password', useremail: response.email, success: true })
        res.status(HttpStatusCode.OK).json({ data: response })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/users/update-password', useremail: decodedToken.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}