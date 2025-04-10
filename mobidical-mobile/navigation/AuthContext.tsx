import React, { createContext, useContext, useState } from 'react';

// Définir le type pour l'utilisateur avec tous les champs nécessaires
export type AuthContextType = {
  isAuthenticated: boolean;
  user?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    userType?: string;
  };
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email?: string; firstName?: string; lastName?: string; userType?: string } | undefined>(undefined);

  const signIn = async (email: string, password: string) => {
    // Implémenter la logique de connexion ici
    setUser({ email });
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setUser(undefined);
    setIsAuthenticated(false);
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) => {
    // Implémenter la logique d'enregistrement ici
    setUser({ email, firstName, lastName, userType });
    setIsAuthenticated(true);
  };

  const resetPassword = async (email: string) => {
    // Implémenter la logique de réinitialisation du mot de passe ici
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      signIn,
      signOut,
      signUp,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
