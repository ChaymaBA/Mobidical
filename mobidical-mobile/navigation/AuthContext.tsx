import React, { createContext, useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore } from '@/src/stores/authStore';

type AuthContextType = {
  isAuthenticated: boolean;
  user: typeof authStore.user;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  kidsInforRegistration: ()=> void
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = observer(({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!authStore.user);



  useEffect(() => {
    const loadUser = async () => {
      await authStore.loadCurrentUser();
      setIsAuthenticated(!!authStore.user);
    };

    loadUser();
  }, []);


  const signIn = async (email: string, password: string) => {
    try {
     await authStore.signIn(email, password);
   
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) => {
    try {
      await authStore.signUp(email, password, firstName, lastName, userType);
    } catch (error) {
      throw error;
    }
  };
  
  const kidsInforRegistration = async () => {
  try{
    await authStore.KidsInfoRegistration()
    setIsAuthenticated(true)
  }catch(error){

  }

  }

  const signOut = async () => {
    await authStore.signOut();
    setIsAuthenticated(false);
  };

  const resetPassword = async (email: string) => {
    // Placeholder for future implementation
    console.log(`Reset password requested for: ${email}`);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!authStore.user || authStore.user.password !== currentPassword) {
        throw new Error('Current password is incorrect');
      }
      if (currentPassword === newPassword) {
        throw new Error('New password cannot be the same as the current password');
      }

      const { email, firstName, lastName, userType } = authStore.user;

      await authStore.signUp(
        email,
        newPassword,
        firstName,
        lastName,
        userType
      );
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user: authStore.user,
        signIn,
        signOut,
        signUp,
        resetPassword,
        changePassword,
        kidsInforRegistration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
