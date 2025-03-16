import { UserRegistrationDto, UserLoginDto,ForgotPasswordDto, ResetPasswordDto } from '@/dtos/auth.dto';
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

  // Update profile route
  authRoutes.put(
    '/profile', 
    AuthMiddleware.authenticate,
  authController.updateProfile.bind(authController)
); 

// Delete profile route
  authRoutes.delete(
  '/profile',
   AuthMiddleware.authenticate, 
   authController.deleteUser.bind(authController)
  ); 

// Forgot password route
  authRoutes.post(
    '/forgot-password',
    ValidationMiddleware.validate(ForgotPasswordDto),
    authController.forgotPassword.bind(authController)
  );

authRoutes.post(
  '/reset-password',
  ValidationMiddleware.validate(ResetPasswordDto),
  authController.resetPassword.bind(authController)
);

  return authRoutes;
}