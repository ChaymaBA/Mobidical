import { UserRegistrationDto, UserLoginDto } from '@/dtos/auth.dto';
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';


export const authRoutes = express.Router();

export function initAuthRoutes(authController: AuthController) {
  // Registration route
  authRoutes.post(
    '/register', 
    ValidationMiddleware.validate(UserRegistrationDto),
    authController.register.bind(authController)
  );

  // Login route
  authRoutes.post(
    '/login', 
    ValidationMiddleware.validate(UserLoginDto),
    authController.login.bind(authController)
  );

  // Refresh token route
  authRoutes.post(
    '/refresh-token', 
    AuthMiddleware.authenticate,
    authController.refreshToken.bind(authController)
  );

  // Protected route example
  authRoutes.get(
    '/profile', 
    AuthMiddleware.authenticate,
    authController.getProfile.bind(authController)
  );

  return authRoutes;
}