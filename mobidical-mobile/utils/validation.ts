import { colors } from "@/theme";

export const validateEmail = (value: string) => {
    if (!value) return "Email is required";

    const atIndex = value.indexOf('@');
    const dotAfterAt = value.indexOf('.', atIndex);

    if (!value.includes('@') && !value.includes('.')) {
        return "Email must contain '@' and '.' (in that order)";
    }

    if (!value.includes('@')) {
        return "Email must contain '@'";
    }

    if (dotAfterAt === -1) {
        return "Email must contain '.' after '@'";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return { message: "Email format is invalid (check for spaces or invalid characters",colors:colors.palette.lionRed}
    }

    return true;
};

export const validatePassword = (value: string) => {
    if (!value) return {message:"Password is required", colors:colors.palette.liongreen};
    if (value.length < 8) return {message:"Password must be at least 8 characters", colors:colors.palette.lionRed};

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const hasSpecialChar = /[@$!%*?&]/.test(value);

    const errors = [];
    if (!hasUpperCase) errors.push("one uppercase letter");
    if (!hasLowerCase) errors.push("one lowercase letter");
    if (!hasDigit) errors.push("one number");
    if (!hasSpecialChar) errors.push("one special character (@$!%*?&)");

    if (errors.length > 0) {
        return `Password must include ${errors.join(", ")}`;
    }

    return true;
};
