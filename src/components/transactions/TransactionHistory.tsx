import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Send, Search } from 'lucide-react';
import { useTransactions } from '../../contexts/TransactionContext';
import type { Transaction } from '../../lib/supabase';

interface TransactionHistoryProps {
  onBack: () => void;
}

export default function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'send'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'on_ramp':
        return <ArrowUpRight className="w-5 h-5 text-green-600" />;
      case 'off_ramp':
        return <ArrowDownLeft className="w-5 h-5 text-red-600" />;
      case 'transfer':
        return <Send className="w-5 h-5 text-blue-600" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const typeMap: { [key: string]: string } = {
      'buy': 'on_ramp',
      'sell': 'off_ramp',
      'send': 'transfer'
    };
    
    const matchesFilter = filter === 'all' || transaction.type === typeMap[filter] || transaction.type === filter;
    const matchesSearch = transaction.from_currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.to_currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:bg-slate-50 transition-all duration-200 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
          <p className="text-slate-600 text-sm">View all your transactions</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'buy', label: 'Buy' },
              { id: 'sell', label: 'Sell' },
              { id: 'send', label: 'Send' }
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id as any)}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  filter === filterOption.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <img 
                src="/nanolink-logo.png" 
                alt="NanoLink" 
                className="w-8 h-8 object-contain opacity-50"
              />
            </div>
            <p className="font-medium text-slate-900 mb-1">No transactions found</p>
            <p className="text-sm text-slate-600">
              {filter === 'all' ? 'Your transactions will appear here' : `No ${filter} transactions found`}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-slate-900 capitalize">
                          {transaction.type === 'on_ramp' ? 'Buy' : 
                           transaction.type === 'off_ramp' ? 'Sell' : 
                           'Transfer'} {transaction.from_currency}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600 mt-1">
                        <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{new Date(transaction.created_at).toLocaleTimeString()}</span>
                        {transaction.paymentMethod && (
                          <>
                            <span>•</span>
                            <span>{transaction.payment_method}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {transaction.from_amount} {transaction.from_currency}
                    </p>
                    {transaction.to_currency && transaction.to_amount && (
                      <p className="text-sm text-slate-600">
                        → {transaction.to_amount.toLocaleString()} {transaction.to_currency}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}