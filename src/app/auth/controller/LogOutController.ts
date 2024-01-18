import { Request, Response } from 'express'
import { logger } from '@shared/log/logger'
import HttpStatusCode from '@shared/enums/httpStatusCode'

export default class LogOutController {
  async execute(req: Request, res: Response) {
    logger({ HttpType: 'POST', route: '/auth/logout', useremail: req.body.email, success: true })
    res.status(HttpStatusCode.OK).json({ message: 'Logout successfully' })
  }
}