// src/repositories/exercise-assignment.repository.ts
import { Repository, DataSource } from 'typeorm';
import { ExerciseAssignment } from '@/entities/Exercise_assignment';
import { Children } from '@/entities/Children';
import { Exercice } from '@/entities/Exercice';
import {
  ExerciseAssignmentCreateDtoType,
  ExerciseAssignmentUpdateDtoType
} from '@/dtos/exercise_assignment.dto';

export class ExerciseAssignmentRepository {
  private assignmentRepo: Repository<ExerciseAssignment>;
  private childRepo: Repository<Children>;
  private exerciseRepo: Repository<Exercice>;

  constructor(private dataSource: DataSource) {
    this.assignmentRepo = this.dataSource.getRepository(ExerciseAssignment);
    this.childRepo = this.dataSource.getRepository(Children);
    this.exerciseRepo = this.dataSource.getRepository(Exercice);
  }

  async findAll(): Promise<ExerciseAssignment[]> {
    return await this.assignmentRepo.find({
      relations: ['child', 'exercise']
    });
  }

  async findById(id: number): Promise<ExerciseAssignment | null> {
    return await this.assignmentRepo.findOne({
      where: { id },
      relations: ['child', 'exercise']
    });
  }

  async findByChild(childId: number): Promise<ExerciseAssignment[]> {
    return await this.assignmentRepo.find({
      where: { child: { id: childId } },
      relations: ['exercise']
    });
  }

  async create(
    data: ExerciseAssignmentCreateDtoType,
    childId: number
  ): Promise<ExerciseAssignment> {
    const child = await this.childRepo.findOneBy({ id: childId });
    if (!child) throw new Error('Child not found');

    const exercise = await this.exerciseRepo.findOneBy({ id: data.exerciseId });
    if (!exercise) throw new Error('Exercise not found');

    const assignment = this.assignmentRepo.create({
      child,
      exercise,
      is_completed: false,
      attempts: 0,
      score: 0
    });

    return await this.assignmentRepo.save(assignment);
  }

  async update(
    id: number,
    updateData: ExerciseAssignmentUpdateDtoType
  ): Promise<ExerciseAssignment | null> {
    const assignment = await this.assignmentRepo.findOne({
      where: { id },
      relations: ['child', 'exercise']
    });

    if (!assignment) return null;

    if (typeof updateData.is_completed === 'boolean') {
      assignment.is_completed = updateData.is_completed;
    }

    if (typeof updateData.attempts === 'number') {
      assignment.attempts = updateData.attempts;
    }

    if (typeof updateData.score === 'number') {
      assignment.score = updateData.score;
    }

    if (updateData.completed_at) {
      assignment.completed_at = new Date(updateData.completed_at);
    }

    return await this.assignmentRepo.save(assignment);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.assignmentRepo.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }

  async save(assignment: ExerciseAssignment): Promise<ExerciseAssignment> {
    return await this.assignmentRepo.save(assignment);
  }

}
