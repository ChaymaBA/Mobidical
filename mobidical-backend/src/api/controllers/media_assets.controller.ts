import { Request, Response } from 'express';
import { MediaAssetService } from '@/services/media_assets.service';
import { handleError } from '@/core/errors/errorHandler';
import {
  transformSingleMediaAssetToResponse,
  transformMediaAssetsToResponse
} from '@/dtos/media_assets.dto';
import { UserRole } from '@/types/enum.type';
import { MediaType, AllowedMimeTypes } from '@/types/media.type';

export class MediaAssetController {
  constructor(private mediaAssetService: MediaAssetService) {}

  async createMediaAsset(req: Request, res: Response): Promise<void> {
    try {
      const mediaAssetData = req.body;
      const userId = req.user?.id as number; // Get user ID from the token
      const child_id = req.user?.child_id as number; // Get child ID from the token
      
      if (!child_id) {
        res.status(400).json({ message: 'Child ID is required' });
        return;
      }
      
      const mediaAsset = await this.mediaAssetService.createMediaAsset(mediaAssetData, userId, child_id);
      const responseData = transformSingleMediaAssetToResponse(mediaAsset, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Media asset created successfully',
        mediaAsset: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllMediaAssets(req: Request, res: Response): Promise<void> {
    try {
      const mediaAssets = await this.mediaAssetService.getAllMediaAssets();
      const responseData = transformMediaAssetsToResponse(mediaAssets, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMediaAssetById(req: Request, res: Response): Promise<void> {
    try {
      const mediaAssetId = parseInt(req.params.id);
      const mediaAsset = await this.mediaAssetService.getMediaAssetById(mediaAssetId);
      
      if (!mediaAsset) {
        res.status(404).json({ message: 'Media asset not found' });
        return;
      }
      
      const responseData = transformSingleMediaAssetToResponse(mediaAsset, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMediaAssetsByUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as number; // Get user ID from the token
      const mediaAssets = await this.mediaAssetService.getMediaAssetsByUserId(userId);
      const responseData = transformMediaAssetsToResponse(mediaAssets, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getMediaAssetsByChild(req: Request, res: Response): Promise<void> {
    try {
      const child_id = req.user?.child_id as number; // Get child ID from the token
      
      if (!child_id) {
        res.status(400).json({ message: 'Child ID is required' });
        return;
      }
      
      const mediaAssets = await this.mediaAssetService.getMediaAssetsByChild(child_id);
      const responseData = transformMediaAssetsToResponse(mediaAssets, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateMediaAsset(req: Request, res: Response): Promise<void> {
    try {
      const mediaAssetId = parseInt(req.params.id);
      const updateData = req.body;
      const child_id = req.user?.child_id as number; // Get child ID from the token
      
      if (!child_id) {
        res.status(400).json({ message: 'Child ID is required' });
        return;
      }

      const updatedMediaAsset = await this.mediaAssetService.updateMediaAsset(mediaAssetId, updateData, child_id);
      
      if (!updatedMediaAsset) {
        res.status(404).json({ message: 'Media asset not found' });
        return;
      }
      
      const responseData = transformSingleMediaAssetToResponse(updatedMediaAsset, req.user?.role as UserRole);
      
      res.json({
        message: 'Media asset updated successfully',
        mediaAsset: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteMediaAsset(req: Request, res: Response): Promise<void> {
    try {
      const mediaAssetId = parseInt(req.params.id);
      const userId = req.user?.id as number;

      // Vérifier que le média appartient bien à cet utilisateur
      const isOwner = await this.mediaAssetService.isMediaAssetOwnedByUser(mediaAssetId, userId);
      if (!isOwner) {
        res.status(403).json({ message: 'Unauthorized: You do not own this media asset' });
        return;
      }

      const deleted = await this.mediaAssetService.deleteMediaAsset(mediaAssetId);
      if (!deleted) {
        res.status(404).json({ message: 'Media asset not found or already deleted' });
        return;
      }

      res.json({ message: 'Media asset deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
  
  async getMediaTypeOptions(req: Request, res: Response): Promise<void> {
    try {
      // Return all available media types and their allowed MIME types
      res.json({
        mediaTypes: Object.values(MediaType),
        allowedMimeTypes: AllowedMimeTypes
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}