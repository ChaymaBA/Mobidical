// src/api/routes/reward.routes.ts
import { Router } from 'express';
import { RewardController } from '@/api/controllers/reward.controller';
import { RewardCreateDto, RewardUpdateDto } from '@/dtos/reward.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { REWARD_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function ({ rewardController }: { rewardController: RewardController }): Router {
  const router = Router();

  // Create reward
  router.post(
    REWARD_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(RewardCreateDto),
    rewardController.createReward.bind(rewardController)
  );

  // Get all rewards
  router.get(
    REWARD_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    rewardController.getAllRewards.bind(rewardController)
  );

  // Get reward by ID
  router.get(
    REWARD_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    rewardController.getRewardById.bind(rewardController)
  );

  // Update reward
  router.put(
    REWARD_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(RewardUpdateDto),
    rewardController.updateReward.bind(rewardController)
  );

  // Delete reward
  router.delete(
    REWARD_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    rewardController.deleteReward.bind(rewardController)
  );

  // Attribuer une récompense à un utilisateur
  router.post(
    REWARD_ROUTES.ATTRIBUER,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    rewardController.attribuerRecompense.bind(rewardController)
  );

  return router;
}
