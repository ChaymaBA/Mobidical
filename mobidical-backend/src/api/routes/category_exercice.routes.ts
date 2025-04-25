import { Router } from 'express';
import { CategoryController } from '@/api/controllers/category_exercice.controller';
import { CategoryCreateDto, CategoryUpdateDto } from '@/dtos/category_exercice.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { CATEGORY_ROUTES } from '@/constants/routes.constants';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { categoryController: CategoryController }): Router {
  const router = Router();
  const { categoryController } = controllers;

  // Get all categories route
  router.get(
    CATEGORY_ROUTES.GET_ALL,
    categoryController.getAllCategories.bind(categoryController)
  );

  // Get category by ID route
  router.get(
    CATEGORY_ROUTES.GET_BY_ID,
    categoryController.getCategoryById.bind(categoryController)
  );

  // Get category by name route
  router.get(
    CATEGORY_ROUTES.GET_BY_NAME,
    categoryController.getCategoryByName.bind(categoryController)
  );

  // Create category route
  router.post(
    CATEGORY_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    ValidationMiddleware.validate(CategoryCreateDto),
    categoryController.createCategory.bind(categoryController)
  );

  // Update category route
  router.put(
    CATEGORY_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    ValidationMiddleware.validate(CategoryUpdateDto),
    categoryController.updateCategory.bind(categoryController)
  );

  // Delete category route
  router.delete(
    CATEGORY_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    categoryController.deleteCategory.bind(categoryController)
  );

  return router;
}