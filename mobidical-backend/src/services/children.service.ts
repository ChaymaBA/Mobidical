import { ChildrenRepository } from '@/repositories/children.repository';
import { Children } from '@/entities/Children';
import { ChildrenCreateDto,ChildrenUpdateDto} from '@/dtos/children.dto';
import { UserRole } from '@/types/enum.type';

export class ChildrenService {
  constructor(private childrenRepository: ChildrenRepository) {}

  async getAllChildren(): Promise<Children[]> {
    return await this.childrenRepository.findAll();
  }

  async getChildById(id: number): Promise<Children | null> {
    return await this.childrenRepository.findById(id);
  }

  async getChildrenByUser(userId: number): Promise<Children[]> {
    return await this.childrenRepository.findByUserId(userId);
  }

  async createChild( childData: ChildrenCreateDto, userId: number): Promise<Children> {
    return await this.childrenRepository.create(childData, userId);
  }

  async updateChild(id: number, childData: ChildrenUpdateDto): Promise<Children | null> {
    return await this.childrenRepository.update(id, childData);
  }

  async deleteChild(id: number): Promise<boolean> {
    return await this.childrenRepository.delete(id);
  }

  // Vérifie si un utilisateur est autorisé à accéder à un enfant
  isUserAuthorized(child: Children, userId: number, userRole: UserRole): boolean {
    // L'admin peut accéder à tout
    if (userRole === UserRole.ADMIN) {
      return true;
    }

    // L'utilisateur normal peut accéder seulement à ses propres enfants
    return child.user_id === userId;
  }
}
