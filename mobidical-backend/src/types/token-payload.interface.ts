import { UserRole } from "./enum.type";
// src/types/token-payload.interface.ts
export interface TokenPayload {
    lastName: string;
    id: number;
    email: string;
    username: string;
    role: UserRole;
  }

  // src/types/token-payload.interface.ts
export interface ResetPasswordTokenPayload {
  id: number;
  email: string;
}