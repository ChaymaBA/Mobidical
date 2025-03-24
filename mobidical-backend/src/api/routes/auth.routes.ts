import { UserRegistrationDto, UserLoginDto,ForgotPasswordDto, ResetPasswordDto } from '@/dtos/auth.dto';
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { AUTH_ROUTES } from '@/constants/routes.constants';

export const authRoutes = express.Router();

export function initAuthRoutes(authController: AuthController) {
  // Registration route
  authRoutes.post(
    AUTH_ROUTES.REGISTER, 
    ValidationMiddleware.validate(UserRegistrationDto),
    authController.register.bind(authController)
  );

  // Login route
  authRoutes.post(
    AUTH_ROUTES.LOGIN, 
    ValidationMiddleware.validate(UserLoginDto),
    authController.login.bind(authController)
  );

  // Refresh token route
  authRoutes.post(
    AUTH_ROUTES.REFRESH_TOKEN, 
    AuthMiddleware.authenticate,
    authController.refreshToken.bind(authController)
  );

  // Protected route example
  authRoutes.get(
    AUTH_ROUTES.PROFILE,
    AuthMiddleware.authenticate,
    authController.getProfile.bind(authController)
  );

  // Update profile route
  authRoutes.put(
    AUTH_ROUTES.UPDATE_PROFILE,
    AuthMiddleware.authenticate,
  authController.updateProfile.bind(authController)
); 

// Delete profile route
  authRoutes.delete(
    AUTH_ROUTES.DELETE_PROFILE,
   AuthMiddleware.authenticate, 
   authController.deleteUser.bind(authController)
  ); 

// Forgot password route
  authRoutes.post(
    AUTH_ROUTES.FORGOT_PASSWORD,
    ValidationMiddleware.validate(ForgotPasswordDto),
    authController.forgotPassword.bind(authController)
  );

authRoutes.post(
  AUTH_ROUTES.RESET_PASSWORD,
  ValidationMiddleware.validate(ResetPasswordDto),
  authController.resetPassword.bind(authController)
);

  return authRoutes;
}