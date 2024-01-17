import { User } from '@app/modules/users/domain/interfaces/Users'
import type { QueryParams } from '../interfaces/index'

export interface SignInRepositoryModel {
  execute(payload: QueryParams): Promise<User>;
}