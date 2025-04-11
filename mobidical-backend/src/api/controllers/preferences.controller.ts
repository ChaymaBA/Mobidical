// src/api/controllers/preference.controller.ts
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
      const validationResult = PreferenceCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const preferenceData = validationResult.data;
      
      // Vérifier que l'utilisateur a le droit de créer une préférence pour cet enfant
      // Seul le parent de l'enfant ou un admin peut créer des préférences
      if (req.user?.role !== UserRole.ADMIN) {
        const hasAccess = await this.preferenceService.checkUserAccessToChild(req.user?.id, preferenceData.child_id);
        if (!hasAccess) {
          res.status(403).json({
            message: 'You can only create preferences for children you are responsible for'
          });
          return;
        }
      }

      const preference = await this.preferenceService.createPreference(preferenceData);
      
      const responseData = transformPreferenceToResponse(preference, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Preference created successfully',
        preference: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllPreferences(req: Request, res: Response): Promise<void> {
    try {
      // Si c'est un admin, renvoyer toutes les préférences
      // Si c'est un utilisateur normal, filtrer pour ne montrer que les préférences des enfants dont il est responsable
      if (req.user?.role === UserRole.ADMIN) {
        const preferences = await this.preferenceService.getAllPreferences();
        const responseData = transformPreferencesToResponse(preferences, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        const userPreferences = await this.preferenceService.getPreferencesByUserId(req.user.id);
        const responseData = transformPreferencesToResponse(userPreferences, UserRole.USER);
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPreferenceById(req: Request, res: Response): Promise<void> {
    try {
      const preferenceId = parseInt(req.params.id);
      const preference = await this.preferenceService.getPreferenceById(preferenceId);

      if (!preference) {
        res.status(404).json({ message: 'Preference not found' });
        return;
      }

      // Vérifier que l'utilisateur est autorisé à voir cette préférence
      if (req.user?.role === UserRole.ADMIN) {
        const responseData = transformPreferenceToResponse(preference, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        const hasAccess = await this.preferenceService.checkUserAccessToChild(req.user.id, preference.child_id);
        if (hasAccess) {
          const responseData = transformPreferenceToResponse(preference, UserRole.USER);
          res.json(responseData);
        } else {
          res.status(403).json({ message: 'You are not authorized to view this preference' });
        }
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getPreferencesByChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.childId);
      
      // Vérifier que l'utilisateur a le droit de voir les préférences de cet enfant
      if (req.user?.role !== UserRole.ADMIN) {
        const hasAccess = await this.preferenceService.checkUserAccessToChild(req.user?.id, childId);
        if (!hasAccess) {
          res.status(403).json({ message: 'You can only view preferences for children you are responsible for' });
          return;
        }
      }
      
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
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const preferenceId = parseInt(req.params.id);
      
      // Vérifier d'abord si la préférence existe
      const existingPreference = await this.preferenceService.getPreferenceById(preferenceId);
      if (!existingPreference) {
        res.status(404).json({ message: 'Preference not found' });
        return;
      }
      
      // Vérifier les autorisations
      if (req.user?.role !== UserRole.ADMIN) {
        const hasAccess = await this.preferenceService.checkUserAccessToChild(req.user?.id, existingPreference.child_id);
        if (!hasAccess) {
          res.status(403).json({ message: 'You can only update preferences for children you are responsible for' });
          return;
        }
      }
      
      const updatedPreference = await this.preferenceService.updatePreference(preferenceId, updateData);
      
      if (!updatedPreference) {
        res.status(500).json({ message: 'Failed to update preference' });
        return;
      }

      const responseData = transformPreferenceToResponse(
        updatedPreference, 
        req.user?.role as UserRole
      );

      res.json({
        message: 'Preference updated successfully',
        preference: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deletePreference(req: Request, res: Response): Promise<void> {
    try {
      const preferenceId = parseInt(req.params.id);
      
      // Vérifier d'abord si la préférence existe
      const existingPreference = await this.preferenceService.getPreferenceById(preferenceId);
      if (!existingPreference) {
        res.status(404).json({ message: 'Preference not found' });
        return;
      }
      
      // Vérifier les autorisations
      if (req.user?.role !== UserRole.ADMIN) {
        const hasAccess = await this.preferenceService.checkUserAccessToChild(req.user?.id, existingPreference.child_id);
        if (!hasAccess) {
          res.status(403).json({ message: 'You can only delete preferences for children you are responsible for' });
          return;
        }
      }
      
      await this.preferenceService.deletePreference(preferenceId);

      res.json({ message: 'Preference deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}