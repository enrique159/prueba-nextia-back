import express from 'express'
import CreateInvitationController from './controller/CreateInvitationController'
import GetInvitationsController from './controller/GetInvitationsController'
import GetInvitationController from './controller/GetInvitationController'
import DeleteInvitationController from './controller/DeleteInvitationController'
import UpdateInvitationController from './controller/UpdateInvitationController'
import AcceptInvitationController from './controller/AcceptInvitationController'
import VerifyAuthMiddleware from '@/app/middleware/VerifyAuthMiddleware'

export const InvitationRoutes = () => {
  const router = express.Router()
  // Controllers
  const createInvitationController = new CreateInvitationController()
  const getInvitationsController = new GetInvitationsController()
  const getInvitationController = new GetInvitationController()
  const deleteInvitationController = new DeleteInvitationController()
  const updateInvitationController = new UpdateInvitationController()
  const acceptInvitationController = new AcceptInvitationController()
  // Middlewares
  const verifyAuthMiddleware = new VerifyAuthMiddleware()

  // CREATE INVITATION: Crear invitación
  router.post('/', verifyAuthMiddleware.execute, createInvitationController.execute)
  // GET INVITATIONS: Obtener invitaciones
  router.get('/', verifyAuthMiddleware.execute, getInvitationsController.execute)
  // GET INVITATION: Obtener invitación
  router.get('/:id', getInvitationController.execute)
  // DELETE INVITATION: Eliminar invitación
  router.delete('/:id', verifyAuthMiddleware.execute, deleteInvitationController.execute)
  // UPDATE INVITATION: Actualizar invitación
  router.put('/:id', verifyAuthMiddleware.execute, updateInvitationController.execute)
  // ACCEPT INVITATION: Aceptar invitación
  router.get('/accept/:id', acceptInvitationController.execute)

  return router
}