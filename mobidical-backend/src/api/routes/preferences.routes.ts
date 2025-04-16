import { Router } from 'express';
import { PreferenceController } from '@/api/controllers/preferences.controller';
import { PreferenceCreateDto, PreferenceUpdateDto } from '@/dtos/preferences.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { PREFERENCE_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { preferenceController: PreferenceController }): Router {
  const router = Router();
  const { preferenceController } = controllers;

  // Get all preferences (admin only)
  router.get(
    PREFERENCE_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    preferenceController.getAllPreferences.bind(preferenceController)
  );

  // Get preference by ID
  router.get(
    PREFERENCE_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    preferenceController.getPreferenceById.bind(preferenceController)
  );

  // Get preferences by child
  router.get(
    PREFERENCE_ROUTES.GET_BY_CHILD,
    AuthMiddleware.authenticate,
    preferenceController.getPreferencesByChild.bind(preferenceController)
  );

  // Get preferences by user ID
  router.get(
    PREFERENCE_ROUTES.GET_BY_USER,
    AuthMiddleware.authenticate,
    AuthMiddleware.isOwnerOrAdmin('userId'),
    preferenceController.getPreferencesByUser.bind(preferenceController)
  );

  // Create preference – child_id will be inferred from token
  router.post(
    PREFERENCE_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PreferenceCreateDto),
    preferenceController.createPreference.bind(preferenceController)
  );

  // Update preference
  router.put(
    PREFERENCE_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PreferenceUpdateDto),
    preferenceController.updatePreference.bind(preferenceController)
  );

  // Delete preference
  router.delete(
    PREFERENCE_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    preferenceController.deletePreference.bind(preferenceController)
  );

  return router;
}
