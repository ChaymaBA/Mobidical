import * as bcrypt from 'bcryptjs';
import * as zod from 'zod';

export class PasswordUtil {
  // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
  private static passwordSchema = zod.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must include uppercase, lowercase, number, and special character');

  // Hash password with salt rounds
  static async hashPassword(password: string): Promise<string> {
    // Validate password first
    this.passwordSchema.parse(password);

    const saltRounds = 12; // Recommended salt rounds
    return bcrypt.hash(password, saltRounds);
  }

  // Compare plain text password with hashed password
  static async comparePassword(
    plainTextPassword: string, 
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  // Validate password strength
  static validatePassword(password: string): boolean {
    try {
      this.passwordSchema.parse(password);
      return true;
    } catch {
      return false;
    }
  }
}