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
    if (currency === 'USD' || currency === 'USDT' || currency.startsWith('$')) {
      return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-6 right-6 w-40 h-40 rounded-full border-2 border-white/30"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full border border-white/20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-white/10"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/90 text-base font-semibold">{title}</p>
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm shadow-lg">
            {icon}
          </div>
        </div>
        
        <div className="text-4xl font-bold mb-6 tracking-tight">
          {showAmount ? formatAmount(amount, currency) : '••••••••'}
        </div>
        
        {change !== 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/25 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg">
              {change > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-bold">
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
            <span className="text-sm text-white/80 font-medium">today</span>
          </div>
        )}
      </div>
    </div>
  );
}