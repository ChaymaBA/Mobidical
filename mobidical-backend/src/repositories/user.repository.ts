import { PasswordUtil } from '@/core/utils/password.utils';
import { UserRegistration } from '@/dtos/auth.dto';
import { User } from '@/entities';
import { Repository, DataSource } from 'typeorm';


export class UserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
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
        is_active: true
      });

      return this.repository.save(user);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.repository.update(userId, { 
      lastLogin: new Date() 
      // You could add a last_login_at column to track this
    });
  }

  async updateUser(userId: number, updateData: Partial<UserRegistration>): Promise<User> {
    // Trouver l'utilisateur
    const user = await this.repository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Appliquer les nouvelles valeurs à l'objet `user`
    Object.assign(user, updateData);
  
    // Sauvegarder les modifications
    return this.repository.save(user);
  }
  
  
  async deleteUser(userId: number): Promise<void> {
    const result = await this.repository.delete(userId);
    
    if (result.affected === 0) {
      throw new Error('User not found');
    }
  }

  // Nouvelle méthode pour enregistrer un token de réinitialisation du mot de passe
  async saveResetPasswordToken(userId: number, token: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });
    
    if (user) {
      user.resetPasswordToken = token;
      user.resetPasswordTokenExpiry = new Date(Date.now() + 3600000); // Token valide pendant 1 heure
      await this.repository.save(user);
    }
  }

  // Nouvelle méthode pour mettre à jour le mot de passe de l'utilisateur
  async updateUserPassword(userId: number, newPassword: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id: userId } });
    
    if (user) {
      user.password_hash = await PasswordUtil.hashPassword(newPassword); // Hacher le mot de passe avant de l'enregistrer
      await this.repository.save(user);
    }
  }
  
}