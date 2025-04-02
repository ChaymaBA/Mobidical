// utils/validationUtils.ts

export const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (email.includes(' ')) return 'Remove spaces from email';
    if (!email.includes('@')) return 'Email must include @';

    const atIndex = email.indexOf('@');
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1) return 'Add a period (.) after domain';

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Enter a valid email address';

    return '';
};

export const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[a-z]/.test(password)) errors.push('1 lowercase letter');
    if (!/[A-Z]/.test(password)) errors.push('1 uppercase letter');
    if (!/\d/.test(password)) errors.push('1 number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('1 special character');

    return errors.length > 0 ? errors.join(', ') : '';
};