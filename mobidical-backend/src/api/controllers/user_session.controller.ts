import { Request, Response } from 'express';
import { UserSessionService } from '@/services/user_session.service';
import { handleError } from '@/core/errors/errorHandler';

export class UserSessionController {
  constructor(private userSessionService: UserSessionService) {}

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id; // Récupéré depuis le token via middleware

      if (!userId) {
        res.status(400).json({ message: 'User ID is missing or invalid' });
        return;
      }

      const sessionData = {
        token: req.body.token, // Assurez-vous que le token est envoyé dans le corps de la requête
        deviceType: req.body.deviceType, // Exemple de données supplémentaires (facultatif)
        deviceInfo: req.body.deviceInfo, // Exemple de données supplémentaires (facultatif)
        ipAddress: req.body.ipAddress, // Exemple de données supplémentaires (facultatif)
        location: req.body.location, // Exemple de données supplémentaires (facultatif)
      };

      const session = await this.userSessionService.createSession(sessionData, userId);
      res.status(201).json({ message: 'User session created successfully', session });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllSessions(req: Request, res: Response): Promise<void> {
    try {
      const sessions = await this.userSessionService.getAllSessions();
      res.json(sessions);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getSessionById(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.userSessionService.getSessionById(parseInt(req.params.id));
      if (!session) {
        res.status(404).json({ message: 'User session not found' });
        return;
      }

      res.json(session);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateSession(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.userSessionService.updateSession(parseInt(req.params.id), req.body);
      if (!session) {
        res.status(404).json({ message: 'User session not found' });
        return;
      }

      res.json({ message: 'User session updated successfully', session });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteSession(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.userSessionService.deleteSession(parseInt(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: 'User session not found' });
        return;
      }

      res.json({ message: 'User session deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
