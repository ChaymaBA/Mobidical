import express from 'express';
import fs from 'fs';
import path from 'path';
import { AppDataSource } from '@/core/configuration/data-source';
 
// Repositories
import { UserRepository } from '@/repositories/user.repository';
import { ExerciceRepository } from '@/repositories/exercice.repository';
 import { FeedbackRepository } from '@/repositories/feedback.repository';
 import { ChildrenRepository } from '@/repositories/children.repository';
 import { ProgressReportRepository } from '@/repositories/progress_report.repository';
 import { PreferenceRepository } from '@/repositories/preferences.repository';
 import { MediaAssetRepository } from '@/repositories/media_assets.repository';
 import { ExerciseAssignmentRepository } from '@/repositories/exercise_assignment.repository';
 import { CategoryRepository } from '@/repositories/category_exercice.repository';
 import { UserDeviceRepository } from '@/repositories/user_device.repository';
 import { SessionRepository } from '@/repositories/session.repository';
 import { UserSessionRepository } from '@/repositories/user_session.repository';
 import { RewardRepository } from '@/repositories/reward.repository';

// Services
import { AuthService } from '@/services/auth.service';
import { ExerciceService } from '@/services/exercice.service';
import { FeedbackService } from '@/services/feedback.service';
import { ChildrenService } from '@/services/children.service';
import { ProgressReportService } from '@/services/progress_report.service';
import { PreferenceService } from '@/services/preferences.service';
import { MediaAssetService } from '@/services/media_assets.service';
import { ExerciseAssignmentService } from '@/services/exercise_assignment.service';
import { CategoryService } from '@/services/category_exercice.service';
import { UserDeviceService } from '@/services/user_device.service';
import { SessionService } from '@/services/session.service';
import { UserSessionService } from '@/services/user_session.service';
import { RewardService } from '@/services/reward.service';
// Controllers
import { AuthController } from '@/api/controllers/auth.controller';
import { ExerciceController } from '@/api/controllers/exercice.controller';
 import { FeedbackController } from '@/api/controllers/feedback.controller';
import { ChildrenController } from '@/api/controllers/children.controller';
import { ProgressReportController } from '@/api/controllers/progress_report.controller';
import { PreferenceController } from '@/api/controllers/preferences.controller';
import { MediaAssetController } from '@/api/controllers/media_assets.controller';
import { ExerciseAssignmentController } from '@/api/controllers/exercise_assignment.controller';
import { CategoryController } from '@/api/controllers/category_exercice.controller';
import { UserDeviceController } from '@/api/controllers/user_device.controller';
import { SessionController } from '@/api/controllers/session.controller';
import { UserSessionController } from '@/api/controllers/user_session.controller';
import { RewardController } from '@/api/controllers/reward.controller';
const repositories = {
  userRepository: new UserRepository(AppDataSource),
  exerciceRepository: new ExerciceRepository(AppDataSource),
  feedbackRepository: new FeedbackRepository(AppDataSource),
  childrenRepository: new ChildrenRepository(AppDataSource),
  progressReportRepository: new ProgressReportRepository(),
  preferenceRepository: new PreferenceRepository(),
  mediaAssetRepository: new MediaAssetRepository(AppDataSource),
  exerciseAssignmentRepository: new ExerciseAssignmentRepository(AppDataSource),
  categoryRepository: new CategoryRepository(AppDataSource),
  userDeviceRepository: new UserDeviceRepository(AppDataSource),
  SessionRepository: new SessionRepository(AppDataSource),
  userSessionRepository: new UserSessionRepository(AppDataSource),
  rewardRepository: new RewardRepository(AppDataSource),
};
 
// Map services to controllers
const services = {
  authService: new AuthService(repositories.userRepository),
  exerciceService: new ExerciceService(repositories.exerciceRepository),
  feedbackService: new FeedbackService(repositories.feedbackRepository),
  childrenService: new ChildrenService(repositories.childrenRepository),
  progressReportService: new ProgressReportService(repositories.progressReportRepository),
  preferenceService: new PreferenceService(
    repositories.preferenceRepository,
    repositories.childrenRepository,
    repositories.userRepository
  ),
  mediaAssetService: new MediaAssetService(
    repositories.mediaAssetRepository,
    repositories.childrenRepository,
    repositories.userRepository
  ),
  exerciseAssignmentService: new ExerciseAssignmentService(
    repositories.exerciseAssignmentRepository,
    repositories.childrenRepository
  ),
  categoryService: new CategoryService(repositories.categoryRepository),
  userDeviceService: new UserDeviceService(repositories.userDeviceRepository),
  sessionService: new SessionService(repositories.SessionRepository),
  userSessionService: new UserSessionService(repositories.userSessionRepository),
  rewardService: new RewardService(repositories.rewardRepository),

};
 
const controllers = {
  authController: new AuthController(services.authService),
  exerciceController: new ExerciceController(services.exerciceService),
  feedbackController: new FeedbackController(services.feedbackService),
  childrenController: new ChildrenController(services.childrenService),
  progressReportController: new ProgressReportController(services.progressReportService, services.childrenService),
  preferenceController: new PreferenceController(services.preferenceService),
  mediaAssetController: new MediaAssetController(services.mediaAssetService),
  exerciseAssignmentController: new ExerciseAssignmentController(services.exerciseAssignmentService),
  categoryController: new CategoryController(services.categoryService),
  userDeviceController: new UserDeviceController(services.userDeviceService),
  sessionController: new SessionController(services.sessionService),
  userSessionController: new UserSessionController(services.userSessionService),
  rewardController: new RewardController(services.rewardService),
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
