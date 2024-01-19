import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import { decodeToken } from '@/plugins/jwt/decodeToken'

export default class LogOutController {
  async execute(req: Request, res: Response) {
    const token = req.headers['authorization']
    const decodedToken = decodeToken(token)

    logger({ HttpType: 'POST', route: '/auth/logout', useremail: decodedToken.email, success: true })
    res.status(HttpStatusCode.OK).json({ data: 'Logout successfully' })
  }
}