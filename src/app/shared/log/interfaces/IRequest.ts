export interface IRequest {
  HttpType: string;
  route: string;
  useremail: string;
  error?: string;
  success?: boolean;
}