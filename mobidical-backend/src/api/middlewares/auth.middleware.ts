import { TokenUtil } from '@/core/utils/jwt.utils';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@/types/enum.type';
import jwt from 'jsonwebtoken';



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
      role: decoded.role,
      child_id: decoded.child_id, // Optional child ID
    };
    next();
  }

  // Optional: Role-based authorization
  static requireRole(requiredRole: UserRole) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      if (req.user.role !== requiredRole) {
        res.status(403).json({ 
          message: `Role ${requiredRole} required` 
        });
        return;
      }

      next();
    };
  }

  static isOwnerOrAdmin(paramKey = 'id') {
    return (req: Request, res: Response, next: NextFunction) => {
      const resourceId = parseInt(req.params[paramKey]);
      
      if (req.user?.role === UserRole.ADMIN) return next();
      if (req.user?.id === resourceId) return next();
      if (req.user?.child_id) return next();

      res.status(403).json({ message: 'Unauthorized operation' });
    };
  }
}

// Future implementation for role-based access
// Requires adding roles to your User entity and token payload
  