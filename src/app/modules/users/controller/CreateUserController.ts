import { Request, Response } from 'express'
import { logger } from '@/app/shared/log/logger'
import { UserRequest } from '../domain/interfaces'
import { encryptPassword } from '@/utils/encryptPassword'
import CreateUserUseCase from '../useCases/CreateUserUseCase'
import ErrorCode from '@/app/shared/error/errorCode'
import HttpStatusCode from '@/app/shared/enums/httpStatusCode'

export default class CreateUserController {
  async exceute(req: Request, res: Response) {
    const user: UserRequest = {
      name: req.body?.name,
      lastname: req.body?.lastname,
      password: req.body?.password,
      email: req.body?.email,
      department: req.body?.department,
    }

    if (!user.name || !user.lastname || !user.password || !user.email || !user.department) {
      logger({ HttpType: 'POST', route: '/users/signup', useremail: user.email, error: 'Missing required fields', success: false })
      res.status(HttpStatusCode.BAD_REQUEST).json({ error: [ErrorCode.ERR0008] })
    }

    user.password = await encryptPassword(user.password)
    const createUserUseCase = new CreateUserUseCase()
    await createUserUseCase.execute(user)
      .then((user) => {
        logger({ HttpType: 'POST', route: '/users/signup', useremail: user.email, success: true })
        res.status(HttpStatusCode.CREATED).json({ data: user })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/users/signup', useremail: user.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}