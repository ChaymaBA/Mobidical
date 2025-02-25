import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Extend Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        username: string;
      };
    }
  }
}

export class ValidationMiddleware {
  static validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        // Parse and validate the request body
        schema.parse(req.body);
        next();
      } catch (error) {
        // If validation fails, return detailed error messages
        if (error instanceof Error) {
          res.status(400).json({
            message: 'Validation failed',
            errors: error instanceof Error ? [error.message] : error
          });
        } else {
          res.status(400).json({
            message: 'Validation failed',
            errors: ['Unknown validation error']
          });
        }
      }
    };
  }
}