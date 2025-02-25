import { TokenUtil } from '@/core/utils/jwt.utils';
import { PasswordUtil } from '@/core/utils/password.utils';
import { UserRegistration, UserLogin } from '@/dtos/auth.dto';
import { User } from '@/entities';
import { UserRepository } from '../repositories/user.repository';


export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: UserRegistration): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    // Create user
    const user = await this.userRepository.createUser(userData);

    // Generate tokens
    const accessToken = TokenUtil.generateAccessToken(user);
    const refreshToken = TokenUtil.generateRefreshToken(user);

    // Optionally, save refresh token to database for tracking

    return { user, accessToken, refreshToken };
  }

  async login(loginData: UserLogin): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await PasswordUtil.comparePassword(
      loginData.password, 
      user.password_hash
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await this.userRepository.updateLastLogin(user.id);

    // Generate tokens
    const accessToken = TokenUtil.generateAccessToken(user);
    const refreshToken = TokenUtil.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Verify refresh token
    const payload = TokenUtil.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error('Invalid refresh token');
    }

    // Find user
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate new access token
    const newAccessToken = TokenUtil.generateAccessToken(user);

    return { accessToken: newAccessToken };
  }
}