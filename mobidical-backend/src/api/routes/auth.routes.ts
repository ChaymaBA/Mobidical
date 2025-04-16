import { Router } from 'express';
import { AuthController } from '@/api/controllers/auth.controller';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { AUTH_ROUTES } from '@/constants/routes.constants';
import { UserRegistrationDto, UserLoginDto, ForgotPasswordDto, ResetPasswordDto } from '@/dtos/auth.dto';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { authController: AuthController }): Router {
  const router = Router();
  const { authController } = controllers;

  // Registration route
  router.post(
    AUTH_ROUTES.REGISTER,
    ValidationMiddleware.validate(UserRegistrationDto),
    authController.register.bind(authController)
  );

  // Login route
  router.post(
    AUTH_ROUTES.LOGIN,
    ValidationMiddleware.validate(UserLoginDto),
    authController.login.bind(authController)
  );

  // Refresh token route
  router.post(
    AUTH_ROUTES.REFRESH_TOKEN,
    AuthMiddleware.authenticate,
    authController.refreshToken.bind(authController)
  );

  // Protected route example
  router.get(
    AUTH_ROUTES.PROFILE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    authController.getProfile.bind(authController)
  );

  // Update profile
  router.put(
    AUTH_ROUTES.UPDATE_PROFILE,
    AuthMiddleware.authenticate,
    authController.updateProfile.bind(authController)
  );

  // Delete profile
  router.delete(
    AUTH_ROUTES.DELETE_PROFILE,
    AuthMiddleware.authenticate,
    authController.deleteUser.bind(authController)
  );

  // Forgot password
  router.post(
    AUTH_ROUTES.FORGOT_PASSWORD,
    ValidationMiddleware.validate(ForgotPasswordDto),
    authController.forgotPassword.bind(authController)
  );

  // Reset password
  router.post(
    AUTH_ROUTES.RESET_PASSWORD,
    ValidationMiddleware.validate(ResetPasswordDto),
    authController.resetPassword.bind(authController)
  );


  return router;
}
