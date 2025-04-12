'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  username: string;
  // Add more user properties as needed
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Handle parse error silently and reset user state
        setUser(null);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoaded(true);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real application, you would validate credentials against an API
    // This is a simple mock implementation for demonstration
    if (username && password) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, any non-empty username/password is accepted
      const userData = { username };
      setUser(userData);
      
      // Store user data in localStorage
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      // Set a cookie for middleware authentication
      document.cookie = 'auth_session=true; path=/; max-age=86400'; // 24 hours
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    document.cookie = 'auth_session=; path=/; max-age=0'; // Clear the cookie
  };

  // Don't render children until we've checked for existing session
  if (!isLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}