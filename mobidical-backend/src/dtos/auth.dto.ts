import * as zod from 'zod';
import { PASSWORD_REGEX, USER_NAME_REGEX} from '@/constants/regex.constants';
import { UserRole, UserRoleType  } from '@/types/enum.type';
export const UserRegistrationDto = zod.object({
  username: zod
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(USER_NAME_REGEX, 'Username can only contain letters, numbers, and underscores'),

  lastName: zod
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
    
  email: zod
    .string()
    .email('Invalid email address'),
  
  password: zod
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(PASSWORD_REGEX, 'Password must include uppercase, lowercase, number, and special character'),

    role: zod.string().optional(),
    role_type: zod.string().optional(),
    



  
  organizationId: zod.number().optional()
});
// DTO pour la demande de réinitialisation
export const ForgotPasswordDto = zod.object({
  email: zod.string().email().min(1, 'Email is required')
});

// DTO pour réinitialiser le mot de passe
export const ResetPasswordDto = zod.object({
  newPassword: zod.string().min(8, 'Password must be at least 8 characters')
  .regex(PASSWORD_REGEX, 
    'Password must include uppercase, lowercase, number, and special character')
});

export const UserLoginDto = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(1, 'Password is required')
});

export type UserRegistration = zod.infer<typeof UserRegistrationDto>;
export type UserLogin = zod.infer<typeof UserLoginDto>;