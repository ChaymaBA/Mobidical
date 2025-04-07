import { UserRegistrationDto, UserLoginDto } from '@/dtos/auth.dto';
import { AuthService } from '@/services/auth.service';
import { Request, Response } from 'express';
import { handleError } from '@/core/errors/errorHandler';
export class AuthController {
  constructor(private authService: AuthService) {}


  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = UserRegistrationDto.parse(req.body);
      const result = await this.authService.register(userData);
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: result.user.id,
          username: result.user.username,
          lastName: result.user.lastName,
          email: result.user.email,
          role: result.user.role
        },
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginData = UserLoginDto.parse(req.body);
      const result = await this.authService.login(loginData);
      
      res.json({
        message: 'Login successful',
        user: {
          id: result.user.id,
          username: result.user.username,
          lastName: result.user.lastName, 
          email: result.user.email,
          role: result.user.role
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
        role: user.role
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user; // Assurez-vous que l'utilisateur est authentifié
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      // Récupérer les données envoyées dans la requête (par exemple, nom, email, etc.)
      const { username, email, lastName } = req.body;
  
      // Vérifier si de nouvelles données ont été fournies et mettre à jour l'utilisateur
      const updatedUser = await this.authService.updateUserProfile(user.id, {
        username, email, lastName
      });
  
      res.json({
        message: 'Profile updated successfully',
        user: updatedUser
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user; // Assurez-vous que l'utilisateur est authentifié
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
      // Appeler le service pour supprimer l'utilisateur
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
      const { resetToken, newPassword } = req.body;
      await this.authService.resetPassword(resetToken, newPassword);

      res.json({
        message: 'Password reset successfully'
      });
    } catch (error) {
      handleError(res, error);
    }
  }

}



