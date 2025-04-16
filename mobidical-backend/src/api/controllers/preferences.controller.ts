import { Request, Response } from 'express';
import { PreferenceService } from '@/services/preferences.service';
import { handleError } from '@/core/errors/errorHandler';
import { 
  PreferenceCreateDto, 
  PreferenceUpdateDto, 
  transformPreferenceToResponse, 
  transformPreferencesToResponse 
} from '@/dtos/preferences.dto';
import { UserRole } from '@/types/enum.type';

export class PreferenceController {
  constructor(private preferenceService: PreferenceService) {}

  async createPreference(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Utilisateur non authentifié' });
        return;
      }

      // Récupération de l'enfant associé à cet utilisateur
      const child = await this.preferenceService.getChildByUserId(userId);
      if (!child) {
        res.status(404).json({ message: 'Aucun enfant trouvé pour cet utilisateur' });
        return;
      }

      // Validation des données du corps sans child_id
      const validationResult = PreferenceCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Échec de la validation',
          errors: validationResult.error.errors,
        });
        return;
      }

      // Combinaison des données validées avec l'ID de l'enfant
      const preferenceData = {
        ...validationResult.data,
        child_id: child.id,
      };

      const preference = await this.preferenceService.createPreference(preferenceData);
      const responseData = transformPreferenceToResponse(preference, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Préférence créée avec succès',
        preference: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllPreferences(req: Request, res: Response): Promise<void> {
    try {
      const preferences = await this.preferenceService.getAllPreferences();
      const responseData = transformPreferencesToResponse(preferences, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPreferencesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const userPreferences = await this.preferenceService.getPreferencesByUserId(userId);
      const responseData = transformPreferencesToResponse(userPreferences, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPreferenceById(req: Request, res: Response): Promise<void> {
    try {
      const preferenceId = parseInt(req.params.id);
      const preference = await this.preferenceService.getPreferenceById(preferenceId);

      if (!preference) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }

      const responseData = transformPreferenceToResponse(preference, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPreferencesByChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.childId);
      const preferences = await this.preferenceService.getPreferencesByChild(childId);
      
      const responseData = transformPreferencesToResponse(
        preferences, 
        req.user?.role as UserRole
      );
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updatePreference(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = PreferenceUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Échec de la validation',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const preferenceId = parseInt(req.params.id);
      
      const existingPreference = await this.preferenceService.getPreferenceById(preferenceId);
      if (!existingPreference) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      
      const updatedPreference = await this.preferenceService.updatePreference(preferenceId, updateData);
      
      if (!updatedPreference) {
        res.status(500).json({ message: 'Échec de la mise à jour de la préférence' });
        return;
      }

      const responseData = transformPreferenceToResponse(
        updatedPreference, 
        req.user?.role as UserRole
      );

      res.json({
        message: 'Préférence mise à jour avec succès',
        preference: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deletePreference(req: Request, res: Response): Promise<void> {
    try {
      const preferenceId = parseInt(req.params.id);
      
      const existingPreference = await this.preferenceService.getPreferenceById(preferenceId);
      if (!existingPreference) {
        res.status(404).json({ message: 'Préférence non trouvée' });
        return;
      }
      
      await this.preferenceService.deletePreference(preferenceId);

      res.json({ message: 'Préférence supprimée avec succès' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
