import type { User } from '../interfaces/index'

export interface CreateUserRepositoryModel {
  execute(payload: Partial<User>): Promise<User>;
}