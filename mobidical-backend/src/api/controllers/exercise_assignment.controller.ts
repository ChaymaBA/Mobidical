// src/controllers/exercise-assignment.controller.ts

import { Request, Response } from 'express';
import { ExerciseAssignmentService } from '@/services/exercise_assignment.service';
import { handleError } from '@/core/errors/errorHandler';
import {
  transformSingleExerciseAssignmentToResponse,
  transformExerciseAssignmentsToResponse
} from '@/dtos/exercise_assignment.dto';
import { UserRole } from '@/types/enum.type';

export class ExerciseAssignmentController {
  constructor(private assignmentService: ExerciseAssignmentService) {}

  async createAssignment(req: Request, res: Response): Promise<void> {
    try {
      const assignmentData = req.body;
      const userId = req.user?.id as number;

      const assignment = await this.assignmentService.createAssignment(assignmentData, userId);
      const responseData = transformSingleExerciseAssignmentToResponse(assignment, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Exercise assignment created successfully',
        assignment: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllAssignments(req: Request, res: Response): Promise<void> {
    try {
      const assignments = await this.assignmentService.getAllAssignments();
      const responseData = transformExerciseAssignmentsToResponse(assignments, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAssignmentById(req: Request, res: Response): Promise<void> {
    try {
      const assignmentId = parseInt(req.params.id);
      const assignment = await this.assignmentService.getAssignmentById(assignmentId);

      if (!assignment) {
        res.status(404).json({ message: 'Exercise assignment not found' });
        return;
      }

      const responseData = transformSingleExerciseAssignmentToResponse(assignment, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAssignmentsByChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = req.user?.child_id as number;

      if (!childId) {
        res.status(400).json({ message: 'Child ID is required' });
        return;
      }

      const assignments = await this.assignmentService.getAssignmentsByChild(childId);
      const responseData = transformExerciseAssignmentsToResponse(assignments, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateAssignment(req: Request, res: Response): Promise<void> {
    try {
      const assignmentId = parseInt(req.params.id);
      const updateData = req.body;
      const updatedAssignment = await this.assignmentService.updateAssignment(assignmentId, updateData);

      if (!updatedAssignment) {
        res.status(404).json({ message: 'Exercise assignment not found' });
        return;
      }

      const responseData = transformSingleExerciseAssignmentToResponse(updatedAssignment, req.user?.role as UserRole);

      res.json({
        message: 'Exercise assignment updated successfully',
        assignment: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteAssignment(req: Request, res: Response): Promise<void> {
    try {
      const assignmentId = parseInt(req.params.id);
      const userId = req.user?.id as number;
      const userRole = req.user?.role; 
  
      if (userRole !== UserRole.ADMIN) {
        const isOwner = await this.assignmentService.isAssignmentOwnedByUser(assignmentId, userId);
        if (!isOwner) {
          res.status(403).json({ message: 'Unauthorized: You do not own this assignment' });
          return;
        }
      }
  
      const deleted = await this.assignmentService.deleteAssignment(assignmentId);
      if (!deleted) {
        res.status(404).json({ message: 'Exercise assignment not found or already deleted' });
        return;
      }
  
      res.json({ message: 'Exercise assignment deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async completeAssignment(req: Request, res: Response): Promise<void> {
    try {
      const assignmentId = parseInt(req.params.id);
      const earnedPoints = req.body.earnedPoints ?? 10;

      const updatedAssignment = await this.assignmentService.completeAssignmentAndAddPoints(
        assignmentId,
        earnedPoints
      );

      const responseData = transformSingleExerciseAssignmentToResponse(updatedAssignment, req.user?.role as UserRole);

      res.json({
        message: 'Exercise assignment marked as completed and points added',
        assignment: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}
