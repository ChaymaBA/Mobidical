import express from 'express';
import { AuthService } from '@/services/auth.service';
import { AppDataSource } from '@/core/configuration/data-source';
import { AuthController } from '@/api/controllers/auth.controller';
import { initAuthRoutes } from './auth.routes';
import { UserRepository } from '@/repositories/user.repository';
import { GameService } from '@/services/game.service';
import { GameController } from '@/api/controllers/game.controller';
import { initGameRoutes } from './game.routes';
import { GameRepository} from '@/repositories/game.repository';

export function initializeRoutes(): express.Router {
  const router = express.Router();

// Instantiate dependencies
const userRepository = new UserRepository(AppDataSource); // Ensure UserRepository is properly implemented
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);
  // Register all route modules
  router.use('/auth', initAuthRoutes(authController));

  // Instantiate dependencies
  const gameRepository = new GameRepository(AppDataSource);
  const gameService = new GameService(gameRepository);
  const gameController = new GameController(gameService);
  router.use('/game', initGameRoutes(gameController));
  // Example for another route module
  // const someOtherController = new SomeOtherController();
  // router.use('/some-other', initSomeOtherRoutes(someOtherController));

  return router;
}