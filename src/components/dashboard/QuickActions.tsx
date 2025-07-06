import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Send, Clock, Sparkles } from 'lucide-react';

interface QuickActionsProps {
  onNavigate: (view: string) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const actions = [
    {
      id: 'buy',
      title: 'Buy Crypto',
      description: 'Purchase with local money',
      icon: <ArrowUpRight className="w-6 h-6" />,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      textColor: 'text-white',
      popular: true
    },
    {
      id: 'sell',
      title: 'Sell Crypto',
      description: 'Convert to local currency',
      icon: <ArrowDownLeft className="w-6 h-6" />,
      gradient: 'from-red-500 via-pink-500 to-rose-600',
      textColor: 'text-white',
      popular: false
    },
    {
      id: 'wallet',
      title: 'Send',
      description: 'Transfer crypto instantly',
      icon: <Send className="w-6 h-6" />,
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      textColor: 'text-white',
      popular: false
    },
    {
      id: 'transactions',
      title: 'History',
      description: 'View all transactions',
      icon: <Clock className="w-6 h-6" />,
      gradient: 'from-purple-500 via-violet-500 to-indigo-600',
      textColor: 'text-white',
      popular: false
    }
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
      <div className="flex items-center space-x-2 mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
        <Sparkles className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onNavigate(action.id)}
            className="group relative p-8 rounded-2xl border border-slate-200/60 hover:border-slate-300 hover:shadow-2xl transition-all duration-300 text-left active:scale-95 overflow-hidden bg-white/50 hover:bg-white/80"
          >
            {/* Background Gradient on Hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            {/* Popular Badge */}
            {action.popular && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Popular
              </div>
            )}
            
            <div className={`bg-gradient-to-r ${action.gradient} w-16 h-16 rounded-2xl flex items-center justify-center ${action.textColor} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
              {action.icon}
            </div>
            
            <h3 className="font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors text-lg">
              {action.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-500 transition-colors font-medium">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}