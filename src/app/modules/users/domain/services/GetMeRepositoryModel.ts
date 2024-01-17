import { IId } from '@/app/shared/common/domain/IId'
import { User } from '../interfaces'

export interface GetMeRepositoryModel {
  execute(userId: IId): Promise<User>
}