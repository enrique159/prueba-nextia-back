import express from 'express'
import SignInController from './controller/SignInController'
import RecoverPassController from './controller/RecoverPassController'

export const AuthRoutes = () => {
  const router = express.Router()
  // Controllers
  const signInController = new SignInController()
  const recoverPassController = new RecoverPassController()
  // Routes
  router.post('/token', signInController.execute)
  router.get('/recover/:email', recoverPassController.execute)

  return router
}