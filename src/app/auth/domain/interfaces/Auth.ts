import { User } from '@/app/modules/users/domain/interfaces'

export interface Auth {
  email: string;
  password: string;
}

export interface QueryParams {
  [key: string]: string;
}

export interface AuthResponse {
  token: string;
  user: Partial<User>;
}

export interface RecoverPassResponse {
  user: Partial<User>;
  emailSent: boolean;
}