import express from 'express'

import { UserRoutes } from '@/app/modules/users/routes'

export const Routes = () => {
  const router = express.Router()

  // Users
  router.use('/users', UserRoutes())

  return router
}