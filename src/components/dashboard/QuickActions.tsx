import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Send, Clock } from 'lucide-react';

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
      color: 'bg-gradient-to-r from-green-500 to-emerald-600',
      textColor: 'text-white'
    },
    {
      id: 'sell',
      title: 'Sell Crypto',
      description: 'Convert to local currency',
      icon: <ArrowDownLeft className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-red-500 to-pink-600',
      textColor: 'text-white'
    },
    {
      id: 'wallet',
      title: 'Send',
      description: 'Transfer crypto',
      icon: <Send className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      textColor: 'text-white'
    },
    {
      id: 'transactions',
      title: 'History',
      description: 'View transactions',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-violet-600',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onNavigate(action.id)}
            className="group p-5 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 text-left active:scale-95"
          >
            <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center ${action.textColor} mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-slate-900 mb-1 text-sm">{action.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}