import { UserId } from '@/app/modules/users/domain/interfaces'
import { Invitations } from '../interfaces'

export interface GetInvitationsRepositoryModel {
  execute(payload: UserId): Promise<Invitations>
}