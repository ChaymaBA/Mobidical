// src/dtos/media-asset.dto.ts
import { z } from 'zod';
import { MediaAsset } from '@/entities/Media_assets';
import { UserRole } from '@/types/enum.type';
import { MediaType } from '@/types/media.type';

// Zod schemas
export const MediaAssetCreateDto = z.object({
  type: z.nativeEnum(MediaType),
  url: z.string().url()
  // Pas de child_id car il sera récupéré du token
});

export const MediaAssetUpdateDto = z.object({
  type: z.nativeEnum(MediaType).optional(),
  url: z.string().url().optional()
  // Pas de child_id car il sera récupéré du token
});

// Type inferences
export type MediaAssetCreateDtoType = z.infer<typeof MediaAssetCreateDto>;
export type MediaAssetUpdateDtoType = z.infer<typeof MediaAssetUpdateDto>;

// Response interfaces
export interface MediaAssetResponse {
  id: number;
  type: MediaType;
  url: string;
  child_id?: number;
  userId?: number;
  created_at: Date;
}

/**
 * Transform a single media asset to response format based on user role
 */
export function transformSingleMediaAssetToResponse(
  mediaAsset: MediaAsset,
  role: UserRole
): MediaAssetResponse {
  const response: MediaAssetResponse = {
    id: mediaAsset.id,
    type: mediaAsset.type as MediaType,
    url: mediaAsset.url,
    created_at: mediaAsset.created_at
  };
  
  // Add child_id if child exists
  if (mediaAsset.child) {
    response.child_id = mediaAsset.child.id;
  }
  
  // Add userId for admin roles
  if (role === UserRole.ADMIN ) {
    if (mediaAsset.user) {
      response.userId = mediaAsset.user.id;
    }
  }
  
  return response;
}

/**
 * Transform multiple media assets to response format
 */
export function transformMediaAssetsToResponse(
  mediaAssets: MediaAsset[],
  role: UserRole
): MediaAssetResponse[] {
  return mediaAssets.map(asset => transformSingleMediaAssetToResponse(asset, role));
}