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
      {/* Top Bar */}
      <div className="bg-black/95 backdrop-blur-xl border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
              <img 
                src="/MAIN_-_NANO_STRATEGY_LOGO.pdf__1_-removebg-preview.png" 
                alt="NanoLink Logo" 
                className="w-6 h-6 object-contain brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">NanoLink</h1>
              <p className="text-xs text-gray-400 font-medium">East African Crypto Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 active:scale-95 relative group">
              <Bell className="w-5 h-5" />
              {user?.kycStatus === 'pending' && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
            
            <button
              onClick={logout}
              className="p-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 active:scale-95 group"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800 px-4 py-3 z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 min-w-[60px] active:scale-95 ${
                currentView === item.id
                  ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
                <div className="w-1 h-1 bg-blue-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}