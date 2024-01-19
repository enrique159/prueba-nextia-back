import { Invitation } from '../interfaces'

export interface UpdateInvitationRepositoryModel {
  execute(payload: Partial<Invitation>): Promise<Invitation>
}