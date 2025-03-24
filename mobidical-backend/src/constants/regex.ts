// constants/regex.ts

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const usernameRegex = /^[a-zA-Z0-9_]+$/;
