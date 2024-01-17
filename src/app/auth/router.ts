import express from 'express'
import SignInController from './controller/SignInController'

export const AuthRoutes = () => {
  const router = express.Router()
  // Controllers
  const signInController = new SignInController()
  // Routes
  router.post('/token', signInController.execute)

  return router
}