import React from 'react';
import { 
  Home, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Clock, 
  Settings,
  LogOut,
  Bell
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
}

export default function Navigation({ currentView, onNavigate, isAdmin }: NavigationProps) {
  const { logout, user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'buy', label: 'Buy', icon: ArrowUpRight },
    { id: 'sell', label: 'Sell', icon: ArrowDownLeft },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'transactions', label: 'History', icon: Clock }
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin', icon: Settings });
  }

  return (
    <>
      {/* Enhanced Top Bar with Custom Logo */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <img 
                src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                alt="NanoLink Logo" 
                className="w-6 h-6 brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">NanoLink</h1>
              <p className="text-xs text-slate-600">East African Crypto Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 active:scale-95 relative">
              <Bell className="w-5 h-5" />
              {user?.kycStatus === 'pending' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
            
            <button
              onClick={logout}
              className="p-3 rounded-2xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 active:scale-95"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-3 z-50 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 min-w-[60px] active:scale-95 ${
                currentView === item.id
                  ? 'text-blue-600 bg-gradient-to-t from-blue-50 to-indigo-50 shadow-lg border border-blue-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${
                currentView === item.id ? 'scale-110' : ''
              } transition-transform duration-300`} />
              <span className={`text-xs font-medium ${
                currentView === item.id ? 'font-semibold' : ''
              }`}>
                {item.label}
              </span>
              {currentView === item.id && (
                <div className="w-1 h-1 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}