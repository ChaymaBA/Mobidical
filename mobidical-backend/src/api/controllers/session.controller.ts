import { Request, Response } from 'express';
import { SessionService } from '@/services/session.service';
import { handleError } from '@/core/errors/errorHandler';

export class SessionController {
  constructor(private sessionService: SessionService) {}

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const childId = req.user?.child_id; // récupéré depuis le token via middleware

      if (!childId) {
        res.status(400).json({ message: 'Child ID is missing or invalid' });
        return;
      }

      const session = await this.sessionService.createSession(req.body, childId);
      res.status(201).json({ message: 'Session created successfully', session });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllSessions(req: Request, res: Response): Promise<void> {
    try {
      const sessions = await this.sessionService.getAllSessions();
      res.json(sessions);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getSessionById(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.sessionService.getSessionById(parseInt(req.params.id));
      if (!session) {
        res.status(404).json({ message: 'Session not found' });
        return;
      }

      res.json(session);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateSession(req: Request, res: Response): Promise<void> {
    try {
      const session = await this.sessionService.updateSession(parseInt(req.params.id), req.body);
      if (!session) {
        res.status(404).json({ message: 'Session not found' });
        return;
      }

      res.json({ message: 'Session updated successfully', session });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteSession(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.sessionService.deleteSession(parseInt(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: 'Session not found' });
        return;
      }

      res.json({ message: 'Session deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
