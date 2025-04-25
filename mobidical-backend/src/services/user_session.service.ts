import { UserSessionRepository } from '@/repositories/user_session.repository';
import { z } from 'zod';
import { UserSessionCreateDto, UserSessionUpdateDto } from '@/dtos/user_session.dto';

export class UserSessionService {
  constructor(private userSessionRepository: UserSessionRepository) {}

  // Créer une session utilisateur et enregistrer le token
  async createSession(data: z.infer<typeof UserSessionCreateDto>, userId: number) {
    // Vérification du token et autres données (par exemple, appareil)
    if (!data.token) {
      throw new Error('Token is required');
    }

    // Création de la session dans la base de données via le repository
    return await this.userSessionRepository.create(data, userId);
  }

  // Récupérer toutes les sessions utilisateur
  async getAllSessions() {
    return await this.userSessionRepository.findAll();
  }

  // Récupérer une session par son ID
  async getSessionById(id: number) {
    return await this.userSessionRepository.findById(id);
  }

  // Mettre à jour une session existante
  async updateSession(id: number, data: z.infer<typeof UserSessionUpdateDto>) {
    // Assurez-vous que la session existe avant de la mettre à jour
    const session = await this.userSessionRepository.findById(id);
    if (!session) {
      throw new Error('Session not found');
    }
    
    return await this.userSessionRepository.update(id, data);
  }

  // Supprimer une session utilisateur
  async deleteSession(id: number) {
    // Vérification si la session existe avant la suppression
    const session = await this.userSessionRepository.findById(id);
    if (!session) {
      throw new Error('Session not found');
    }
    
    return await this.userSessionRepository.delete(id);
  }
}
