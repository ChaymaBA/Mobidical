import { Router } from 'express';
import { ExerciceController } from '@/api/controllers/exercice.controller';
import { ExerciceCreateDto, ExerciceUpdateDto } from '@/dtos/exercice.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { EXERCICE_ROUTES } from '@/constants/routes.constants';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@/types/enum.type';
export default function (controllers: { exerciceController: ExerciceController }): Router {
  const router = Router();
  const { exerciceController } = controllers;

  // Get all exercices route
  router.get(
    EXERCICE_ROUTES.GET_ALL,
    exerciceController.getAllExercices.bind(exerciceController)
  );

  // Get exercices by userId route
  router.get(
    EXERCICE_ROUTES.GET_BY_USER,
    exerciceController.getExercicesByUser.bind(exerciceController)
  );

  // Create exercice route
  router.post(
    EXERCICE_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    ValidationMiddleware.validate(ExerciceCreateDto),
    exerciceController.createExercice.bind(exerciceController)
  );

  // Update exercice route
  router.put(
    EXERCICE_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    ValidationMiddleware.validate(ExerciceUpdateDto),
    exerciceController.updateExercice.bind(exerciceController)
  );

  // Delete exercice route
  router.delete(
    EXERCICE_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    exerciceController.deleteExercice.bind(exerciceController)
  );

  return router;
}
