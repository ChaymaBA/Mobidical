import { PreferenceRepository } from '@/repositories/preferences.repository';
import { ChildrenRepository } from '@/repositories/children.repository';
import { UserRepository } from '@/repositories/user.repository';
import { Preference } from '@/entities/Preferences';
import { PreferenceCreateDtoType, PreferenceUpdateDtoType } from '@/dtos/preferences.dto';

export class PreferenceService {
  constructor(
    private preferenceRepository: PreferenceRepository,
    private childrenRepository: ChildrenRepository,
    private userRepository: UserRepository
  ) {}

  async createPreference(data: PreferenceCreateDtoType): Promise<Preference> {
    return await this.preferenceRepository.create(data);
  }

  async getAllPreferences(): Promise<Preference[]> {
    return await this.preferenceRepository.findAll();
  }

  async getPreferenceById(id: number): Promise<Preference | null> {
    return await this.preferenceRepository.findById(id);
  }

  async getPreferencesByChild(childId: number): Promise<Preference[]> {
    return await this.preferenceRepository.findByChildId(childId);
  }

  async getPreferencesByUserId(userId: number): Promise<Preference[]> {
    const userChildren = await this.childrenRepository.findByUserId(userId);
    if (!userChildren.length) {
      return [];
    }
    
    const childrenIds = userChildren.map(child => child.id);
    return await this.preferenceRepository.findByChildrenIds(childrenIds);
  }

  async updatePreference(id: number, data: PreferenceUpdateDtoType): Promise<Preference | null> {
    return await this.preferenceRepository.update(id, data);
  }

  async deletePreference(id: number): Promise<boolean> {
    return await this.preferenceRepository.delete(id);
  }

  async checkUserAccessToChild(userId: number | undefined, childId: number): Promise<boolean> {
    if (!userId) return false;
    
    const child = await this.childrenRepository.findById(childId);
    if (!child) {
      return false;
    }
    
    return child.user_id === userId;
  }

  // Méthode ajoutée pour récupérer l'enfant associé à un utilisateur
  async getChildByUserId(userId: number): Promise<{ id: number } | null> {
    const children = await this.childrenRepository.findByUserId(userId);
    return children.length ? children[0] : null;
  }
}
