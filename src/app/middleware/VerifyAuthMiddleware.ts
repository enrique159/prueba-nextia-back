import { NextFunction, Request, Response } from 'express'
import HttpStatusCode from '@shared/enums/httpStatusCode'
import { decodeToken } from '@/plugins/jwt/decodeToken'
import ErrorCode from '@shared/error/errorCode'
import { logger } from '@shared/log/logger'
import jwt from 'jsonwebtoken'

export default class VerifyAuthMiddleware {
  async execute(req: Request, res: Response, next: NextFunction) {
    let token = req.headers['authorization']
    //const token = req.cookies.JSESSIONID;
    if (!token) {
      logger({ HttpType: req.method, route: req.originalUrl, useremail: 'NA', error: ErrorCode.ERR0018.description, success: false })
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: [ErrorCode.ERR0018] })
    }

    try {
      const decodedToken = decodeToken(token)
      token = token.replace('Bearer ', '')
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError) {
            logger({ HttpType: req.method, route: req.originalUrl, useremail: decodedToken.email ?? 'NA', error: ErrorCode.ERR0019.description, success: false })
            return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: [ErrorCode.ERR0019] })
          }
          logger({ HttpType: req.method, route: req.originalUrl, useremail: decodedToken.email ?? 'NA', error: ErrorCode.ERR0018.description, success: false })
          return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: [ErrorCode.ERR0018] })
        }
        next()
      })
    } catch (err) {
      logger({ HttpType: req.method, route: req.originalUrl, useremail: 'NA', error: ErrorCode.ERR0018.description, success: false })
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ error: [ErrorCode.ERR0018] })
    }
  }
}