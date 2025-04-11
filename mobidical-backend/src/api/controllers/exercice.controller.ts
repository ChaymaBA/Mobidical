import { Request, Response } from 'express';
import { ExerciceService } from '@/services/exercice.service';
import { handleError } from '@/core/errors/errorHandler';
import { ExerciceCreateDto, ExerciceUpdateDto } from '@/dtos/exercice.dto'; // Importation des DTOs

export class ExerciceController {
  constructor(private exerciceService: ExerciceService) {}

  // Créer un nouvel exercice
  async createExercice(req: Request, res: Response): Promise<void> {
    try {
     
      const validationResult = ExerciceCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const exerciceData = validationResult.data;
      const exercice = await this.exerciceService.createExercice(exerciceData);

      res.status(201).json({
        message: 'Exercice created successfully',
        exercice,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Récupérer tous les exercices
  async getAllExercices(req: Request, res: Response): Promise<void> {
    try {
      const exercices = await this.exerciceService.getAllExercices();
      res.json(exercices);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Récupérer les exercices d'un utilisateur spécifique
  async getExercicesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const exercices = await this.exerciceService.getExercicesByUser(userId);

      res.json(exercices);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Mettre à jour un exercice
  async updateExercice(req: Request, res: Response): Promise<void> {
    try {
    
      const validationResult = ExerciceUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const exerciceId = parseInt(req.params.id);
      const updatedExercice = await this.exerciceService.updateExercice(exerciceId, updateData);

      if (!updatedExercice) {
        res.status(404).json({ message: 'Exercice not found' });
        return;
      }

      res.json({
        message: 'Exercice updated successfully',
        exercice: updatedExercice,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Supprimer un exercice
  async deleteExercice(req: Request, res: Response): Promise<void> {
    try {

      const exerciceId = parseInt(req.params.id);
      const isDeleted = await this.exerciceService.deleteExercice(exerciceId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Exercice not found' });
        return;
      }

      res.json({ message: 'Exercice deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

}
