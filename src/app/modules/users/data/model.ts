import DBConnectionManager from '@/app/shared/database/services/DBConnectionManager'
import UserSchema from './schema'

export const UserModel = async() => {
  const dbConnectionManager = DBConnectionManager.getInstance()
  const User = await UserSchema(dbConnectionManager.dbInstance)
  dbConnectionManager.dbInstance.synchronize()
  return User
}