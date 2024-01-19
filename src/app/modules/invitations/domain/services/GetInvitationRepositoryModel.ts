import { Invitation } from '../interfaces'

export interface GetInvitationRepositoryModel {
  execute(payload: string): Promise<Invitation>
}