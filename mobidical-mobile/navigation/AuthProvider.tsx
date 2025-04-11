import React, { createContext, useState } from 'react';

const AuthContext = createContext<{
    isAuthenticated: boolean;
    user: { email?: string } | undefined;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
} | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<{ email?: string } | undefined>(undefined);
    

    const signIn = async (email: string, password: string) => {
        // Logique de connexion
        setUser({ email });
        setIsAuthenticated(true);
    };

    const signOut = () => {
        setUser(undefined);
        setIsAuthenticated(false);
    };

    const signUp = async (email: string, password: string) => {
        // Logique d'inscription
        setUser({ email });
        setIsAuthenticated(true);
    };

    const resetPassword = async (email: string) => {
        // Logique de réinitialisation du mot de passe
    };

    // Logique de changement de mot de passe
    const changePassword = async (currentPassword: string, newPassword: string) => {
        if (currentPassword === newPassword) {
            throw new Error("New password cannot be the same as the current password");
        }
        // Logique pour changer le mot de passe
        console.log(`Password changed from ${currentPassword} to ${newPassword}`);
        // Ajouter ici la logique pour mettre à jour le mot de passe dans la base de données
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            signIn,
            signOut,
            signUp,
            resetPassword,
            changePassword, // N'oublie pas d'ajouter la fonction changePassword ici
        }}>
            {children}
        </AuthContext.Provider>
    );
};
