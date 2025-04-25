import { Router } from 'express';
import { UserSessionController } from '@/api/controllers/user_session.controller';
import { UserSessionCreateDto, UserSessionUpdateDto } from '@/dtos/user_session.dto';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { USER_SESSION_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { userSessionController: UserSessionController }): Router {
  const router = Router();
  const { userSessionController } = controllers;

 
  router.post(
    USER_SESSION_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(UserSessionCreateDto),
    userSessionController.createSession.bind(userSessionController)
  );


  router.get(
    USER_SESSION_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    userSessionController.getAllSessions.bind(userSessionController)
  );

  router.get(
    USER_SESSION_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    userSessionController.getSessionById.bind(userSessionController)
  );


  router.put(
    USER_SESSION_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(UserSessionUpdateDto),
    userSessionController.updateSession.bind(userSessionController)
  );


  router.delete(
    USER_SESSION_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    userSessionController.deleteSession.bind(userSessionController)
  );

  return router;
}