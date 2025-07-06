import React from 'react';
import { 
  Home, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Clock, 
  Settings,
  LogOut,
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isAdmin: boolean;
}

export default function Navigation({ currentView, onNavigate, isAdmin }: NavigationProps) {
  const { logout } = useAuth();

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
      {/* Top Bar - Mobile Optimized */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">NanoPay</h1>
              <p className="text-xs text-slate-600">East African Crypto</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 active:scale-95"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Enhanced Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 z-50 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-200 min-w-[60px] active:scale-95 ${
                currentView === item.id
                  ? 'text-blue-600 bg-blue-50 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'scale-110' : ''} transition-transform duration-200`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}