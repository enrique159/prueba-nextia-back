import { InvitationId } from '../interfaces'

export interface DeleteInvitationRepositoryModel {
  execute(payload: InvitationId): Promise<number>
}