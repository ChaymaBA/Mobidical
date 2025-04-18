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
    
    // Récupérer l'utilisateur complet avec ses enfants
    const userWithChildren = await this.userRepository.findById(user.id);
    if (!userWithChildren) {
      throw new Error('User creation failed');
    }

    // Vérifier si l'utilisateur a des enfants pour inclure dans le token
    const defaultChildId = userWithChildren.children && userWithChildren.children.length > 0 
      ? userWithChildren.children[0].id 
      : null;

    console.log("User children:", userWithChildren.children);
    console.log("Selected child ID:", defaultChildId);

    // Generate tokens avec l'ID de l'enfant
    const accessToken = TokenUtil.generateAccessToken(userWithChildren, defaultChildId);
    const refreshToken = TokenUtil.generateRefreshToken(userWithChildren, defaultChildId);

    return { user: userWithChildren, accessToken, refreshToken };
  }

  async login(loginData: UserLogin, childId?: number): Promise<{ user: User, accessToken: string, refreshToken: string }> {
    // Find user by email with children relation
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

    // S'assurer que les enfants sont correctement chargés
    if (!user.children) {
      const refreshedUser = await this.userRepository.findById(user.id);
      if (refreshedUser) {
        user.children = refreshedUser.children;
      }
    }

    // Déterminer l'ID de l'enfant à utiliser
    let selectedChildId = null;
    
    // Si un ID d'enfant spécifique est fourni
    if (childId) {
      // Vérifier si l'enfant appartient à l'utilisateur
      const isValidChild = user.children?.some(child => child.id === childId);
      if (!isValidChild) {
        throw new Error('Invalid child ID');
      }
      selectedChildId = childId;
    } else if (user.children && user.children.length > 0) {
      // Sinon, utiliser le premier enfant par défaut s'il existe
      selectedChildId = user.children[0].id;
    }

    console.log("User children:", user.children);
    console.log("Selected child ID:", selectedChildId);

    // Generate tokens avec l'ID de l'enfant sélectionné
    const accessToken = TokenUtil.generateAccessToken(user, selectedChildId);
    const refreshToken = TokenUtil.generateRefreshToken(user, selectedChildId);

    return { user, accessToken, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Verify refresh token
    const payload = TokenUtil.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error('Invalid refresh token');
    }

    // Find user with children relation
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      throw new Error('User not found');
    }

    // Récupérer l'ID de l'enfant du payload du token
    const childId = payload.child_id || null;

    console.log("Refresh token payload:", payload);
    console.log("Child ID from token:", childId);

    // Generate new access token avec le même ID d'enfant
    const newAccessToken = TokenUtil.generateAccessToken(user, childId);

    return { accessToken: newAccessToken };
  }

  async updateUserProfile(userId: number, updateData: Partial<UserRegistration>): Promise<User> {
    return this.userRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId: number): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
  
  async forgotPassword(email: string): Promise<{ resetToken: string }> {
    // Chercher l'utilisateur par email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email not found');
    }

    // Générer un token de réinitialisation
    const resetToken = TokenUtil.generateResetPasswordToken(user);

    // Enregistrer le token dans la base de données
    await this.userRepository.saveResetPasswordToken(user.id, resetToken);

    return { resetToken };
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    // Vérifier et valider le token
    const payload = TokenUtil.verifyResetPasswordToken(resetToken);
    if (!payload) {
      throw new Error('Invalid reset token');
    }

    // Trouver l'utilisateur
    const user = await this.userRepository.findByEmail(payload.email);
    if (!user) {
      throw new Error('User not found');
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await PasswordUtil.hashPassword(newPassword);

    // Mettre à jour le mot de passe dans la base de données
    await this.userRepository.updateUserPassword(user.id, hashedPassword);
  }
}