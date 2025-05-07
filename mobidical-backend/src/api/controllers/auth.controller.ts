import { UserRegistrationDto, UserLoginDto } from '@/dtos/auth.dto';
import { AuthService } from '@/services/auth.service';
import { Request, Response } from 'express';
import { handleError } from '@/core/errors/errorHandler';

export class AuthController {
  constructor(private authService: AuthService) {
    // Bind all methods to keep 'this' context
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = UserRegistrationDto.parse(req.body);
      const result = await this.authService.register(userData);
      // Récupérer l'ID de l'enfant par défaut s'il existe
      const defaultChildId = result.user.children && result.user.children.length > 0 
        ? result.user.children[0].id 
        : null;
      console.log("User registered successfully:", result.user.id);
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: result.user.id,
          username: result.user.username,
          lastName: result.user.lastName,
          email: result.user.email,
          role: result.user.role,
          child_id: defaultChildId,
          role_type: result.user.role_type // Inclure le type de rôle
          
        },
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      console.log("Registration error:", error);
      handleError(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, child_id } = req.body;
      const loginData = UserLoginDto.parse({ email, password });
      // Convertir child_id en nombre si c'est une chaîne
      const childId = child_id ? (typeof child_id === 'string' ? parseInt(child_id, 10) : child_id) : undefined;
      
      console.log("Login attempt:", { email, childId });
      
      // Appel à la méthode login unifiée avec childId en paramètre optionnel
      const result = await this.authService.login(loginData, childId);
      
      // Obtenir l'ID de l'enfant sélectionné à partir du résultat
      const selectedChildId = result.user.children && result.user.children.length > 0 
        ? (childId || result.user.children[0].id) 
        : null;
      
      console.log("Login successful for user:", result.user.id);
      console.log("Selected child ID:", selectedChildId);
      
      res.json({
        message: 'Login successful',
        user: {
          id: result.user.id,
          username: result.user.username,
          lastName: result.user.lastName, 
          email: result.user.email,
          role: result.user.role,
          child_id: selectedChildId,
          role_type: result.user.role_type // Inclure le type de rôle
        },
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      console.log("Error occurred during login:", error);
      handleError(res, error);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshAccessToken(refreshToken);
      
      res.json({
        message: 'Token refreshed successfully',
        tokens: {
          accessToken: result.accessToken
        }
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Safely access user from the request
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      res.json({
        id: user.id,
        username: user.username,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        child_id: user.child_id // Inclure l'ID de l'enfant du token
       
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      const { username, email, lastName, role_type } = req.body;
  
      const updatedUser = await this.authService.updateUserProfile(user.id, {
        username, email, lastName, role_type
      });
  
      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          child_id: user.child_id, // Préserver le child_id du token
          role_type: updatedUser.role_type // Inclure le type de rôle
        }
      });
    } catch (error) {
      handleError(res, error);
    }
  }
  
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      await this.authService.deleteUser(user.id);
  
      res.json({
        message: 'User deleted successfully'
      });
    } catch (error) {
      handleError(res, error);
    }
  }
  
  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);

      res.json({
        message: 'Reset password token sent successfully',
        resetToken: result.resetToken
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Authorization token missing or invalid' });
        return;
      }
  
      const resetToken = authHeader.split(' ')[1]; // extrait le token après "Bearer"
      const { newPassword } = req.body;
  
      await this.authService.resetPassword(resetToken, newPassword);
  
      res.json({
        message: 'Password reset successfully'
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}