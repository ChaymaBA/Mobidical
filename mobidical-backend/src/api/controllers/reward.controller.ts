// src/controllers/reward.controller.ts
import { Request, Response } from 'express';
import { RewardService } from '@/services/reward.service';
import { RewardCreateDto, RewardUpdateDto, RewardCreateDtoType, RewardUpdateDtoType } from '@/dtos/reward.dto';
import { handleError } from '@/core/errors/errorHandler';
export class RewardController {
  constructor(private rewardService: RewardService) {}

  async createReward(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = RewardCreateDto.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: validationResult.error.errors 
        });
        return;
      }
      
      const data: RewardCreateDtoType = validationResult.data;
      const reward = await this.rewardService.createReward(data);
      res.status(201).json(reward);
    } catch (error) {
      console.error('Error creating reward:', error);
      handleError(res, error);
    }
  }

  async getAllRewards(_req: Request, res: Response): Promise<void> {
    try {
      const rewards = await this.rewardService.getAllRewards();
      res.status(200).json(rewards);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      handleError(res, error);
    }
  }

  async getRewardById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }
      
      const reward = await this.rewardService.getRewardById(id);
      
      if (!reward) {
        res.status(404).json({ message: 'Reward not found' });
        return;
      }
      
      res.status(200).json(reward);
    } catch (error) {
      console.error('Error fetching reward:', error);
      handleError(res, error);
    }
  }

  async updateReward(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }
      
      const validationResult = RewardUpdateDto.safeParse(req.body);
      
      if (!validationResult.success) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: validationResult.error.errors 
        });
        return;
      }
      
      const data: RewardUpdateDtoType = validationResult.data;
      const updatedReward = await this.rewardService.updateReward(id, data);
      
      if (!updatedReward) {
        res.status(404).json({ message: 'Reward not found' });
        return;
      }
      
      res.status(200).json(updatedReward);
    } catch (error) {
      console.error('Error updating reward:', error);
      handleError(res, error);
    }
  }

  async deleteReward(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid ID format' });
        return;
      }
      
      const isDeleted = await this.rewardService.deleteReward(id);
      
      if (!isDeleted) {
        res.status(404).json({ message: 'Reward not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting reward:', error);
      handleError(res, error);
    }
  }

  async attribuerRecompense(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const points = parseInt(req.body.points);
      
      if (isNaN(userId) || isNaN(points)) {
        res.status(400).json({ message: 'Invalid user ID or points format' });
        return;
      }
      
      const rewardAttribuee = await this.rewardService.attribuerRecompense(userId, points);
      
      if (!rewardAttribuee) {
        res.status(404).json({ message: 'No eligible reward found for these points' });
        return;
      }
      
      res.status(200).json({
        message: 'Récompense attribuée avec succès',
        reward: rewardAttribuee
      });
    } catch (error) {
      console.error('Error attributing reward:', error);
      handleError(res, error);
    }
  }
}