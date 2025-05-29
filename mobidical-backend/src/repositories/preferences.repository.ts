// src/repositories/preference.repository.ts
import { In } from 'typeorm';
import { Preference } from '@/entities/Preferences';
import { PreferenceCreateDtoType, PreferenceUpdateDtoType } from '@/dtos/preferences.dto';
import { AppDataSource} from '@/core/configuration/data-source';

export class PreferenceRepository {
  async findAll(): Promise<Preference[]> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    return preferenceRepository.find({
      relations: ['child'],
    });
  }

  async findById(id: number): Promise<Preference | null> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    const preference = await preferenceRepository.findOne({
      where: { id },
      relations: ['child'],
    });

    return preference || null;
  }

  async findByChildId(childId: number): Promise<Preference[]> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    return preferenceRepository.find({
      where: { child_id: childId },
      relations: ['child'],
    });
  }

  async findByChildrenIds(childrenIds: number[]): Promise<Preference[]> {
    if (childrenIds.length === 0) return [];

    const preferenceRepository = AppDataSource.getRepository(Preference);
    return preferenceRepository.find({
      where: { child_id: In(childrenIds) },
      relations: ['child'],
    });
  }

  async create(data: PreferenceCreateDtoType): Promise<Preference> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    const preference = preferenceRepository.create(data);
    return preferenceRepository.save(preference);
  }

  async update(id: number, data: Partial<Preference>): Promise<Preference> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    await preferenceRepository.update(id, data);

    const updatedPreference = await this.findById(id);
    if (!updatedPreference) {
      throw new Error(`Failed to update preference with ID ${id}`);
    }

    return updatedPreference;
  }

  async delete(id: number): Promise<boolean> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    const result = await preferenceRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

   async getPreferencesByChildId(childId: number): Promise<Preference | null> {
    const preferenceRepository = AppDataSource.getRepository(Preference);
    return preferenceRepository.findOne({
      where: { child: { id: childId } },
      relations: ['child'],
    });
  }}
