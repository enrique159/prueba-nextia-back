import express from 'express'
import CreateInvitationController from './controller/CreateInvitationController'
import VerifyAuthMiddleware from '@/app/middleware/VerifyAuthMiddleware'

export const InvitationRoutes = () => {
  const router = express.Router()
  // Controllers
  const createInvitationController = new CreateInvitationController()
  // Middlewares
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // CREATE INVITATION: Crear invitación
  router.post('/', verifyAuthMiddleware.execute, createInvitationController.execute)

  return router
}