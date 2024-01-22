import { Invitation } from '../interfaces'

export interface AcceptInvitationRepositoryModel {
  execute(payload: Partial<Invitation>): Promise<Invitation>
}