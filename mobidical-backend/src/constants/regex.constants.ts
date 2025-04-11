// constants/regex.ts

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const USER_NAME_REGEX = /^[a-zA-Z0-9_]+$/;
export const DIFFICULTY_REGEX = /^(easy|medium|hard)$/;