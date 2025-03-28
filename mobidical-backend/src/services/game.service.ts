import { Game } from '@/entities/Game';
import { GameRepository } from '../repositories/game.repository';

export class GameService {
  constructor(private gameRepository: GameRepository) {}

  // Créer un nouveau jeu
  async createGame(gameData: Partial<Game>): Promise<Game> {
    return this.gameRepository.create(gameData);
  }

  // Récupérer tous les jeux
  async getAllGames(): Promise<Game[]> {
    return this.gameRepository.findAll();
  }

  // Récupérer les jeux d'un utilisateur spécifique
  async getGamesByUser(userId: number): Promise<Game[]> {
    return this.gameRepository.findByUser(userId);
  }

  // Mettre à jour un jeu
  async updateGame(id: number, updateData: Partial<Game>): Promise<Game | null> {
    return this.gameRepository.update(id, updateData);
  }

  // Supprimer un jeu
  async deleteGame(id: number): Promise<boolean> {
    return this.gameRepository.delete(id);
  }
}
