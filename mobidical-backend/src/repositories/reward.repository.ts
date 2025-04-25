// src/repositories/reward.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Reward } from '@/entities/Reward';
import { RewardCreateDtoType, RewardUpdateDtoType } from '@/dtos/reward.dto';

export class RewardRepository {
  private rewardRepository: Repository<Reward>;

  constructor(private dataSource: DataSource) {
    this.rewardRepository = this.dataSource.getRepository(Reward);
  }

  async create(data: RewardCreateDtoType): Promise<Reward> {
    const reward = this.rewardRepository.create({
      Nom: data.nom,
      pointsNecessaires: data.pointsNecessaires
    });
    
    return await this.rewardRepository.save(reward);
  }

  async findAll(): Promise<Reward[]> {
    return await this.rewardRepository.find();
  }

  async findById(id: number): Promise<Reward | null> {
    return await this.rewardRepository.findOne({
      where: { Id: id },
      relations: ['progressReport', 'exerciseAssignments']
    });
  }

  async update(id: number, data: RewardUpdateDtoType): Promise<Reward | null> {
    const reward = await this.rewardRepository.findOneBy({ Id: id });
    if (!reward) {
      return null;
    }

    if (data.nom !== undefined) {
      reward.Nom = data.nom;
    }
    
    if (data.pointsNecessaires !== undefined) {
      reward.pointsNecessaires = data.pointsNecessaires;
    }

    return await this.rewardRepository.save(reward);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.rewardRepository.delete({ Id: id });
    return result.affected ? result.affected > 0 : false;
  }
}