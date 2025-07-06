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
    user.country === 'tanzania' ? 'TZS' : 'SOS'
  ] || 0;

  const currencySymbol = 
    user.country === 'kenya' ? 'KES' :
    user.country === 'uganda' ? 'UGX' :
    user.country === 'tanzania' ? 'TZS' : 'SOS';

  const totalUsdValue = cryptoBalances.USDT + (cryptoBalances.BTC * 45000) + (cryptoBalances.ETH * 2500);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="px-4 py-6 space-y-6 pb-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {getGreeting()}{user.firstName ? `, ${user.firstName}` : ''}
            </h1>
            {user.role === 'admin' && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>ADMIN</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-slate-600">
                {user.registrationType === 'email' ? user.email : user.phone}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-slate-600 capitalize">{user.country}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${
              user.kycStatus === 'approved' ? 'bg-green-500' :
              user.kycStatus === 'pending' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span className="text-xs text-slate-600 capitalize">
              KYC: {user.kycStatus}
            </span>
            {user.kycStatus === 'approved' && (
              <div className="flex items-center space-x-1 text-green-600">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="p-3 rounded-2xl bg-white shadow-lg border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          {showBalances ? <EyeOff className="w-5 h-5 text-slate-600" /> : <Eye className="w-5 h-5 text-slate-600" />}
        </button>
      </div>

      {/* Enhanced KYC Warning */}
      {user.kycStatus !== 'approved' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-amber-500 rounded-full mt-1 animate-pulse" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-amber-800">Complete Your Verification</p>
                <button className="text-amber-700 hover:text-amber-900 text-sm font-medium">
                  Start KYC →
                </button>
              </div>
              <p className="text-sm text-amber-700 leading-relaxed">
                Unlock higher limits and full trading features by completing your identity verification
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Balance Overview */}
      <div className="space-y-4">
        <BalanceCard
          title="Total Portfolio"
          amount={totalUsdValue}
          currency="USD"
          change={+5.2}
          showAmount={showBalances}
          icon={<TrendingUp className="w-7 h-7" />}
          gradient="from-blue-500 via-blue-600 to-indigo-600"
        />
        <BalanceCard
          title={`Local Balance (${currencySymbol})`}
          amount={fiatBalance}
          currency={currencySymbol}
          change={0}
          showAmount={showBalances}
          icon={<Wallet className="w-7 h-7" />}
          gradient="from-green-500 via-emerald-500 to-teal-600"
        />
      </div>

      {/* Enhanced Crypto Holdings */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Crypto Holdings</h2>
          <button className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors active:scale-95 group">
            <RefreshCw className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
        
        <div className="space-y-4">
          {Object.entries(cryptoBalances).map(([crypto, balance]) => (
            <div key={crypto} className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-200 group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <span className="text-lg font-bold text-slate-700">
                    {crypto === 'USDT' ? '₮' : crypto === 'BTC' ? '₿' : 'Ξ'}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">{crypto}</p>
                  <p className="text-sm text-slate-600">
                    {crypto === 'USDT' ? 'Tether USD' : crypto === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-lg">
                  {showBalances ? balance.toFixed(4) : '••••••'}
                </p>
                <p className="text-sm text-slate-600">{crypto}</p>
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