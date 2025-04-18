import jwt from 'jsonwebtoken';
import { User } from '@/entities';
import { TokenPayload } from '@/types';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_access_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_refresh_secret';
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET || 'default_reset_secret';

export class TokenUtil {
  static generateAccessToken(user: User, childId: number | null = null): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      role: user.role,
      child_id: childId
    };
    
    return jwt.sign(payload, JWT_ACCESS_SECRET, { 
      expiresIn: '7d' ,
      algorithm: 'HS256'
    });
  }
  
  static generateRefreshToken(user: User, childId: number | null = null): string {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      lastName: user.lastName,
      role: user.role,
      child_id: childId
    };
    
    return jwt.sign(payload, JWT_REFRESH_SECRET, { 
      expiresIn: '7d',
      algorithm: 'HS256'
     });
  }

  
  static verifyAccessToken(token: string): any {
    try {
      return jwt.verify(token, JWT_ACCESS_SECRET);
    } catch (error) {
      return null;
    }
  }

  static verifyRefreshToken(token: string): any {
    try {
      return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
      return null;
    }
  }
  static generateResetPasswordToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email
    };
    
    return jwt.sign(payload, JWT_RESET_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256'});
  }


  static verifyResetPasswordToken(token: string): any {
    try {
      return jwt.verify(token, JWT_RESET_SECRET);
    } catch (error) {
      return null;
    }
  }
}