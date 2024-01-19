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
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    department: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  })

  return User
}
