import { Router } from 'express';
import { ChildrenController } from '@/api/controllers/children.controller';
import { ChildrenCreateDto, ChildrenUpdateDto } from '@/dtos/children.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { CHILDREN_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { childrenController: ChildrenController }): Router {
  const router = Router();
  const { childrenController } = controllers;

  /**
   * 🔹 Obtenir tous les enfants
   */
  router.get(
    CHILDREN_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
     AuthMiddleware.requireRole(UserRole.ADMIN),
    childrenController.getAllChildren.bind(childrenController)
  );

  /**
   * 🔹 Obtenir un enfant par ID
   */
  router.get(
    CHILDREN_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    childrenController.getChildById.bind(childrenController)
  );

  /**
   * 🔹 Obtenir les enfants d'un utilisateur spécifique
   */
  router.get(
    CHILDREN_ROUTES.GET_BY_USER,
    AuthMiddleware.authenticate,
    childrenController.getChildrenByUser.bind(childrenController)
  );

  /**
   * 🔹 Créer un enfant
   */
  router.post(
    CHILDREN_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChildrenCreateDto),
    childrenController.createChild.bind(childrenController)
  );

  /**
   * 🔹 Mettre à jour un enfant
   */
  router.put(
    CHILDREN_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ChildrenUpdateDto),
    childrenController.updateChild.bind(childrenController)
  );

  /**
   * 🔹 Supprimer un enfant
   */
  router.delete(
    CHILDREN_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    childrenController.deleteChild.bind(childrenController)
  );

  return router;
}
