import { TokenUtil } from '@/core/utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@/types/enum.type';

// Extend Request type to include user property (same as in validation middleware)
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        username: string;
        lastName: string;
        UserRole: UserRole;
      };
    }
  }
}

export class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // Extract token (expecting "Bearer TOKEN")
    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Invalid token format' });
      return;
    }

    // Verify token
    const decoded = TokenUtil.verifyAccessToken(token);
    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Attach user to request with typed user object
    req.user = {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      lastName: decoded.lastName,
      UserRole: decoded.role
    };
    next();
  }

  // Optional: Role-based authorization
  static requireRole(roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      // Future implementation for role-based access
      // Requires adding roles to your User entity and token payload
      next();
    };
  }
}