export interface Users {
  users: User[];
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  department: number;
}

export interface UserId {
  userId: string;
}

export interface UserRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
  department: number;
}
