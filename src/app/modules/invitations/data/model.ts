import DBConnectionManager from '@/app/shared/database/services/DBConnectionManager'
import InvitationSchema from './schema'

export const InvitationModel = async() => {
  const dbConnectionManager = DBConnectionManager.getInstance()
  const Invitation = await InvitationSchema(dbConnectionManager.dbInstance)
  dbConnectionManager.dbInstance.synchronize()
  return Invitation
}