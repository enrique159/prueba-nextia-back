import { DataTypes } from 'sequelize'
import { User } from '../domain/interfaces'
import { IModelBases } from '@/app/shared/common/domain/IBases'
import SequelizeManager from '@/app/shared/database/integrations/SequelizeManager'

export default (sequelize: SequelizeManager)  => {
  const User = sequelize.defineModel<User & IModelBases>('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    department: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })

  return User
}
