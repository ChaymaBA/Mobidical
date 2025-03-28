import { Request, Response } from 'express';
import { GameService } from '@/services/game.service';
import { handleError } from '@/core/errors/errorHandler';
import { GameCreateDto, GameUpdateDto } from '@/dtos/game.dto'; // Importation des DTOs

export class GameController {
  constructor(private gameService: GameService) {}

  // Créer un nouveau jeu
  async createGame(req: Request, res: Response): Promise<void> {
    try {
      // Validation des données de la requête avec le DTO
      const validationResult = GameCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const gameData = validationResult.data;
      const game = await this.gameService.createGame(gameData);

      res.status(201).json({
        message: 'Game created successfully',
        game,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Récupérer tous les jeux
  async getAllGames(req: Request, res: Response): Promise<void> {
    try {
      const games = await this.gameService.getAllGames();
      res.json(games);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Récupérer les jeux d'un utilisateur spécifique
  async getGamesByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const games = await this.gameService.getGamesByUser(userId);

      res.json(games);
    } catch (error) {
      handleError(res, error);
    }
  }

  // Mettre à jour un jeu
  async updateGame(req: Request, res: Response): Promise<void> {
    try {
      // Validation des données de la requête avec le DTO
      const validationResult = GameUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const gameId = parseInt(req.params.id);
      const updatedGame = await this.gameService.updateGame(gameId, updateData);

      if (!updatedGame) {
        res.status(404).json({ message: 'Game not found' });
        return;
      }

      res.json({
        message: 'Game updated successfully',
        game: updatedGame,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Supprimer un jeu
  async deleteGame(req: Request, res: Response): Promise<void> {
    try {
      const gameId = parseInt(req.params.id);
      const isDeleted = await this.gameService.deleteGame(gameId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Game not found' });
        return;
      }

      res.json({ message: 'Game deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
