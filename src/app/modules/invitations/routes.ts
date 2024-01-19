import express from 'express'
import CreateInvitationController from './controller/CreateInvitationController'
import GetInvitationsController from './controller/GetInvitationsController'
import VerifyAuthMiddleware from '@/app/middleware/VerifyAuthMiddleware'

export const InvitationRoutes = () => {
  const router = express.Router()
  // Controllers
  const createInvitationController = new CreateInvitationController()
  const getInvitationsController = new GetInvitationsController()
  // Middlewares
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // CREATE INVITATION: Crear invitación
  router.post('/', verifyAuthMiddleware.execute, createInvitationController.execute)
  // GET INVITATIONS: Obtener invitaciones
  router.get('/', verifyAuthMiddleware.execute, getInvitationsController.execute)

  return router
}