import type { Users, User } from '../interfaces/index'

export interface UsersRepositoryModel {
  getUsers(): Promise<Users>;
  getById(id: number): Promise<User>;
  create(payload: Partial<User>): Promise<User>;
  update(payload: Partial<User>): Promise<User>;
  delete(id: number): Promise<User>;
}