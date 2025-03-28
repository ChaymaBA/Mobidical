import express from "express";
import { GameController } from "../controllers/game.controller";
import { GameCreateDto, GameUpdateDto } from "@/dtos/game.dto"; // Ensure GameDTO is a Zod schema
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { GAME_ROUTES } from "@/constants/routes.constants"; // Crée un fichier constants/routes.constants.ts si tu n'en as pas déjà un

export const gameRoutes = express.Router();

export function initGameRoutes(gameController: GameController) {
  // Get all games route
  gameRoutes.get(
    GAME_ROUTES.GET_ALL,
    gameController.getAllGames.bind(gameController)
  );

  // Get games by userId route
  gameRoutes.get(
    GAME_ROUTES.GET_BY_USER,
    gameController.getGamesByUser.bind(gameController)
  );

  // Create game route
  gameRoutes.post(
    GAME_ROUTES.CREATE,
    ValidationMiddleware.validate(GameCreateDto), // Si tu veux valider le DTO du jeu avant création
    gameController.createGame.bind(gameController)
  );

  // Update game route
  gameRoutes.put(
    GAME_ROUTES.UPDATE,
    ValidationMiddleware.validate(GameUpdateDto), // Facultatif : si tu souhaites valider lors de la mise à jour
    gameController.updateGame.bind(gameController)
  );

  // Delete game route
  gameRoutes.delete(
    GAME_ROUTES.DELETE,
    gameController.deleteGame.bind(gameController)
  );

  return gameRoutes;
}
