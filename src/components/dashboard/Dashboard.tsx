import React from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  Wallet,
  Eye,
  EyeOff,
  RefreshCw
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

  return (
    <div className="px-4 py-6 space-y-6 pb-24">
      {/* Header - Mobile Optimized */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Welcome back
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">{user.phone}</span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-sm text-slate-600 capitalize">{user.country}</span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${
              user.kycStatus === 'approved' ? 'bg-green-500' :
              user.kycStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
            }`} />
            <span className="text-xs text-slate-600 capitalize">
              KYC: {user.kycStatus}
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* KYC Warning - Mobile Optimized */}
      {user.kycStatus !== 'approved' && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold text-yellow-800 text-sm">KYC Verification Required</p>
              <p className="text-xs text-yellow-700 mt-1">
                Complete verification to unlock full trading features
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Balance Overview - Mobile Stack */}
      <div className="space-y-4">
        <BalanceCard
          title="Total Portfolio"
          amount={totalUsdValue}
          currency="USD"
          change={+5.2}
          showAmount={showBalances}
          icon={<TrendingUp className="w-6 h-6" />}
          gradient="from-blue-500 to-indigo-600"
        />
        <BalanceCard
          title={`Local Balance`}
          amount={fiatBalance}
          currency={currencySymbol}
          change={0}
          showAmount={showBalances}
          icon={<Wallet className="w-6 h-6" />}
          gradient="from-green-500 to-emerald-600"
        />
      </div>

      {/* Crypto Balances - Mobile Optimized */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Crypto Holdings</h2>
          <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors active:scale-95">
            <RefreshCw className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="space-y-4">
          {Object.entries(cryptoBalances).map(([crypto, balance]) => (
            <div key={crypto} className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-bold text-slate-700">
                    {crypto === 'USDT' ? '₮' : crypto === 'BTC' ? '₿' : 'Ξ'}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{crypto}</p>
                  <p className="text-xs text-slate-600">
                    {crypto === 'USDT' ? 'Tether' : crypto === 'BTC' ? 'Bitcoin' : 'Ethereum'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  {showBalances ? balance.toFixed(4) : '••••'}
                </p>
                <p className="text-xs text-slate-600">{crypto}</p>
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