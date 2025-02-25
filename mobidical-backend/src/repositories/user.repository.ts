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
        email: userData.email,
        password_hash: hashedPassword,
        is_active: true,
        organization: userData.organizationId 
          ? { id: userData.organizationId } 
          : undefined
      });

      return this.repository.save(user);
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.repository.update(userId, { 
      // You could add a last_login_at column to track this
    });
  }
}