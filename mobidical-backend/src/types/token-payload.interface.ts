// src/types/token-payload.interface.ts
export interface TokenPayload {
    lastName: string;
    id: number;
    email: string;
    username: string;
  }

  // src/types/token-payload.interface.ts
export interface ResetPasswordTokenPayload {
  id: number;
  email: string;
}