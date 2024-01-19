export interface Invitations {
  invitations: Invitation[];
}

export interface Invitation {
  id: string;
  guestName: string;
  date: string;
  hour: string;
  caducity: string;
  status: string;
  userId: string;
}

export interface InvitationId {
  invitationId: string;
}

export interface InvitationRequest {
  guestName: string;
  date: string;
  hour: string;
  caducity: string;
  status: string;
  userId: string;
}