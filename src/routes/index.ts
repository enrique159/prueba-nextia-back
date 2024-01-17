import express from 'express'

import { UserRoutes } from '@/app/modules/users/routes'
import { AuthRoutes } from '@/app/auth/router'

export const Routes = () => {
  const router = express.Router()

  // Users
  router.use('/users', UserRoutes())
  // Auth
  router.use('/auth', AuthRoutes())

  return router
}