import { QueryParams } from '@/app/auth/domain/interfaces'
import type { User } from '../interfaces/index'

export interface UpdatePasswordRepositoryModel {
  execute(payload: Partial<QueryParams>): Promise<User>;
}