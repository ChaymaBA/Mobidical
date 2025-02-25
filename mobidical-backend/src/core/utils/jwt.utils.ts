import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '@/types';
import { User } from '@/entities';


export class TokenUtil {
  private static JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_CHANGE_IN_PRODUCTION';
  private static JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_CHANGE_IN_PRODUCTION';

  static generateAccessToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    return jwt.sign(payload, this.JWT_SECRET, { 
      expiresIn: '15m',  // Short-lived access token
      algorithm: 'HS256'
    });
  }

  static generateRefreshToken(user: User): string {
    const payload: TokenPayload = {
      id: user.id,
      email: user.email,
      username: user.username
    };

    return jwt.sign(payload, this.JWT_REFRESH_SECRET, { 
      expiresIn: '7d',  // Longer-lived refresh token
      algorithm: 'HS256'
    });
  }

  static verifyAccessToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  static verifyRefreshToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, this.JWT_REFRESH_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }
}