
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  hasHistory?: boolean; // Added to track if the user is new or returning
} | null;

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    // This would typically connect to your authentication service
    // For demo purposes, we're just simulating a successful login with history
    const mockUser = {
      id: '123',
      name: email.split('@')[0], // Use part of the email as a name
      email,
      hasHistory: true // Existing users have history
    };
    
    // Store the user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };
  
  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<void> => {
    // This would typically connect to your authentication service
    // For demo purposes, we're just simulating a successful registration
    const mockUser = {
      id: '123',
      name,
      email,
      hasHistory: false // New users don't have history
    };
    
    // Store the user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
