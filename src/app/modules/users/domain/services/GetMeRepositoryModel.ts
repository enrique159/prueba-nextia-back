import { User } from '../interfaces'
import { QueryParams } from '@/app/auth/domain/interfaces'

export interface GetMeRepositoryModel {
  execute(userId: QueryParams): Promise<User>
}