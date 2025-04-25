import { DataSource, Repository } from 'typeorm';
import { UserSession } from '@/entities/UserSession';
import { User } from '@/entities/User';
import { z } from 'zod';
import { UserSessionCreateDto, UserSessionUpdateDto } from '@/dtos/user_session.dto';

type CreateDtoType = z.infer<typeof UserSessionCreateDto>;
type UpdateDtoType = z.infer<typeof UserSessionUpdateDto>;

export class UserSessionRepository {
  private userSessionRepository: Repository<UserSession>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userSessionRepository = this.dataSource.getRepository(UserSession);
    this.userRepository = this.dataSource.getRepository(User);
  }

  // Crée une session utilisateur et vérifie l'existence de l'utilisateur
  async create(data: CreateDtoType, userId: number): Promise<UserSession> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);  // Message d'erreur plus explicite
    }
  
    // Vérifier et s'assurer que tous les champs obligatoires sont présents
    if (!data.deviceType) {
      data.deviceType = 'desktop'; // Valeur par défaut si non fournie
    }
    
    if (!data.deviceInfo) {
      data.deviceInfo = {}; // Objet vide par défaut si non fourni
    }
  
    const now = new Date();
    
    const userSession = this.userSessionRepository.create({
      ...data,
      user, // Enregistrement de l'utilisateur lié à la session
      device_type: data.deviceType, // Mappage du nom du champ (camelCase vers snake_case)
      device_info: data.deviceInfo,
      last_activity_at: now,
      expires_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 jours par défaut
    });
  
    return await this.userSessionRepository.save(userSession);
  }

  // Récupère toutes les sessions utilisateurs
  async findAll(): Promise<UserSession[]> {
    return await this.userSessionRepository.find({ relations: ['user'] });
  }

  // Récupère une session utilisateur par ID
  async findById(id: number): Promise<UserSession | null> {
    const session = await this.userSessionRepository.findOne({
      where: { id },
      relations: ['user'],  // Assurez-vous que l'utilisateur lié soit récupéré aussi
    });

    return session;  // Renvoie null si la session n'est pas trouvée
  }

  // Met à jour une session utilisateur
  async update(id: number, data: UpdateDtoType): Promise<UserSession | null> {
    const userSession = await this.userSessionRepository.findOneBy({ id });
    if (!userSession) {
      throw new Error(`Session with ID ${id} not found`);  // Message d'erreur spécifique
    }

    Object.assign(userSession, data);  // Mise à jour de la session avec les nouvelles données
    return await this.userSessionRepository.save(userSession);  // Enregistrement des modifications
  }

  // Supprime une session utilisateur par ID
  async delete(id: number): Promise<boolean> {
    const result = await this.userSessionRepository.delete(id);
    
    // Vérification si la suppression a eu lieu (return un booléen)
    return result.affected ? result.affected > 0 : false;
  }
}
