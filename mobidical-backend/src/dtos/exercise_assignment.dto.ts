// src/dtos/exercise-assignment.dto.ts
import { z } from 'zod';
import { ExerciseAssignment } from '@/entities/Exercise_assignment';
import { UserRole } from '@/types/enum.type';

// Zod schemas
export const ExerciseAssignmentCreateDto = z.object({
  exerciseId: z.number().int(), // Exercise ID to assign
});

export const ExerciseAssignmentUpdateDto = z.object({
  is_completed: z.boolean().optional(),
  attempts: z.number().int().min(0).optional(),
  score: z.number().min(0).max(100).optional(), // Assuming score is a percentage
  completed_at: z.string().datetime().optional(), // ISO format string if provided
});

// Type inferences
export type ExerciseAssignmentCreateDtoType = z.infer<typeof ExerciseAssignmentCreateDto>;
export type ExerciseAssignmentUpdateDtoType = z.infer<typeof ExerciseAssignmentUpdateDto>;

// Response interface
export interface ExerciseAssignmentResponse {
  id: number;
  child_id?: number;
  exercise_id?: number;
  is_completed: boolean;
  attempts: number;
  score: number;
  assigned_at: Date;
  completed_at?: Date;
  checkPoint?: number; // Optional field for user role

}

/**
 * Transform a single exercise assignment to response format based on user role
 */
export function transformSingleExerciseAssignmentToResponse(
  assignment: ExerciseAssignment,
  role: UserRole
): ExerciseAssignmentResponse {
  const response: ExerciseAssignmentResponse = {
    id: assignment.id,
    is_completed: assignment.is_completed,
    attempts: assignment.attempts,
    score: assignment.score,
    assigned_at: assignment.assigned_at,
    completed_at: assignment.completed_at || undefined,
    checkPoint: assignment.checkPoint || undefined, // Optional field for user role
  };

  if (assignment.child) {
    response.child_id = assignment.child.id;
  }

  if (assignment.exercise) {
    response.exercise_id = assignment.exercise.id;
  }

  return response;
}

/**
 * Transform multiple exercise assignments to response format
 */
export function transformExerciseAssignmentsToResponse(
  assignments: ExerciseAssignment[],
  role: UserRole
): ExerciseAssignmentResponse[] {
  return assignments.map((assignment) =>
    transformSingleExerciseAssignmentToResponse(assignment, role)
  );
}
