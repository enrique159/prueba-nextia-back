import type { Invitation } from '../interfaces'

export interface CreateInvitationRepositoryModel {
  execute(payload: Partial<Invitation>): Promise<Invitation>;
}