// src/api/routes/exercise-assignment.routes.ts
import { Router } from 'express';
import { ExerciseAssignmentController } from '@/api/controllers/exercise_assignment.controller';
import { ExerciseAssignmentCreateDto, ExerciseAssignmentUpdateDto } from '@/dtos/exercise_assignment.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { EXERCISE_ASSIGNMENT_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { exerciseAssignmentController: ExerciseAssignmentController }): Router {
  const router = Router();
  const { exerciseAssignmentController } = controllers;

  /**
   * 🔹 Obtenir toutes les affectations (admin uniquement)
   */
  router.get(
    EXERCISE_ASSIGNMENT_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    exerciseAssignmentController.getAllAssignments.bind(exerciseAssignmentController)
  );

  /**
   * 🔹 Obtenir une affectation par ID
   */
  router.get(
    EXERCISE_ASSIGNMENT_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    exerciseAssignmentController.getAssignmentById.bind(exerciseAssignmentController)
  );

  /**
   * 🔹 Obtenir les affectations liées à l’enfant associé au token
   */
  router.get(
    EXERCISE_ASSIGNMENT_ROUTES.GET_BY_CHILD,
    AuthMiddleware.authenticate,
    exerciseAssignmentController.getAssignmentsByChild.bind(exerciseAssignmentController)
  );

  /**
   * 🔹 Créer une nouvelle affectation
   */
  router.post(
    EXERCISE_ASSIGNMENT_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ExerciseAssignmentCreateDto),
    exerciseAssignmentController.createAssignment.bind(exerciseAssignmentController)
  );

  /**
   * 🔹 Mettre à jour une affectation
   */
  router.put(
    EXERCISE_ASSIGNMENT_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ExerciseAssignmentUpdateDto),
    exerciseAssignmentController.updateAssignment.bind(exerciseAssignmentController)
  );

  /**
   * 🔹 Supprimer une affectation
   */
  router.delete(
    EXERCISE_ASSIGNMENT_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    exerciseAssignmentController.deleteAssignment.bind(exerciseAssignmentController)
  );

  router.post(
    EXERCISE_ASSIGNMENT_ROUTES.COMPLETE,
    AuthMiddleware.authenticate,
    exerciseAssignmentController.completeAssignment.bind(exerciseAssignmentController)
  );

  return router;
}
