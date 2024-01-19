import { DataTypes } from 'sequelize'
import { Invitation } from '../domain/interfaces'
import { IModelBases } from '@/app/shared/common/domain/IBases'
import SequelizeManager from '@/app/shared/database/integrations/SequelizeManager'

export default (sequelize: SequelizeManager)  => {
  const Invitation = sequelize.defineModel<Invitation & IModelBases>('Invitation', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    guestName: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    hour: { type: DataTypes.STRING, allowNull: false },
    caducity: { type: DataTypes.DATE, allowNull: false },
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  })

  return Invitation
}