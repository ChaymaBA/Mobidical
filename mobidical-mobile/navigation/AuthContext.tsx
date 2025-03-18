import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = async (email: string, password: string) => {
    // Implement your sign in logic here
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  const signUp = async (email: string, password: string) => {
    // Implement your sign up logic here
    setIsAuthenticated(true);
  };

  const resetPassword = async (email: string) => {
    // Implement your password reset logic here
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
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