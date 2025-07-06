import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  Wallet,
  Eye,
  EyeOff,
  RefreshCw,
  Star,
  Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTransactions } from '../../contexts/TransactionContext';
import BalanceCard from './BalanceCard';
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
    user.country === 'tanzania' ? 'TZS' : 'USD'
  ] || 0;

  const currencySymbol = 
    user.country === 'kenya' ? 'KES' :
    user.country === 'uganda' ? 'UGX' :
    user.country === 'tanzania' ? 'TZS' : 'USD';

  const totalUsdValue = cryptoBalances.USDT + (cryptoBalances.BTC * 45000) + (cryptoBalances.ETH * 2500);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="px-4 py-8 space-y-8 pb-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {getGreeting()}{user.firstName ? `, ${user.firstName}` : ''}
            </h1>
            {user.role === 'admin' && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 shadow-lg">
                <Award className="w-3 h-3" />
                <span>ADMIN</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-sm mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-slate-700 font-medium">
                {user.registrationType === 'email' ? user.email : user.phone}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-slate-700 capitalize font-medium">{user.country}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`w-2 h-2 rounded-full ${
              user.kycStatus === 'approved' ? 'bg-green-500' :
              user.kycStatus === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-sm text-slate-600 capitalize font-medium">
              KYC: {user.kycStatus}
            </span>
            {user.kycStatus === 'approved' && (
              <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-bold">Verified</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-white/50 hover:bg-white hover:shadow-2xl transition-all duration-300 active:scale-95"
        >
          {showBalances ? <EyeOff className="w-5 h-5 text-slate-600" /> : <Eye className="w-5 h-5 text-slate-600" />}
        </button>
      </div>

      {/* Enhanced KYC Warning */}
      {user.kycStatus !== 'approved' && (
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/60 rounded-3xl p-6 shadow-lg backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <div className="w-4 h-4 bg-amber-500 rounded-full mt-0.5 animate-pulse shadow-lg" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-amber-900 text-lg">Complete Your Verification</p>
                <button className="text-amber-700 hover:text-amber-900 text-sm font-bold bg-amber-100 px-3 py-1.5 rounded-xl hover:bg-amber-200 transition-colors">
                  Start KYC →
                </button>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed font-medium">
                Unlock higher limits and full trading features by completing your identity verification
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Balance Overview */}
      <div className="space-y-6">
        <BalanceCard
          title="Total Portfolio"
          amount={totalUsdValue}
          currency="USD"
          change={+5.2}
          showAmount={showBalances}
          icon={<TrendingUp className="w-7 h-7" />}
          gradient="from-blue-600 via-indigo-600 to-purple-700"
        />
        <BalanceCard
          title={`Local Balance (${currencySymbol})`}
          amount={fiatBalance}
          currency={currencySymbol}
          change={0}
          showAmount={showBalances}
          icon={<Wallet className="w-7 h-7" />}
          gradient="from-emerald-500 via-green-600 to-teal-700"
        />
      </div>

      {/* Enhanced Crypto Holdings */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Crypto Holdings</h2>
          <button className="p-3 rounded-xl hover:bg-slate-100 transition-all duration-200 active:scale-95 group">
            <RefreshCw className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="space-y-5">
          {Object.entries(cryptoBalances).map(([crypto, balance]) => (
            <div key={crypto} className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-50/80 to-slate-100/80 hover:from-slate-100 hover:to-slate-200 transition-all duration-300 group border border-slate-200/50 hover:border-slate-300/50 hover:shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <span className="text-xl font-bold text-slate-700">
                    {crypto === 'USDT' ? '₮' : crypto === 'BTC' ? '₿' : 'Ξ'}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">{crypto}</p>
                  <p className="text-sm text-slate-600 font-medium">
                    {crypto === 'USDT' ? 'Tether USD' : crypto === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-xl">
                  {showBalances ? balance.toFixed(4) : '••••••'}
                </p>
                <p className="text-sm text-slate-600 font-medium">{crypto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions onNavigate={onNavigate} />

      {/* Recent Transactions */}
      <RecentTransactions 
        transactions={transactions.slice(0, 5)} 
        onViewAll={() => onNavigate('transactions')}
      />
    </div>
  );
}