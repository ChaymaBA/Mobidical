import { RewardRepository } from '@/repositories/reward.repository';
import { Reward } from '@/entities/Reward';
import { RewardCreateDtoType, RewardUpdateDtoType } from '@/dtos/reward.dto';

export class RewardService {
  constructor(private rewardRepository: RewardRepository) {}

  async createReward(data: RewardCreateDtoType): Promise<Reward> {
    return await this.rewardRepository.create(data);
  }

  async getAllRewards(): Promise<Reward[]> {
    return await this.rewardRepository.findAll();
  }

  async getRewardById(id: number): Promise<Reward | null> {
    return await this.rewardRepository.findById(id);
  }

  async updateReward(id: number, data: RewardUpdateDtoType): Promise<Reward | null> {
    return await this.rewardRepository.update(id, data);
  }

  async deleteReward(id: number): Promise<boolean> {
    return await this.rewardRepository.delete(id);
  }

  async attribuerRecompense(userId: number, points: number): Promise<Reward | null> {
    // Trouver toutes les récompenses
    const rewards = await this.rewardRepository.findAll();
    
    // Trier par points nécessaires (du plus petit au plus grand)
    rewards.sort((a, b) => a.pointsNecessaires - b.pointsNecessaires);
    
    // Trouver la récompense la plus élevée que l'utilisateur peut obtenir
    let rewardEligible: Reward | null = null;
    
    for (const reward of rewards) {
      if (points >= reward.pointsNecessaires) {
        rewardEligible = reward;
      } else {
        break;
      }
    }
    
    return rewardEligible;
  }
}