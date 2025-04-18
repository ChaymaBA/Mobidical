// src/services/media-asset.service.ts

import { MediaAssetRepository } from '@/repositories/media_assets.repository';
import { ChildrenRepository } from '@/repositories/children.repository';
import { UserRepository } from '@/repositories/user.repository';
import { MediaAsset } from '@/entities/Media_assets';
import { 
  MediaAssetCreateDtoType, 
  MediaAssetUpdateDtoType 
} from '@/dtos/media_assets.dto';
import { AllowedMimeTypes, MediaType, AllAllowedMimeTypes } from '@/types/media.type';

export class MediaAssetService {
  constructor(
    private mediaAssetRepository: MediaAssetRepository,
    private childrenRepository: ChildrenRepository,
    private userRepository: UserRepository
  ) {}

  async createMediaAsset(data: MediaAssetCreateDtoType, userId: number, child_id: number): Promise<MediaAsset> {
    return await this.mediaAssetRepository.create(data, userId, child_id);
  }

  async getAllMediaAssets(): Promise<MediaAsset[]> {
    return await this.mediaAssetRepository.findAll();
  }

  async getMediaAssetById(id: number): Promise<MediaAsset | null> {
    return await this.mediaAssetRepository.findById(id);
  }

  async getMediaAssetsByChild(child_id: number): Promise<MediaAsset[]> {
    return await this.mediaAssetRepository.findByChild(child_id);
  }

  async getMediaAssetsByUserId(userId: number): Promise<MediaAsset[]> {
    const userChildren = await this.childrenRepository.findByUserId(userId);
    if (!userChildren.length) {
      return [];
    }

    const child_ids = userChildren.map(child => child.id);
    const mediaAssets = await Promise.all(
      child_ids.map(id => this.mediaAssetRepository.findByChild(id))
    );
    return mediaAssets.flat();
  }

  async updateMediaAsset(id: number, data: MediaAssetUpdateDtoType, child_id: number): Promise<MediaAsset | null> {
    return await this.mediaAssetRepository.update(id, data, child_id);
  }

  async deleteMediaAsset(id: number): Promise<boolean> {
    return await this.mediaAssetRepository.delete(id);
  }

  async checkUserAccessToChild(userId: number | undefined, child_id: number): Promise<boolean> {
    if (!userId) return false;

    const child = await this.childrenRepository.findById(child_id);
    if (!child) {
      return false;
    }

    return child.user_id === userId;
  }

  async getChildByUserId(userId: number): Promise<{ id: number } | null> {
    const children = await this.childrenRepository.findByUserId(userId);
    return children.length ? children[0] : null;
  }

  validateMimeType(mediaType: MediaType, mimeType: string): boolean {
    return AllowedMimeTypes[mediaType]?.includes(mimeType) ?? false;
  }

  isAllowedMimeType(mimeType: string): boolean {
    return AllAllowedMimeTypes.includes(mimeType);
  }

  async isMediaAssetOwnedByUser(mediaAssetId: number, userId: number): Promise<boolean> {
    // Implement the logic to check if the media asset belongs to the user
    const mediaAsset = await this.getMediaAssetById(mediaAssetId);
    return mediaAsset?.user?.id === userId;
  }
}
