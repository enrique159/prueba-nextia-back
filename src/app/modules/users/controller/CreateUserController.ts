import { Request, Response } from 'express'
import { logger } from '@/app/shared/log/logger'
import { UserRequest } from '../domain/interfaces'
import { encryptPassword } from '@/utils/encryptPassword'
import CreateUserUseCase from '../useCases/CreateUserUseCase'

export default class CreateUserController {
  async exceute(req: Request, res: Response) {
    const user: UserRequest = {
      name: req.body.name,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      department: req.body.department,
    }

    user.password = await encryptPassword(user.password)
    const createUserUseCase = new CreateUserUseCase()
    await createUserUseCase.execute(user)
      .then((user) => {
        logger({ HttpType: 'POST', route: '/signup', useremail: user.email, success: true })
        res.status(201).json({ data: user })
      })
      .catch((err) => {
        logger({ HttpType: 'POST', route: '/signup', useremail: user.email, error: err.errors[0].description, success: false })
        res.status(err.statusCode).json({ error: err.errors })
      })
  }
}