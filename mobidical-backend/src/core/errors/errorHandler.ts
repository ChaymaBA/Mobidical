import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { QueryFailedError } from "typeorm";
import { HTTP_STATUS } from "@/constants/http_status.constants";


/**
 * Classe de base pour les erreurs personnalisées
 */
class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Middleware pour gérer les erreurs
 */
export const handleError = (res: Response, error: any) => {
  console.error("Error:", error); // Log pour le debug

  let statusCode = HTTP_STATUS.INTERNAL_SERVER;
  let message = "Internal Server Error";

  // Gestion des erreurs spécifiques

  // Erreur de validation (Zod)
  if (error instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Validation error";
    return res.status(statusCode).json({
      success: false,
      message,
      errors: error.errors.map((err) => err.message), // Retourne les erreurs précises
    });
  }

  // Erreur PostgreSQL (QueryFailedError)
  if (error instanceof QueryFailedError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = "Database query failed";
  }

  // Erreur JWT (Token invalide ou expiré)
  if (error.name === "JsonWebTokenError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Invalid or expired token ";
  } 

  // Erreur d'authentification ou d'autorisation
  if (error.name === "UnauthorizedError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = "Unauthorized";
  }

  // Gestion des erreurs personnalisées
  if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Middleware global pour attraper toutes les erreurs non gérées
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(res, err);
};
