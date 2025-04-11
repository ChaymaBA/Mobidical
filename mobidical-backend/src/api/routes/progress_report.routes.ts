import { Router } from 'express';
import { ProgressReportController } from '@/api/controllers/progress_report.controller';
import { ProgressReportCreateDto, ProgressReportUpdateDto } from '@/dtos/progress_report.dto';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { PROGRESS_REPORT_ROUTES } from '@/constants/routes.constants';

export default function (controllers: { progressReportController: ProgressReportController }): Router {
  const router = Router();
  const { progressReportController } = controllers;

  // Obtenir tous les rapports de progrès
  router.get(
    PROGRESS_REPORT_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    progressReportController.getAllProgressReports.bind(progressReportController)
  );

  // Obtenir un rapport par ID
  router.get(
    PROGRESS_REPORT_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    progressReportController.getProgressReportById.bind(progressReportController)
  );

  // Obtenir les rapports d’un enfant
  router.get(
    PROGRESS_REPORT_ROUTES.GET_BY_CHILD,
    AuthMiddleware.authenticate,
    progressReportController.getProgressReportsByChild.bind(progressReportController)
  );



  // Créer un rapport
  router.post(
    PROGRESS_REPORT_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ProgressReportCreateDto),
    progressReportController.createProgressReport.bind(progressReportController)
  );

  // Mettre à jour un rapport
  router.put(
    PROGRESS_REPORT_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(ProgressReportUpdateDto),
    progressReportController.updateProgressReport.bind(progressReportController)
  );

  // Supprimer un rapport
  router.delete(
    PROGRESS_REPORT_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    progressReportController.deleteProgressReport.bind(progressReportController)
  );

  return router;
}
