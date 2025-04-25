// src/services/exercise-assignment.service.ts

import { ExerciseAssignmentRepository } from '@/repositories/exercise_assignment.repository';
import { ChildrenRepository } from '@/repositories/children.repository';
import { ExerciseAssignment } from '@/entities/Exercise_assignment';
import {
  ExerciseAssignmentCreateDtoType,
  ExerciseAssignmentUpdateDtoType
} from '@/dtos/exercise_assignment.dto';

export class ExerciseAssignmentService {
  constructor(
    private assignmentRepository: ExerciseAssignmentRepository,
    private childrenRepository: ChildrenRepository
  ) {}

  async createAssignment(
    data: ExerciseAssignmentCreateDtoType,
    userId: number
  ): Promise<ExerciseAssignment> {
    const child = await this.getChildByUserId(userId);
    if (!child) {
      throw new Error('Child not found for the user');
    }
    return await this.assignmentRepository.create(data, child.id);
  }

  async getAllAssignments(): Promise<ExerciseAssignment[]> {
    return await this.assignmentRepository.findAll();
  }

  async getAssignmentById(id: number): Promise<ExerciseAssignment | null> {
    return await this.assignmentRepository.findById(id);
  }

  async getAssignmentsByChild(childId: number): Promise<ExerciseAssignment[]> {
    return await this.assignmentRepository.findByChild(childId);
  }

  async updateAssignment(
    id: number,
    data: ExerciseAssignmentUpdateDtoType
  ): Promise<ExerciseAssignment | null> {
    return await this.assignmentRepository.update(id, data);
  }

  async deleteAssignment(id: number): Promise<boolean> {
    return await this.assignmentRepository.delete(id);
  }

  async checkUserAccessToChild(userId: number | undefined, childId: number): Promise<boolean> {
    if (!userId) return false;
    const child = await this.childrenRepository.findById(childId);
    return !!child && child.user_id === userId;
  }

  async getChildByUserId(userId: number): Promise<{ id: number } | null> {
    const children = await this.childrenRepository.findByUserId(userId);
    return children.length ? children[0] : null;
  }

  async isAssignmentOwnedByUser(assignmentId: number, userId: number): Promise<boolean> {
    const assignment = await this.getAssignmentById(assignmentId);
    return assignment?.child?.user_id === userId;
  }

  /**
   * Marque un exercice comme complété et ajoute des points.
   * @param assignmentId ID de l'assignement
   * @param earnedPoints Nombre de points à ajouter (par défaut : 10)
   */
  async completeAssignmentAndAddPoints(
    assignmentId: number,
    earnedPoints: number = 10
  ): Promise<ExerciseAssignment> {
    const assignment = await this.assignmentRepository.findById(assignmentId);

    if (!assignment) {
      throw new Error('Exercise assignment not found');
    }

    if (assignment.is_completed) {
      throw new Error('Exercise is already completed');
    }

    assignment.is_completed = true;
    assignment.completed_at = new Date();
    assignment.attempts += 1;
    assignment.checkPoint = (assignment.checkPoint || 0) + earnedPoints;

    return await this.assignmentRepository.save(assignment);
  }
}
