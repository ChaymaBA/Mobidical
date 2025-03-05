import { render, screen, fireEvent } from "@testing-library/react-native";
import { EmailInput } from "./EmailInput"; // Suppose que le composant EmailInput existe

describe("EmailInput", () => {
    it("should render the email input field", () => {
        render(<EmailInput />);
        expect(screen.getByPlaceholderText("Enter your email")).toBeDefined();
    });

    it("should accept a valid email", () => {
        render(<EmailInput />);

        const emailField = screen.getByPlaceholderText("Enter your email");
        fireEvent.changeText(emailField, "test@example.com");

        expect(screen.queryByText("Invalid email address")).toBeNull();
    });

    it("should reject an invalid email and display an alert", () => {
        render(<EmailInput />);

        const emailField = screen.getByPlaceholderText("Enter your email");
        fireEvent.changeText(emailField, "invalid-email");

        expect(screen.getByText("Invalid email address")).toBeDefined();
    });
});
