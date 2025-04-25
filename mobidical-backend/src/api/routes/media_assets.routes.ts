// src/api/routes/media-asset.routes.ts
import { Router } from 'express';
import { MediaAssetController } from '@/api/controllers/media_assets.controller';
import { MediaAssetCreateDto, MediaAssetUpdateDto } from '@/dtos/media_assets.dto';
import { ValidationMiddleware } from '@/api/middlewares/validation.middleware';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { MEDIA_ASSET_ROUTES } from '@/constants/routes.constants';
import { UserRole } from '@/types/enum.type';

export default function (controllers: { mediaAssetController: MediaAssetController }): Router {
  const router = Router();
  const { mediaAssetController } = controllers;

  /**
   * 🔹 Obtenir les types de médias disponibles
   */
  router.get(
    MEDIA_ASSET_ROUTES.GET_TYPES,
    mediaAssetController.getMediaTypeOptions.bind(mediaAssetController)
  );

  /**
   * 🔹 Obtenir tous les médias (admin seulement)
   */
  router.get(
    MEDIA_ASSET_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    mediaAssetController.getAllMediaAssets.bind(mediaAssetController)
  );

  /**
   * 🔹 Obtenir un média par ID
   */
  router.get(
    MEDIA_ASSET_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    mediaAssetController.getMediaAssetById.bind(mediaAssetController)
  );

  /**
   * 🔹 Obtenir les médias de l'utilisateur connecté
   */
  router.get(
    MEDIA_ASSET_ROUTES.GET_BY_USER,
    AuthMiddleware.authenticate,
    mediaAssetController.getMediaAssetsByUser.bind(mediaAssetController)
  );

  /**
   * 🔹 Obtenir les médias de l'enfant associé au token
   */
  router.get(
    MEDIA_ASSET_ROUTES.GET_BY_CHILD,
    AuthMiddleware.authenticate,
    mediaAssetController.getMediaAssetsByChild.bind(mediaAssetController)
  );

  /**
   * 🔹 Créer un nouveau média
   */
  router.post(
    MEDIA_ASSET_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(MediaAssetCreateDto),
    mediaAssetController.createMediaAsset.bind(mediaAssetController)
  );

  /**
   * 🔹 Mettre à jour un média
   */
  router.put(
    MEDIA_ASSET_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(MediaAssetUpdateDto),
    mediaAssetController.updateMediaAsset.bind(mediaAssetController)
  );

  /**
   * 🔹 Supprimer un média
   */
  router.delete(
    MEDIA_ASSET_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    mediaAssetController.deleteMediaAsset.bind(mediaAssetController)
  );

  return router;
}