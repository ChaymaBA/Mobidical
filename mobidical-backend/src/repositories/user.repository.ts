import { PasswordUtil } from '@/core/utils/password.utils';
import { UserRegistration } from '@/dtos/auth.dto';
import { User } from '@/entities';
import { Repository, DataSource } from 'typeorm';
import { UserRole, UserRoleType } from '@/types/enum.type';

export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    // Assurez-vous que la relation children est toujours chargée
    return this.repository.findOne({ 
      where: { email },
      relations: ['children']
    });
  }

  async findById(id: number): Promise<User | null> {
    // Assurez-vous que la relation children est toujours chargée
    return this.repository.findOne({ 
      where: { id },
      relations: ['children']
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ 
      where: { username },
      relations: ['children'] 
    });
  }

  async createUser(userData: UserRegistration): Promise<User> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await PasswordUtil.hashPassword(userData.password);

    const user = this.repository.create({
      username: userData.username,
      lastName: userData.lastName,
      email: userData.email,
      password_hash: hashedPassword,
      is_active: true,
      role: userData.role as UserRole,
      role_type: userData.role_type as UserRoleType,
    });

    return this.repository.save(user);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.repository.update(userId, { 
      lastLogin: new Date() 
    });
  }

  async updateUser(userId: number, updateData: Partial<UserRegistration>): Promise<User> {
    const user = await this.repository.findOne({ 
      where: { id: userId },
      relations: ['children']
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    Object.assign(user, updateData);
  
    return this.repository.save(user);
  }
  
  async deleteUser(userId: number): Promise<void> {
    const result = await this.repository.delete(userId);
    
    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }

  async saveResetPasswordToken(userId: number, token: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });
    
    if (user) {
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpiry = new Date(Date.now() + 3600000); // Token valide pendant 1 heure
      await this.repository.save(user);
    }
  }

  async updateUserPassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });
    
    if (user) {
      user.password_hash = newPassword; // Le mot de passe est déjà haché par le service
      user.resetPasswordToken = null; // Réinitialiser le token après le changement de mot de passe
      user.resetPasswordTokenExpiry = null;
      await this.repository.save(user);
    }
  }
}