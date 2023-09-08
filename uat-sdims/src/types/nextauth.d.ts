
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt"{
  interface JWT{
    user : User;
  }
}
export interface User {
  name?: string | null | undefined;
  email?: string;
  token?: string;
  notBefore?: Date;
  role: string;
}