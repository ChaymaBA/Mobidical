import { Router } from 'express';
import { SessionController } from '@/api/controllers/session.controller';
import { SessionCreateDto, SessionUpdateDto } from '@/dtos/session.dto';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { SESSION_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { sessionController: SessionController }): Router {
  const router = Router();
  const { sessionController } = controllers;

 
  router.post(
    SESSION_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(SessionCreateDto),
    sessionController.createSession.bind(sessionController)
  );


  router.get(
    SESSION_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    sessionController.getAllSessions.bind(sessionController)
  );

  router.get(
    SESSION_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    sessionController.getSessionById.bind(sessionController)
  );


  router.put(
    SESSION_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(SessionUpdateDto),
    sessionController.updateSession.bind(sessionController)
  );


  router.delete(
    SESSION_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    sessionController.deleteSession.bind(sessionController)
  );

  return router;
}
