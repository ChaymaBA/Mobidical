import express from 'express';
import fs from 'fs';
import path from 'path';
import { AppDataSource } from '@/core/configuration/data-source';
 
// Repositories
import { UserRepository } from '@/repositories/user.repository';
import { ExerciceRepository } from '@/repositories/exercice.repository';
 
// Services
import { AuthService } from '@/services/auth.service';
import { ExerciceService } from '@/services/exercice.service';
 
// Controllers
import { AuthController } from '@/api/controllers/auth.controller';
import { ExerciceController } from '@/api/controllers/exercice.controller';
 
// Map repositories to services
const repositories = {
  userRepository: new UserRepository(AppDataSource),
  exerciceRepository: new ExerciceRepository(AppDataSource),
};
 
// Map services to controllers
const services = {
  authService: new AuthService(repositories.userRepository),
  exerciceService: new ExerciceService(repositories.exerciceRepository),
};
 
const controllers = {
  authController: new AuthController(services.authService),
  exerciceController: new ExerciceController(services.exerciceService),
};
 
export function initializeRoutes(): express.Router {
  const router = express.Router();
  const routesDir = path.join(__dirname, './'); // Adjust the path if needed
 
  fs.readdirSync(routesDir).forEach((file) => {
    if (file.endsWith('.routes.ts') ) {
      import(path.join(routesDir, file)).then((routeModule) => {
        if (routeModule.default) {
          router.use(`/${file.replace('.routes.ts', '')}`, routeModule.default(controllers));
        }
      });
    }
  });
 
  return router;
}
