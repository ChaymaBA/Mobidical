// src/repositories/feedback.repository.ts
import { Repository, DataSource } from 'typeorm';
import { Feedback } from '@/entities/Feedback';
import { FeedbackCreateDtoType, FeedbackUpdateDtoType } from '@/dtos/feedback.dto';
import { User } from '@/entities';

export class FeedbackRepository {
  private feedbackRepository: Repository<Feedback>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.feedbackRepository = this.dataSource.getRepository(Feedback);
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<Feedback[]> {
    return await this.feedbackRepository.find({
      relations: ['user']
    });
  }

  async findById(id: number): Promise<Feedback | null> {
    return await this.feedbackRepository.findOne({
      where: { Id: id },
      relations: ['user']
    });
  }

  async findByUserId(userId: number): Promise<Feedback[]> {
    return await this.feedbackRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  async create(feedbackData: FeedbackCreateDtoType): Promise<Feedback> {
    const user = await this.userRepository.findOneBy({ id: feedbackData.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const feedback = new Feedback();
    feedback.commentaire = feedbackData.commentaire;
    feedback.note = feedbackData.note;
    feedback.user = user;

    return await this.feedbackRepository.save(feedback);
  }

  async update(id: number, feedbackData: FeedbackUpdateDtoType): Promise<Feedback | null> {
    const feedback = await this.feedbackRepository.findOneBy({ Id: id });
    if (!feedback) {
      return null;
    }

    if (feedbackData.commentaire !== undefined) {
      feedback.commentaire = feedbackData.commentaire;
    }
    
    if (feedbackData.note !== undefined) {
      feedback.note = feedbackData.note;
    }

    return await this.feedbackRepository.save(feedback);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.feedbackRepository.delete({ Id: id });
    return result.affected ? result.affected > 0 : false;
  }
}