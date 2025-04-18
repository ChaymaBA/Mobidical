// src/repositories/media-asset.repository.ts
import { Repository, DataSource } from 'typeorm';
import { MediaAsset } from '@/entities/Media_assets';
import { User } from '@/entities/User';
import { Children } from '@/entities/Children';
import { MediaAssetCreateDtoType, MediaAssetUpdateDtoType } from '@/dtos/media_assets.dto';

export class MediaAssetRepository {
  private mediaAssetRepository: Repository<MediaAsset>;
  private userRepository: Repository<User>;
  private childrenRepository: Repository<Children>;

  constructor(private dataSource: DataSource) {
    this.mediaAssetRepository = this.dataSource.getRepository(MediaAsset);
    this.userRepository = this.dataSource.getRepository(User);
    this.childrenRepository = this.dataSource.getRepository(Children);
  }

  async findAll(): Promise<MediaAsset[]> {
    return await this.mediaAssetRepository.find({
      relations: ['user', 'child']
    });
  }

  async findById(id: number): Promise<MediaAsset | null> {
    return await this.mediaAssetRepository.findOne({
      where: { id },
      relations: ['user', 'child']
    });
  }

  async findByUser(userId: number): Promise<MediaAsset[]> {
    return await this.mediaAssetRepository.find({
      where: { user: { id: userId } },
      relations: ['child']
    });
  }

  async findByChild(child_id: number): Promise<MediaAsset[]> {
    return await this.mediaAssetRepository.find({
      where: { child: { id: child_id } },
      relations: ['user']
    });
  }

  async create(mediaAssetData: MediaAssetCreateDtoType, userId: number, child_id: number): Promise<MediaAsset> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const child = await this.childrenRepository.findOneBy({ id: child_id });
    if (!child) {
      throw new Error('Child not found');
    }

    const mediaAsset = this.mediaAssetRepository.create({
      type: mediaAssetData.type,
      url: mediaAssetData.url,
      user: user,
      child: child
    });

    return await this.mediaAssetRepository.save(mediaAsset);
  }

  async update(id: number, updateData: MediaAssetUpdateDtoType, child_id?: number): Promise<MediaAsset | null> {
    const mediaAsset = await this.mediaAssetRepository.findOne({
      where: { id },
      relations: ['user', 'child']
    });
    
    if (!mediaAsset) {
      return null;
    }

    // Update basic fields if provided
    if (updateData.type) mediaAsset.type = updateData.type;
    if (updateData.url) mediaAsset.url = updateData.url;
    
    // Update child relation if child_id is provided
    if (child_id) {
      const child = await this.childrenRepository.findOneBy({ id: child_id });
      if (!child) {
        throw new Error('Child not found');
      }
      mediaAsset.child = child;
    }
    
    return await this.mediaAssetRepository.save(mediaAsset);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.mediaAssetRepository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}