import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '../lib/api';
import type { User, Wallet } from '../lib/supabase';

interface AuthUser extends User {
  firstName?: string;
  lastName?: string;
  registrationType?: 'phone' | 'email';
}

interface AuthContextType {
  user: AuthUser | null;
  wallets: Wallet[];
  loading: boolean;
  sendOtp: (phone?: string, email?: string) => Promise<void>;
  verifyOtp: (data: {
    phone?: string;
    email?: string;
    otp: string;
    firstName?: string;
    lastName?: string;
    country?: string;
  }) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nanolink_token');
    if (token) {
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  const sendOtp = async (phone?: string, email?: string) => {
    try {
      await apiClient.sendOtp(phone, email);
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  };

  const verifyOtp = async (data: {
    phone?: string;
    email?: string;
    otp: string;
    firstName?: string;
    lastName?: string;
    country?: string;
  }): Promise<boolean> => {
    try {
      const response = await apiClient.verifyOtp(data);
      
      if (response.success && response.user) {
        const authUser: AuthUser = {
          ...response.user,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          kycStatus: response.user.kyc_status,
          registrationType: data.email ? 'email' : 'phone'
        };
        
        setUser(authUser);
        setWallets(response.wallets || []);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Verify OTP error:', error);
      return false;
    }
  };

  const refreshUser = async () => {
    try {
      const response = await apiClient.getCurrentUser();
      
      if (response.user) {
        const authUser: AuthUser = {
          ...response.user,
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          kycStatus: response.user.kyc_status,
          registrationType: response.user.email ? 'email' : 'phone'
        };
        
        setUser(authUser);
        setWallets(response.wallets || []);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setWallets([]);
    apiClient.clearToken();
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      wallets, 
      loading, 
      sendOtp, 
      verifyOtp, 
      logout, 
      refreshUser 
    }}>
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