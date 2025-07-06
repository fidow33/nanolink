import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  title: string;
  amount: number;
  currency: string;
  change: number;
  showAmount: boolean;
  icon: React.ReactNode;
  gradient: string;
}

export default function BalanceCard({ 
  title, 
  amount, 
  currency, 
  change, 
  showAmount, 
  icon, 
  gradient 
}: BalanceCardProps) {
  const formatAmount = (amount: number, currency: string) => {
    if (currency === 'USD' || currency === 'USDT') {
      return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-3xl p-6 text-white relative overflow-hidden shadow-xl`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full border-2 border-white"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full border border-white"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/90 text-sm font-medium">{title}</p>
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            {icon}
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-4">
          {showAmount ? formatAmount(amount, currency) : '••••••••'}
        </div>
        
        {change !== 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-semibold">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
            <span className="text-sm text-white/80">today</span>
          </div>
        )}
      </div>
    </div>
  );
}