import express from 'express';
import { AuthService } from '@/services/auth.service';
import { AppDataSource } from '@/core/configuration/data-source';
import { AuthController } from '@/api/controllers/auth.controller';
import { initAuthRoutes } from './auth.routes';
import { UserRepository } from '@/repositories/user.repository';

export function initializeRoutes(): express.Router {
  const router = express.Router();

// Instantiate dependencies
const userRepository = new UserRepository(AppDataSource); // Ensure UserRepository is properly implemented
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
  // Register all route modules
  router.use('/auth', initAuthRoutes(authController));

  // Example for another route module
  // const someOtherController = new SomeOtherController();
  // router.use('/some-other', initSomeOtherRoutes(someOtherController));

  return router;
}