import React from 'react';
import { 
  TrendingUp, 
  Wallet,
  Eye,
  EyeOff,
  RefreshCw,
  Star,
  Award,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionContext';
import QuickActions from './QuickActions';
import RecentTransactions from './RecentTransactions';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();
  const { transactions } = useTransactions();
  const [showBalances, setShowBalances] = React.useState(true);

  if (!user) return null;

  const cryptoBalances = {
    USDT: user.balances.USDT || 0,
    BTC: user.balances.BTC || 0,
    ETH: user.balances.ETH || 0
  };

  const fiatBalance = user.balances[
    user.country === 'kenya' ? 'KES' :
    user.country === 'uganda' ? 'UGX' :
    user.country === 'tanzania' ? 'TZS' :
    user.country === 'somalia' ? 'SOS' : 'USD'
  ] || 0;

  const currencySymbol = 
    user.country === 'kenya' ? 'KES' :
    user.country === 'uganda' ? 'UGX' :
    user.country === 'tanzania' ? 'TZS' :
    user.country === 'somalia' ? 'SOS' : 'USD';

  const totalUsdValue = cryptoBalances.USDT + (cryptoBalances.BTC * 45000) + (cryptoBalances.ETH * 2500);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const marketData = [
    { symbol: 'BTC', price: '$45,230', change: '+2.4%', positive: true },
    { symbol: 'ETH', price: '$2,890', change: '+1.8%', positive: true },
    { symbol: 'USDT', price: '$1.00', change: '0.0%', positive: true }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="px-4 py-8 space-y-8 pb-32">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {getGreeting()}{user.firstName ? `, ${user.firstName}` : ''}
              </h1>
              {user.role === 'admin' && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1">
                  <Award className="w-3 h-3" />
                  <span>ADMIN</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-3 text-sm mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 font-medium">
                  {user.registrationType === 'email' ? user.email : user.phone}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-gray-300 capitalize font-medium">{user.country}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                user.kycStatus === 'approved' ? 'bg-green-500' :
                user.kycStatus === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className="text-sm text-gray-400 capitalize font-medium">
                KYC: {user.kycStatus}
              </span>
              {user.kycStatus === 'approved' && (
                <div className="flex items-center space-x-1 text-green-400 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">Verified</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="p-4 rounded-2xl bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-all duration-300"
          >
            {showBalances ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
          </button>
        </div>

        {/* KYC Warning */}
        {user.kycStatus !== 'approved' && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mt-0.5 animate-pulse" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-yellow-400 text-lg">Complete Your Verification</p>
                  <button className="text-yellow-400 hover:text-yellow-300 text-sm font-bold bg-yellow-500/10 px-3 py-1.5 rounded-xl hover:bg-yellow-500/20 transition-colors border border-yellow-500/20">
                    Start KYC →
                  </button>
                </div>
                <p className="text-sm text-yellow-300/80 leading-relaxed font-medium">
                  Unlock higher limits and full trading features by completing your identity verification
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-6 right-6 w-40 h-40 rounded-full border-2 border-white/30"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-white/20"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-white/80 text-base font-semibold">Total Portfolio Value</p>
                <p className="text-4xl font-bold tracking-tight">
                  {showBalances ? `$${totalUsdValue.toLocaleString()}` : '••••••••'}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-white/25 px-4 py-2 rounded-full backdrop-blur-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">+5.2%</span>
              </div>
              <span className="text-sm text-white/80 font-medium">today</span>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Market Overview</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketData.map((crypto) => (
              <div key={crypto.symbol} className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {crypto.symbol[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{crypto.symbol}</p>
                      <p className="text-xs text-gray-400">{crypto.price}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${crypto.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {crypto.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Balance */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Local Balance</h2>
            <Wallet className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-white mb-2">
            {showBalances ? `${fiatBalance.toLocaleString()} ${currencySymbol}` : '••••••••'}
          </div>
          <p className="text-gray-400">Available for trading</p>
        </div>

        {/* Crypto Holdings */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Crypto Holdings</h2>
            <button className="p-2 rounded-xl hover:bg-gray-800 transition-all duration-200">
              <RefreshCw className="w-5 h-5 text-gray-400 hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="space-y-4">
            {Object.entries(cryptoBalances).map(([crypto, balance]) => (
              <div key={crypto} className="flex items-center justify-between p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 border border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {crypto === 'USDT' ? '$' : crypto === 'BTC' ? '₿' : 'Ξ'}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">{crypto}</p>
                    <p className="text-sm text-gray-400 font-medium">
                      {crypto === 'USDT' ? 'US Dollar Tether' : crypto === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white text-xl">
                    {showBalances ? balance.toFixed(4) : '••••••'}
                  </p>
                  <p className="text-sm text-gray-400 font-medium">{crypto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate('buy')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center space-x-3 mb-3">
                <ArrowUpRight className="w-6 h-6" />
                <span className="font-bold text-lg">Buy Crypto</span>
              </div>
              <p className="text-green-100 text-sm">Purchase with local money</p>
            </button>
            
            <button
              onClick={() => onNavigate('sell')}
              className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl text-white hover:from-red-700 hover:to-pink-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center space-x-3 mb-3">
                <ArrowDownLeft className="w-6 h-6" />
                <span className="font-bold text-lg">Sell Crypto</span>
              </div>
              <p className="text-red-100 text-sm">Convert to local currency</p>
            </button>
            
            <button
              onClick={() => onNavigate('wallet')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Wallet className="w-6 h-6" />
                <span className="font-bold text-lg">Wallet</span>
              </div>
              <p className="text-blue-100 text-sm">Manage your assets</p>
            </button>
            
            <button
              onClick={() => onNavigate('transactions')}
              className="bg-gradient-to-r from-purple-600 to-violet-600 p-6 rounded-2xl text-white hover:from-purple-700 hover:to-violet-700 transition-all duration-200 active:scale-95"
            >
              <div className="flex items-center space-x-3 mb-3">
                <Activity className="w-6 h-6" />
                <span className="font-bold text-lg">History</span>
              </div>
              <p className="text-purple-100 text-sm">View transactions</p>
            </button>
          </div>
        </div>

        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={transactions.slice(0, 5)} 
          onViewAll={() => onNavigate('transactions')}
        />
      </div>
    </div>
  );
}