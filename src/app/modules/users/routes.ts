import express from 'express'
import CreateUserController from './controller/CreateUserController'
import VerifyAuthMiddleware from '@/app/middleware/VerifyAuthMiddleware'
import UpdatePasswordController from './controller/UpdatePasswordController'

export const UserRoutes = () => {
  const router = express.Router()
  // Controllers
  const createUserController = new CreateUserController()
  const updatePassowrdController = new UpdatePasswordController()
  // Middlewares
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // CREATE USER: Registrar nuevo usuario
  router.post('/signup', createUserController.exceute)
  // UPDATE PASSWORD: Actualizar contraseña
  router.post('/update-password', verifyAuthMiddleware.execute, updatePassowrdController.execute)

  return router
}