import { UserRegistrationDto, UserLoginDto } from '@/dtos/auth.dto';
import { AuthService } from '@/services/auth.service';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private authService: AuthService) {}

  // Add error handling method
  private handleError(res: Response, error: unknown): void {
    console.error(error);

    if (error instanceof Error) {
      switch (error.message) {
        case 'Email already exists':
          res.status(409).json({ message: 'Email is already registered' });
          break;
        case 'Invalid credentials':
          res.status(401).json({ message: 'Invalid email or password' });
          break;
        default:
          res.status(500).json({ 
            message: 'An unexpected error occurred',
            error: error.message 
          });
      }
    } else {
      res.status(500).json({ 
        message: 'An unexpected error occurred',
        error: String(error)
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const userData = UserRegistrationDto.parse(req.body);
      const result = await this.authService.register(userData);
      
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email
        },
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      this.handleError(res, error);
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
          email: result.user.email
        },
        tokens: {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      });
    } catch (error) {
      this.handleError(res, error);
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
      this.handleError(res, error);
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
        email: user.email
      });
    } catch (error) {
      this.handleError(res, error);
    }
  }
}