export interface Login{
  email: string;
  password: string;
  role: string;
}
export interface LoginRes{
  userId: string;
  token: string;
}
