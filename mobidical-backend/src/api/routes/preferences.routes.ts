// src/api/routes/preference.routes.ts
import { Router } from 'express';
import { PreferenceController } from '@/api/controllers/preferences.controller';
import { PreferenceCreateDto, PreferenceUpdateDto } from '@/dtos/preferences.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { PREFERENCE_ROUTES } from '@/constants/routes.constants';

export default function (controllers: { preferenceController: PreferenceController }): Router {
  const router = Router();
  const { preferenceController } = controllers;

  /**
   * Route pour obtenir toutes les préférences
   * - Pour les admins : toutes les préférences sont visibles
   * - Pour les utilisateurs normaux : seulement les préférences des enfants dont ils sont responsables
   * (le filtrage est fait dans le contrôleur)
   */
  router.get(
    PREFERENCE_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    preferenceController.getAllPreferences.bind(preferenceController)
  );

  /**
   * Route pour obtenir une préférence par ID
   * - Pour les admins : toutes les préférences sont accessibles
   * - Pour les utilisateurs normaux : seulement les préférences des enfants dont ils sont responsables
   * (la vérification est faite dans le contrôleur)
   */
  router.get(
    PREFERENCE_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    preferenceController.getPreferenceById.bind(preferenceController)
  );

  /**
   * Route pour obtenir les préférences d'un enfant spécifique
   * - Pour les admins : peut accéder aux préférences de n'importe quel enfant
   * - Pour les utilisateurs normaux : seulement les préférences des enfants dont ils sont responsables
   * (la vérification est faite dans le contrôleur)
   */
  router.get(
    PREFERENCE_ROUTES.GET_BY_CHILD,
    AuthMiddleware.authenticate,
    preferenceController.getPreferencesByChild.bind(preferenceController)
  );

  /**
   * Route pour créer une préférence
   * - Accessible à tous les utilisateurs authentifiés
   * (la vérification pour s'assurer qu'un utilisateur ne crée des préférences que pour les enfants
   * dont il est responsable est faite dans le contrôleur)
   */
  router.post(
    PREFERENCE_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PreferenceCreateDto),
    preferenceController.createPreference.bind(preferenceController)
  );

  /**
   * Route pour mettre à jour une préférence
   * - Pour les admins : peut mettre à jour n'importe quelle préférence
   * - Pour les utilisateurs normaux : seulement les préférences des enfants dont ils sont responsables
   * (la vérification est faite dans le contrôleur)
   */
  router.put(
    PREFERENCE_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(PreferenceUpdateDto),
    preferenceController.updatePreference.bind(preferenceController)
  );

  /**
   * Route pour supprimer une préférence
   * - Pour les admins : peut supprimer n'importe quelle préférence
   * - Pour les utilisateurs normaux : seulement les préférences des enfants dont ils sont responsables
   * (la vérification est faite dans le contrôleur)
   */
  router.delete(
    PREFERENCE_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    preferenceController.deletePreference.bind(preferenceController)
  );

  return router;
}