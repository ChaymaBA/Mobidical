import * as zod from 'zod';

export const UserRegistrationDto = zod.object({
  username: zod
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  
  email: zod
    .string()
    .email('Invalid email address'),
  
  password: zod
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      'Password must include uppercase, lowercase, number, and special character'),
  
  organizationId: zod.number().optional()
});

export const UserLoginDto = zod.object({
  email: zod.string().email('Invalid email address'),
  password: zod.string().min(1, 'Password is required')
});

export type UserRegistration = zod.infer<typeof UserRegistrationDto>;
export type UserLogin = zod.infer<typeof UserLoginDto>;