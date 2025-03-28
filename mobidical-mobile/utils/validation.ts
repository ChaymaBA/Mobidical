export const loginValidationRules = {
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
        },
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
        },
        validate: {
            hasNumber: (value: string) => /[0-9]/.test(value) || 'Must contain at least one number',
            hasUpperCase: (value: string) => /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
            hasSpecialChar: (value: string) => /[!@#$%^&*]/.test(value) || 'Must contain at least one special character',
        },
    },
};

// Option Yup
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[!@#$%^&*]/, 'Password must contain a special character')
        .required('Password is required'),
});