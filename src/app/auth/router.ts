import express from 'express'
import SignInController from './controller/SignInController'
import RecoverPassController from './controller/RecoverPassController'
import LogOutController from './controller/LogOutController'

export const AuthRoutes = () => {
  const router = express.Router()
  // Controllers
  const signInController = new SignInController()
  const recoverPassController = new RecoverPassController()
  const logOutController = new LogOutController()
  // Routes
  router.post('/token', signInController.execute)
  router.get('/recover/:email', recoverPassController.execute)
  router.post('/logout', logOutController.execute)


  return router
}