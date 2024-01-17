import express from 'express'
import CreateUserController from './controller/CreateUserController'

export const UserRoutes = () => {
  const router = express.Router()
  // Controllers
  const createUserController = new CreateUserController()

  // CREATE USER: Registrar nuevo usuario
  router.post('/signup', createUserController.exceute)

  return router
}