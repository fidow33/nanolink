import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone: string;
  country: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'admin';
  balances: {
    [key: string]: number;
  };
  registrationType?: 'phone' | 'email';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, otp: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('nanolink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (identifier: string, otp: string): Promise<boolean> => {
    // Simulate OTP verification
    if (otp === '1234') {
      // Determine if identifier is email or phone
      const isEmail = identifier.includes('@');
      const phone = isEmail ? '+254700000000' : identifier; // Default phone for email users
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: 'John',
        lastName: 'Doe',
        email: isEmail ? identifier : undefined,
        phone,
        country: phone.startsWith('+254') ? 'kenya' : 
                phone.startsWith('+256') ? 'uganda' :
                phone.startsWith('+255') ? 'tanzania' : 'kenya',
        kycStatus: phone === '+254700000000' ? 'approved' : 'pending',
        role: phone === '+254700000000' ? 'admin' : 'user',
        registrationType: isEmail ? 'email' : 'phone',
        balances: {
          USDT: isEmail ? 150.75 : 0, // Give email users some demo balance
          BTC: isEmail ? 0.0025 : 0,
          ETH: isEmail ? 0.15 : 0,
          USD: 0,
          KES: 0,
          UGX: 0,
          TZS: 0
        }
      };
      setUser(newUser);
      localStorage.setItem('nanolink_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nanolink_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('nanolink_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
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